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

import { TestSuite, Test, BeforeAll, AfterAll, Async } from "jec-juta";
import { expect, assert } from "chai";
import { DependenciesInstallTask } from "../../../../../src/com/onsoft/wildcat/tasks/DependenciesInstallTask";
import { Task } from "../../../../../src/com/onsoft/wildcat/tasks/core/Task";
import * as utils from "../../../../../utils/test-utils/utilities/ProjectDirectoryTaskTestUtils";
import * as loggerUtils from "../../../../../utils/test-utils/utilities/LoggerTestUtils";
import * as fs from "fs";

@TestSuite({
  description: "Test the DependenciesInstallTask task"
})
export class DependenciesInstallTaskTest {
  
  @BeforeAll()
  public initTest():void {
    utils.deleteProjectFolder(utils.DEPENDENCIES_INSTALL_DIRECTORY);
    utils.createProjectFolder(utils.DEPENDENCIES_INSTALL_DIRECTORY);
    utils.createPackageFile(utils.DEPENDENCIES_INSTALL_DIRECTORY);
    loggerUtils.initLogger();
  }

  @AfterAll()
  public resetTest():void {
    utils.deleteProjectFolder(utils.DEPENDENCIES_INSTALL_DIRECTORY);
    loggerUtils.resetLogger();
  }

  @Test({
    description: "should create a 'node_module' directory in the 'workspace/testDependenciesTaskDir' folder",
    timeout: 50000
  })
  public executeTest(@Async done:Function):void {
    const task:Task = new DependenciesInstallTask();
    const folderPath:string = utils.PATH + utils.DEPENDENCIES_INSTALL_DIRECTORY;
    utils.REQUEST.directory = utils.DEPENDENCIES_INSTALL_DIRECTORY;
    task.setContext(utils.REQUEST, utils.GPM_CONFIG);
    task.execute((message:string)=> {
      expect(fs.existsSync(folderPath)).to.be.true;
      expect(fs.existsSync(folderPath + "/node_modules")).to.be.true;
      done();;
    },
    (err:any)=> {
      assert.fail(err, null, "test should not return an error");
    });
  }
}
