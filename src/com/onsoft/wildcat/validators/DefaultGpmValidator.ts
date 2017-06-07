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

import {GpmValidator} from "./GpmValidator";
import {GpmConfigError} from "../exceptions/GpmConfigError";
import * as type from "type-detect";

/**
 * The default implementation of the <code>GpmValidator</code> interface.
 */
export class DefaultGpmValidator implements GpmValidator {

  //////////////////////////////////////////////////////////////////////////////
  // Constructor function
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Creates a new <code>DefaultGpmValidator</code> instance.
   */
  constructor() {}

  //////////////////////////////////////////////////////////////////////////////
  // Private properties
  //////////////////////////////////////////////////////////////////////////////

  //////////////////////////////////////////////////////////////////////////////
  // Private methods
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Checks whether the specified config object has a valid <code>gpm</code>
   * property.
   * 
   * @param {any} gpm the config object to check.
   * @return {GpmConfigError} a <code>GpmConfigError</code> object whether the
   *                          config object is not valid; <code>null</code>
   *                          otherwise.
   */
  private validateGpm(gpm:any):GpmConfigError {
    let error:GpmConfigError = null;
    if(!gpm) {
      error = new GpmConfigError("GPM configuration must have a 'gpm' property");
    } else if(!gpm || type(gpm) !== "Object") {
      error = new GpmConfigError("'gpm' property must be a valid POJO");
    }
    return error;
  }

  /**
   * Checks whether the specified config object has a valid <code>project</code>
   * property.
   * 
   * @param {any} project the config object to check.
   * @return {GpmConfigError} a <code>GpmConfigError</code> object whether the
   *                          config object is not valid; <code>null</code>
   *                          otherwise.
   */
  private validateProject(project:any):GpmConfigError {
    let error:GpmConfigError = null;
    if(!project) {
      error = new GpmConfigError("GPM configuration must have a 'project' property");
    } else if(!project || type(project) !== "Object") {
      error = new GpmConfigError("'project' property must be a valid POJO");
    }
    return error;
  }

  //////////////////////////////////////////////////////////////////////////////
  // Public methods
  //////////////////////////////////////////////////////////////////////////////

  /**
   * @inheritDoc
   */
  public validate(gpmConfig:any, callback:(err:GpmConfigError)=>void):void {
    let error:GpmConfigError = null;
    if(type(gpmConfig) !== "Object") {
      error = new GpmConfigError("GPM configuration must be a valid POJO");
      callback(error);
    } else {
      error = this.validateGpm(gpmConfig.gpm);
      if(error) callback(error);
      else {
        error = this.validateProject(gpmConfig.project);
        callback(error);
      }
    }
  }
};
