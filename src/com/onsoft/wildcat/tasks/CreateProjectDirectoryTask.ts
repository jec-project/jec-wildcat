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

/**
 * The <code>CreateProjectDirectoryTask</code> class creates the project 
 * directory for a GPM.
 */
export class CreateProjectDirectoryTask extends AbstractTask implements Task {

  //////////////////////////////////////////////////////////////////////////////
  // Constructor function
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Creates a new <code>CreateProjectDirectoryTask</code> instance.
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
    let projectPath:string = process.cwd() + PathUtils.WORKSPACE +
                             this.__request.directory;
    fs.mkdir(projectPath, (err:NodeJS.ErrnoException)=> {
      if(err)
        error("an error occured while creating project directory:\n" + err);
      else
        success("project directory created: " + projectPath);
    });
  }
};
