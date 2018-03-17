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

import {GpmValidator} from "../validators/GpmValidator";
import {DefaultGpmValidator} from "../validators/DefaultGpmValidator";
import {GpmConfig} from "../context/GpmConfig";
import {Gpm} from "../context/Gpm";
import {Project} from "../context/Project";
import {GpmConfigError} from "../exceptions/GpmConfigError";

/**
 * A helper class for parsing GlassCat Project Model (GPM) files.
 */
export class GpmConfigParser {

  //////////////////////////////////////////////////////////////////////////////
  // Constructor function
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Creates a new <code>GpmConfigParser</code> instance.
   */
  constructor() {
    this.initObj();
  }

  //////////////////////////////////////////////////////////////////////////////
  // Private properties
  //////////////////////////////////////////////////////////////////////////////

  /**
   * The <code>GpmValidator</code> instance used to validate the GPM
   * configuration file.
   */
  private _validator:GpmValidator = null;

  //////////////////////////////////////////////////////////////////////////////
  // Private methods
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Initializes this object.
   */
  private initObj():void {
    this._validator = new DefaultGpmValidator();
  }

  /**
   * Parses the <code>gpm</code> property for the specified configuration
   * object.
   * 
   * @param {GpmConfig} gpmConfig the reference to the <code>GpmConfig</code>
   *                              object for this parser.
   * @param {Object} config the configuration object to parse.
   */
  private parseGpm(gpmConfig:GpmConfig, config:any):void {
    const gpm:Gpm = new Gpm();
    gpm.version = config.gpm.version;
    gpmConfig.gpm = gpm;
  }

  /**
   * Parses the <code>project</code> property for the specified
   * configuration object.
   * 
   * @param {GpmConfig} gpmConfig the reference to the <code>GpmConfig</code>
   *                              object for this parser.
   * @param {Object} config the configuration object to parse.
   */
  private parseProject(gpmConfig:GpmConfig, config:any):void {
    const project:Project = new Project();
    const projectCfg:any = config.project;
    project.name = projectCfg.name;
    project.version = projectCfg.version;
    project.title = projectCfg.title;
    project.description = projectCfg.description;
    project.author = projectCfg.author;
    gpmConfig.project = project;
  }
  
  /**
   * Parses the <code>processedFiles</code> property for the specified 
   * configuration object.
   * 
   * @param {GpmConfig} gpmConfig the reference to the <code>GpmConfig</code>
   *                              object for this parser.
   * @param {Object} config the configuration object to parse.
   */
  private parseProcessedFiles(gpmConfig:GpmConfig, config:any):void {
    gpmConfig.processedFiles = config.processedFiles;
  }

  //////////////////////////////////////////////////////////////////////////////
  // Public methods
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Parses the specified configuration object.
   * 
   * @param {any} config the configuration object to parse.
   * @param {Function} success the callback method called whether the parsing
   *                           process succeed. This method accepts a parameter
   *                           which contains the result of the process.
   * @param {Function} error the callback method called whether the parsing
   *                         process failed. This method accepts a parameter
   *                         which represents the error.
   */
  public parse(config:any, success:(data:GpmConfig)=>void,
                                        error:(err:GpmConfigError)=>void):void {
    let gpmConfig:GpmConfig = null;
    this._validator.validate(config, (err:GpmConfigError)=> {
      if(err) error(err);
      else {
        gpmConfig = new GpmConfig();
        this.parseGpm(gpmConfig, config);
        this.parseProject(gpmConfig, config);
        this.parseProcessedFiles(gpmConfig, config);
        success(gpmConfig);
      }
    });
  }
};
