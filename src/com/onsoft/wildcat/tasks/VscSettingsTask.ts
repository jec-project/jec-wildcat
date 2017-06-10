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
import * as fs from "fs";
import {UrlStringsEnum} from "jec-commons";
import {WildcatRequest} from "../WildcatRequest";

/**
 * The <code>VscSettingsTask</code> class adds both, <code>settings.json</code>
 * and <code>task.json</code>, Visual Studio Code setting files to your EJP.
 */
export class VscSettingsTask extends AbstractTask implements Task {

  //////////////////////////////////////////////////////////////////////////////
  // Constructor function
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Creates a new <code>VscSettingsTask</code> instance.
   */
  constructor() {
    super();
  }

  //////////////////////////////////////////////////////////////////////////////
  // Private properties
  //////////////////////////////////////////////////////////////////////////////


  /**
   * An array that contains the name of the different resources to create.
   */
  private static readonly RESOURCE_NAMES:string[] =
                                     [".vscode", "settings.json", "tasks.json"];

  //////////////////////////////////////////////////////////////////////////////
  // Private methods
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Returns the template for the <code>settings.json</code> file to create.
   * 
   *  @return {string} the template for the <code>settings.json</code> file to
   *                   create.
   */
  private getSettingsTemplate():string {
    let template:string =
`// Place your settings in this file to overwrite default and user settings.
{
    "editor.rulers": [80],
    "editor.tabSize": 2,
    "files.exclude": {
        "**/*.js": true
    },
    "files.associations": {
        "*.ejs": "html"
    }
}`;
    return template;
  }

  /**
   * Returns the template for the <code>tasks.json</code> file to create.
   * 
   * @return {string} the template for the <code>tasks.json</code> file to
   *                  create.
   */
  private getTasksTemplate():string {
    let template:string =
`{
    // See https://go.microsoft.com/fwlink/?LinkId=733558
    // for the documentation about the tasks.json format
    "version": "0.1.0",
    "tasks": [
        {
            "taskName": "build",
            "command": "tsc",
            "args": ["-p", "./"],
            "isShellCommand": true,
            "isBackground": true,
            "problemMatcher": "$tsc-watch",
            "showOutput": "always",
            "isBuildCommand": true
        }
    ]
}`;
    return template;
  }

  /**
   * Builds and returns an error message for this task.
   * 
   * @param {Object} error the error for which to build the error message.
   * @return {string} the error message for this task.
   */
  private buildErrorMessage(error:any):string {
    return "an error occured while creating VSC settings:\n" + error;
  }

  //////////////////////////////////////////////////////////////////////////////
  // Public methods
  //////////////////////////////////////////////////////////////////////////////

  /**
   * @inheritDoc
   */
  public execute(success:(message:string)=>void, error?:(err:any)=>void):void {
    let folderPath:string = process.cwd() + PathUtils.WORKSPACE +
                            this.__request.directory + UrlStringsEnum.SLASH +
                            VscSettingsTask.RESOURCE_NAMES[0];
    fs.mkdir(folderPath, (err:NodeJS.ErrnoException)=> {
      if(err) {
        error(this.buildErrorMessage(err));
      } else {
        folderPath += UrlStringsEnum.SLASH;
        fs.writeFile(
          folderPath + VscSettingsTask.RESOURCE_NAMES[1],
          this.getSettingsTemplate(),
          (err:any)=> {
            if(err) error(this.buildErrorMessage(err));
            else {
              fs.writeFile(
                folderPath + VscSettingsTask.RESOURCE_NAMES[2],
                this.getTasksTemplate(),
                (err:any)=> {
                  if(err) error(this.buildErrorMessage(err));
                  else success("VSC settings created: " + folderPath);
                }  
              );
            }
          }
        );
      }
    });
  }
};
