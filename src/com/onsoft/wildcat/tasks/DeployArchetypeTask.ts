//  DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS HEADER.
//
//   Copyright 2016-2017 Pascal ECHEMANN.
//
//   Licensed under the Apache License, Version 2.0 (the "License");
//   you may not use this file except in compliance with the License.
//   You may obtain a copy of the License at
//
//       http://www.apache.org/licenses/LICENSE-2.0
//
//   Unless required by applicable law or agreed to in writing, software
//   distributed under the License is distributed on an "AS IS" BASIS,
//   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
//   See the License for the specific language governing permissions and
//   limitations under the License.

import {Task} from "./core/Task";
import {AbstractTask} from "./core/AbstractTask";
import {PathUtils} from "../util/PathUtils";
import {PathType} from "../util/PathType";
import {ArchetypePathWalker} from "../util/ArchetypePathWalker";
import {ArchetypePath} from "../util/ArchetypePath";
import {ArchetypePropertiesProcessor} from "../util/ArchetypePropertiesProcessor";
import * as fs from "fs";
import {UrlStringsEnum} from "jec-commons";
import {WildcatRequest} from "../WildcatRequest";
import {GpmConfig} from "../context/GpmConfig";

/**
 * The <code>DeployArchetypeTask</code> class deploys the project archetype for
 * a GPM.
 */
export class DeployArchetypeTask extends AbstractTask implements Task {

  //////////////////////////////////////////////////////////////////////////////
  // Constructor function
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Creates a new <code>DeployArchetypeTask</code> instance.
   */
  constructor() {
    super();
    this.initObj();
  }

  //////////////////////////////////////////////////////////////////////////////
  // Private properties
  //////////////////////////////////////////////////////////////////////////////

  /**
   * The utility used for traversing the structure of the archetype.
   */
  private _walker:ArchetypePathWalker = null;

  /**
   * The reference to the current GlassCat installation folder.
   */
  private _serverPath:string = null;

  /**
   * The reference to the elligible types for properties processing.
   */
  private _extensionMap:Map<string, boolean> = null;

  /**
   * The properties processor for this task.
   */
  private _propertiesProcessor:ArchetypePropertiesProcessor = null;

  /**
   * Overrides the default path to the archetype.
   */
  private _archetypePath:string = null;

  //////////////////////////////////////////////////////////////////////////////
  // Private methods
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Initializes this object.
   */
  private initObj():void {
    this._walker = new ArchetypePathWalker();
    this._serverPath = process.cwd();
    this._extensionMap = new Map<string, boolean>();
    this._propertiesProcessor = new ArchetypePropertiesProcessor();
  }

  /**
   * Creates and writes all of the archetype files into the target directory.
   * 
   * @param {Array<ArchetypePath>} archetypePaths
   * @param {Function} success the callback method called an the end of the
   *                           process. This function takes an string parameter
   *                           which represents the description of the operation.
   * @param {Function} error the callback method called when the process failed.
   *                         this function takes an error object as parameter.  
   */
  private buildFiles(archetypePaths:ArchetypePath[],
                                                 success:(message:string)=>void,
                                                 error?:(err:any)=>void):void {
    let gpm:string = this.__request.gpm;
    let len:number = archetypePaths.length - 1;
    let pending:number = len;
    let cursor:number = 1;
    let projectPath:string = this._serverPath + PathUtils.WORKSPACE +
                             this.__request.directory;
    for(; cursor <= len; ++cursor) {
      let archPath:ArchetypePath = archetypePaths[cursor];
      let file:string = projectPath + archPath.targetPath +
                        UrlStringsEnum.SLASH + archPath.file;
      if(archPath.type === PathType.DIRECTORY) {
        fs.mkdir(file, (err:NodeJS.ErrnoException)=> {
          if(err) {
            error(
              "an error occured while creating archetype directory:\n" + err
            );
          }
          if(!--pending) {
            success(
              "'" + gpm + "' project archetype deployed at: " + projectPath
            );
          }
        });
      } else {
        fs.readFile(
          archPath.originPath,
          (err:NodeJS.ErrnoException, data:Buffer)=> {
            if(err) {
              error(
                "an error occured while deploying '" + gpm +
                "' project archetype:\n" + err
              );
            } else {
              let stream:fs.WriteStream = fs.createWriteStream(file);
              let writableData:any = 
                this._extensionMap.get(archPath.extension) ?
                this._propertiesProcessor.mapProperties(data.toString()) :
                data;
              fs.writeFile(file, writableData, (err:NodeJS.ErrnoException)=> {
                if(err) {
                  error(
                    "an error occured while creating archetype file:\n" + err
                  );
                }
                if(!--pending) {
                  success(
                    "'" + gpm + "' project archetype deployed at: "
                    + projectPath
                  );
                }
              });
            }
          }
        );
      }
    }
  }

  /**
   * Returns the resolved path to the archetype.
   * 
   * @return {string} the resolved path to the archetype.
   */
  private resolveArchetypePath():string {
    let gpm:string = this.__request.gpm;
    let archetypePath:string = this._archetypePath ?
                               this._archetypePath :
                               this._serverPath + PathUtils.GPMS_DIRECTORY;
    if(archetypePath.lastIndexOf(UrlStringsEnum.SLASH)
                                                 !== archetypePath.length - 1) {
      archetypePath += UrlStringsEnum.SLASH;
    }
    archetypePath += gpm + PathUtils.ARCHETYPE_DIRECTORY;
    return archetypePath;
  }

  //////////////////////////////////////////////////////////////////////////////
  // Public methods
  //////////////////////////////////////////////////////////////////////////////

  /**
   * @inheritDoc
   */
  public setContext(request:WildcatRequest, config:GpmConfig):void {
    super.setContext(request, config);
    this._propertiesProcessor.setContext(request, config);
    let processedFiles:string[] = config.processedFiles;
    let len:number = -1;
    if(processedFiles) {
      len = processedFiles.length;
      while(len--) {
        this._extensionMap.set(processedFiles[len], true);
      }
    }
  }

  /**
   * Overrides the default path to the archetype.
   * 
   * @param {string} archetypePath the new path to the archetype.
   */
  public setArchetypePath(archetypePath:string):void {
    this._archetypePath = archetypePath;
  }

  /**
   * Returns the path to the archetype.
   * 
   * @return {string} the path to the archetype.
   */
  public getArchetypePath():string {
    return this._archetypePath;
  }

  /**
   * @inheritDoc
   */
  public execute(success:(message:string)=>void, error?:(err:any)=>void):void {
    let gpm:string = this.__request.gpm;
    let archetypePath:string = this.resolveArchetypePath();
    let archetypeFiles:ArchetypePath[] = new Array<ArchetypePath>();
    this._walker.process = (file:ArchetypePath)=> {
      archetypeFiles.push(file);
     };
    this._walker.walk(
      archetypePath,
      ()=> {
        this.buildFiles(archetypeFiles, success, error);
      },
      (err:any)=> {
        error("'" + gpm + "' project archetype error: " + err.toString());
      }
    );
  }
};
