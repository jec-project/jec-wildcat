//  DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS HEADER.
//
//   Copyright 2016-2018 Pascal ECHEMANN.
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

import * as fs from "fs";
import {UrlStringsEnum} from "jec-commons";
import {FileStatsProxy} from "jec-commons-node";
import {ArchetypePath} from "./ArchetypePath";
import {PathType} from "./PathType";
import {ArchetypePathOperation} from "./ArchetypePathOperation";

/**
 * A helper class that lists all files in a GPM archetype directory.
 */
export class ArchetypePathWalker {

  //////////////////////////////////////////////////////////////////////////////
  // Constructor function
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Creates a new <code>ArchetypePathWalker</code> instance.
   */
  constructor() {}

  //////////////////////////////////////////////////////////////////////////////
  // Private methods
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Walks recursively through the specified archetype directory.
   * 
   * @param {string} path the path to resolve.
   * @param {ArchetypePathOperation} operation the references about the current
   *                                           operation.
   * @param {Function} complete the callback method called an the end of the
   *                            process.
   * @param {Function} error the callback method called when an error occuerd.
   *                         This function takes an object parameter which
   *                         represents an error message.
   */
  private internalWalk(path:string, operation:ArchetypePathOperation,
                                    complete:()=>void,
                                    error:(err:any)=>void):void {
    let currPath:string = null;
    let len:number = operation.originPath.length;
    let file:string = null;
    let archetypePath:ArchetypePath = null;
    fs.stat(path, (err:NodeJS.ErrnoException, stats:fs.Stats)=> {
      if(err) {
        error(err);
      } else {
        archetypePath = this.buildArchetypePath(path, stats, len);
        if(stats.isDirectory()) {
          this.process(archetypePath);
          fs.readdir(
            path,
            (err:NodeJS.ErrnoException, files:string[])=> {
              if(err) error(err);
              else {
                len = files.length;
                operation.pending += len;
                while(len--){
                  file = files[len];
                  currPath = path + UrlStringsEnum.SLASH + file;
                  this.internalWalk(
                    currPath, operation, complete, error);
                }
                if(!--operation.pending) complete();
              }
          });
        } else {
          this.process(archetypePath);
          if(!--operation.pending) complete();
        }
      }
    });
  }

  /**
   * Returns a new <code>ArchetypePath</code> object, built from the specified
   * parameters.
   * 
   * @param path the path to resolve.
   * @param stats the <code>fs.Stats</code> intance associated to the path to
   *              resolve.
   * @param sourcePathLength a convenient value that contains the length of the
   *                         source path string.
   */
  private buildArchetypePath(path:string, stats:fs.Stats,
                                        sourcePathLength:number):ArchetypePath {
    let archPath:ArchetypePath = new ArchetypePath();
    let targetPath:string = path.substring(sourcePathLength);
    let charIndex:number = path.lastIndexOf(UrlStringsEnum.SLASH) + 1;
    archPath.file = path.substring(charIndex);
    archPath.originPath = path;
    charIndex = targetPath.lastIndexOf(UrlStringsEnum.SLASH);
    archPath.targetPath = targetPath.substring(0, charIndex);
    if(stats.isDirectory()) {
      archPath.type = PathType.DIRECTORY;
    } else {
      archPath.type = PathType.FILE;
      charIndex = path.lastIndexOf(UrlStringsEnum.DOT) + 1;
      archPath.extension = path.substring(charIndex);
    }
    archPath.stats = new FileStatsProxy(stats);
    return archPath;
  }

  //////////////////////////////////////////////////////////////////////////////
  // Public properties
  //////////////////////////////////////////////////////////////////////////////

  /**
   * The method called by the archetype walker to perform action on the 
   * specified file.
   */
  public process:(file:ArchetypePath)=>void = null;

  //////////////////////////////////////////////////////////////////////////////
  // Public methods
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Walks recursively through the specified archetype directory.
   * 
   * @param {string} path the path to resolve.
   * @param {Function} complete the callback method called an the end of the
   *                            process.
   * @param {Function} error the callback method called when an error occuerd.
   *                         This function takes an object parameter which
   *                         represents an error message.
   */
  public walk(path:string, complete:()=>void, error:(err:any)=>void):void {
    let operation:ArchetypePathOperation = new ArchetypePathOperation();
    operation.pending = 1;
    operation.originPath = path;
    this.internalWalk(path, operation, complete, error);
  }
};
