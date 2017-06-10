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

import { TestSuite, Test, BeforeClass, AfterClass, Async } from "jec-juta";
import { expect, assert } from "chai";
import { VscSettingsTask } from "../../../../../src/com/onsoft/wildcat/tasks/VscSettingsTask";
import { Task } from "../../../../../src/com/onsoft/wildcat/tasks/core/Task";
import * as utils from "../../../../../utils/test-utils/utilities/ProjectDirectoryTaskTestUtils";
import * as fs from "fs";
import { UrlStringsEnum } from "jec-commons";

@TestSuite({
  description: "Test the VscSettingsTask task"
})
export class VscSettingsTaskTest {
  
  @BeforeClass()
  public initTest():void {
    utils.deleteProjectFolder(utils.VSC_SETTINGS_DIRECTORY);
    utils.createProjectFolder(utils.VSC_SETTINGS_DIRECTORY);
  }

  @AfterClass()
  public resetTest():void {
    utils.deleteProjectFolder(utils.VSC_SETTINGS_DIRECTORY);
  }

  @Test({
    description: "should create a '.vscode' directory in the 'workspace/testVscTaskDir' folder with two settings files",
    timeout: 10000
  })
  public executeTest(@Async done:Function):void {
    let task:Task = new VscSettingsTask();
    let folderPath:string =
                        utils.PATH + utils.VSC_SETTINGS_DIRECTORY + "/.vscode/";
    utils.REQUEST.directory = utils.VSC_SETTINGS_DIRECTORY;
    task.setContext(utils.REQUEST, utils.GPM_CONFIG);
    task.execute((message:string)=> {
      expect(fs.existsSync(folderPath)).to.be.true;
      expect(fs.existsSync(folderPath + "settings.json")).to.be.true;
      expect(fs.existsSync(folderPath + "tasks.json")).to.be.true;
      done();
    },
    (err:any)=> {
      assert.fail(err, null, "test should not return an error");
    });
  }
}
