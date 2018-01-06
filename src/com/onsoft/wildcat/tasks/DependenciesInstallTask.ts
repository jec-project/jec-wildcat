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

import {Task} from "./core/Task";
import {AbstractTask} from "./core/AbstractTask";
import {exec, ExecOptionsWithStringEncoding} from "child_process";
import {PathUtils} from "../util/PathUtils";
import {WildcatLoggerProxy} from "../logging/WildcatLoggerProxy";
import {JecStringsEnum, UrlStringsEnum, EncodingFormat} from "jec-commons";

/**
 * The <code>DependenciesInstallTask</code> class installs project dependencies
 * for a GPM.
 */
export class DependenciesInstallTask extends AbstractTask implements Task {

  //////////////////////////////////////////////////////////////////////////////
  // Constructor function
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Creates a new <code>DependenciesInstallTask</code> instance.
   */
  constructor() {
    super();
  }

  //////////////////////////////////////////////////////////////////////////////
  // Public methods
  //////////////////////////////////////////////////////////////////////////////

  /**
   * @inheritDoc
   */
  public execute(success:(message:string)=>void, error?:(err:any)=>void):void {
    let gpm:string = this.__request.gpm;
    let commandPath:string = process.cwd() + PathUtils.WORKSPACE +
                             this.__request.directory +
                             JecStringsEnum.WEB_APP;
    let options:ExecOptionsWithStringEncoding = {
      encoding: EncodingFormat.UTF8,
      cwd: commandPath
    };
    exec("npm install", options, (err:Error, stdout:string, stderr:string)=>{
      if(stdout && stdout !== UrlStringsEnum.EMPTY_STRING) {
        WildcatLoggerProxy.getInstance().log(stdout);
      }
      if(stderr && stderr !== UrlStringsEnum.EMPTY_STRING) {
        WildcatLoggerProxy.getInstance().log(stderr);
      }
      if(err) {
        error(
          "'" + gpm + "' project dependencies installation error: " + err
        );
      } else {
        success("'" + gpm + "' project dependencies installed");
      }
    });
  }
};
