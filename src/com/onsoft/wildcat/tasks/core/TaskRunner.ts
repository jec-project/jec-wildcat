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

import {Task} from "./Task";
import {WildcatRequest} from "../../WildcatRequest";
import {GpmConfig} from "../../context/GpmConfig";

/**
 * The <code>TaskRunner</code> interface provides the API that must be 
 * implemented by objects responsible for running tasks in a Wildcat container.
 */
export interface TaskRunner {

  //////////////////////////////////////////////////////////////////////////////
  // Public methods
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Sets the execution context for this task runner.
   * 
   * @param {WildcatRequest} request the request associated with this task
   *                                 runner.
   * @param {GpmConfig} config the GPM configuration associated with this task
   *                           runner.
   */
  setContext(request:WildcatRequest, config:GpmConfig):void;

  /**
   * Executes the specified task.
   * 
   * @param {Task} task the task to execute.
   * @param {Function} success the callback method called an the end of the
   *                           process. This function takes an string parameter
   *                           which represents the description of the operation.
   * @param {Function} error the callback method called when the process failed.
   *                          this function takes an error object as parameter.
   */
  run(task:Task, success:(message:string)=>void, error?:(err:any)=>void):void;
};
