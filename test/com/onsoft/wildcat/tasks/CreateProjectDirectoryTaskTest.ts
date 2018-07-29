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
import { CreateProjectDirectoryTask } from "../../../../../src/com/onsoft/wildcat/tasks/CreateProjectDirectoryTask";
import { Task } from "../../../../../src/com/onsoft/wildcat/tasks/core/Task";
import * as utils from "../../../../../utils/test-utils/utilities/ProjectDirectoryTaskTestUtils";
import * as fs from "fs";

@TestSuite({
  description: "Test the CreateProjectDirectoryTask task"
})
export class CreateProjectDirectoryTaskTest {

  @BeforeAll()
  public initTest():void {
    utils.deleteProjectFolder(utils.CREATE_PROJECT_DIRECTORY);
  }

  @AfterAll()
  public resetTest():void {
    utils.deleteProjectFolder(utils.CREATE_PROJECT_DIRECTORY);
  }

  @Test({
    description: "should create a new directory in the 'workspace' folder",
    timeout: 5000
  })
  public executeTest(@Async done:Function):void {
    const task:Task = new CreateProjectDirectoryTask();
    utils.REQUEST.directory = utils.CREATE_PROJECT_DIRECTORY;
    task.setContext(utils.REQUEST, utils.GPM_CONFIG);
    task.execute((message:string)=> {
      expect(fs.existsSync(utils.PATH + utils.CREATE_PROJECT_DIRECTORY)).to.be.true;
      done();
    },
    (err:any)=> {
      assert.fail(err, null, "test should not return an error");
    });
  }
}
