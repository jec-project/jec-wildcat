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

import {Task} from "./Task";
import {WildcatRequest} from "../../WildcatRequest";
import {GpmConfig} from "../../context/GpmConfig";

/**
 * The abstract implementation of the <code>Task</code> interface.
 */
export abstract class AbstractTask implements Task {

  //////////////////////////////////////////////////////////////////////////////
  // Constructor function
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Creates a new <code>AbstractTask</code> instance.
   */
  constructor() {}

  //////////////////////////////////////////////////////////////////////////////
  // Private properties
  //////////////////////////////////////////////////////////////////////////////

  /**
   * The request associated with this task.
   */
  protected __request:WildcatRequest = null;

  /**
   * The GPM configuration associated with this task.
   */
  protected __config:GpmConfig = null;

  //////////////////////////////////////////////////////////////////////////////
  // Public methods
  //////////////////////////////////////////////////////////////////////////////

  /**
   * @inheritDoc
   */
  public setContext(request:WildcatRequest, config:GpmConfig):void {
    this.__request = request;
    this.__config = config;
  }

  /**
   * @inheritDoc
   */
  public execute(success:(message:string)=>void, error?:(err:any)=>void):void {}
};
