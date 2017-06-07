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

import {AbstractTask} from "../../../src/com/onsoft/wildcat/tasks/core/AbstractTask";
import {Task} from "../../../src/com/onsoft/wildcat/tasks/core/Task";
import {WildcatRequest} from "../../../src/com/onsoft/wildcat/WildcatRequest";
import {GpmConfig} from "../../../src/com/onsoft/wildcat/context/GpmConfig";
import * as utils from "../utilities/TaskTestsUtils";

export class TaskImpl extends AbstractTask implements Task {

  constructor() {
    super();
  }

  public getRequest():WildcatRequest {
    return this.__request;
  }

  public getConfig():GpmConfig {
    return this.__config;
  }

  public execute(success:(message:string)=>void, error?:(err:any)=>void):void {
    success(utils.SUCCESS_MSG);
  }
}