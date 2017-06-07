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

import {WildcatRequest} from "../../WildcatRequest";
import {GpmConfig} from "../../context/GpmConfig";

/**
 * The __Task__ interface represents a basic task for a Wildcat processor.
 *
 * @interface Task
 */
export interface Task {

  //////////////////////////////////////////////////////////////////////////////
  // Public methods
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Sets the execution context for this Wildcat task.
   * 
   * @method setContext
   * @param {WildcatRequest} request the request associated with this task.
   * @param {GpmConfig} config the configuration associated with this task.
   */
  setContext(request:WildcatRequest, config:GpmConfig):void;

  /**
   * Executes this Wildcat task.
   * 
   * @method execute
   * @param {Function} success the callback method called an the end of the
   *                           process. This function takes an string parameter
   *                           which represents the description of the operation.
   * @param {Function} error the callback method called when the process failed.
   *                          this function takes an error object as parameter.                          
   */
  execute(success:(message:string)=>void, error?:(err:any)=>void):void;
};
