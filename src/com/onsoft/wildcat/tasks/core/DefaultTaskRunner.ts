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

import {TaskRunner} from "./TaskRunner";
import {Task} from "./Task";
import {WildcatRequest} from "../../WildcatRequest";
import {GpmConfig} from "../../context/GpmConfig";

/**
 * The default implementation of the <code>TaskRunner</code> interface.
 */
export class DefaultTaskRunner implements TaskRunner {

  //////////////////////////////////////////////////////////////////////////////
  // Constructor function
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Creates a new <code>DefaultTaskRunner</code> instance.
   */
  constructor() {}

  //////////////////////////////////////////////////////////////////////////////
  // Private properties
  //////////////////////////////////////////////////////////////////////////////

  /**
   * The request associated with this task runner.
   */
  private _request:WildcatRequest = null;

  /**
   * The GPM configuration associated with this task runner.
   */
  private _config:GpmConfig = null;

  //////////////////////////////////////////////////////////////////////////////
  // Public methods
  //////////////////////////////////////////////////////////////////////////////

  /**
   * @inheritDoc
   */
  public setContext(request:WildcatRequest, config:GpmConfig):void {
    this._request = request;
    this._config = config;
  }

  /**
   * @inheritDoc
   */
  public run(task:Task, success:(message:string)=>void,
                                                  error?:(err:any)=>void):void {
    task.setContext(this._request, this._config);
    task.execute(success, error);
  }
};
