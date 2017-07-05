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

import { TestSuite, Test, BeforeAll, AfterAll, Async, Before, After, TestSorters } from "jec-juta";
import { expect, assert } from "chai";
import { DeployArchetypeTask } from "../../../../../src/com/onsoft/wildcat/tasks/DeployArchetypeTask";
import { ArchetypePath } from "../../../../../src/com/onsoft/wildcat/util/ArchetypePath";
import { ArchetypePathWalker } from "../../../../../src/com/onsoft/wildcat/util/ArchetypePathWalker";
import { Task } from "../../../../../src/com/onsoft/wildcat/tasks/core/Task";
import * as utils from "../../../../../utils/test-utils/utilities/ProjectDirectoryTaskTestUtils";
import * as walkerUtils from "../../../../../utils/test-utils/utilities/ArchetypePathWalkerTestUtils";

@TestSuite({
  description: "Test the DeployArchetypeTask task",
  testOrder: TestSorters.ORDER_ASCENDING
})
export class DeployArchetypeTaskTest {
  
  public task:Task = null;

  public fileProcessor(element:ArchetypePath):void {
    let ref:string = element.file + element.targetPath;
    expect(walkerUtils.FILES.indexOf(ref)).not.to.equal(-1);
  }

  @BeforeAll()
  public initTest():void {
    utils.deleteProjectFolder(utils.DEPLOY_INSTALL_DIRECTORY);
    utils.createProjectFolder(utils.DEPLOY_INSTALL_DIRECTORY);
  }

  @AfterAll()
  public resetTest():void {
    utils.deleteProjectFolderAsync(utils.DEPLOY_INSTALL_DIRECTORY);
  }

  @Before()
  public iniTask():void {
    this.task = new DeployArchetypeTask();
    utils.REQUEST.directory = utils.DEPLOY_INSTALL_DIRECTORY;
    utils.REQUEST.gpm = utils.GPM_PATH;
    this.task.setContext(utils.REQUEST, utils.GPM_CONFIG);
  } 

  @After()
  public resetTask():void {
    this.task = null;
    utils.REQUEST.directory = null;
    utils.REQUEST.gpm = null;
  }

  @Test({
    description: "should return null when no default path to the archetype is defined",
    order: 1
  })
  public getArchetypePathTest():void {
    expect((this.task as DeployArchetypeTask).getArchetypePath()).to.be.null;
  }

  @Test({
    description: "should sets the default path to the archetype",
    order: 2
  })
  public setArchetypePathTest():void {
    let task:DeployArchetypeTask = this.task as DeployArchetypeTask;
    task.setArchetypePath(utils.ARCHETYPE_PATH);
    expect((task).getArchetypePath()).to.equal(utils.ARCHETYPE_PATH);
  }

  @Test({
    description: "should create a project based on the specified archetype",
    timeout: 50000,
    order: 3
  })
  public executeTest(@Async done:Function):void {
    let walker:ArchetypePathWalker = null;
    let task:DeployArchetypeTask = this.task as DeployArchetypeTask;
    task.setArchetypePath(utils.ARCHETYPE_PATH);
    task.execute((message:string)=> {
      walker = new ArchetypePathWalker();
        walker.process = this.fileProcessor;
        walker.walk(
          walkerUtils.PATH,
          ()=> {
            done();
          },
          (err:any)=> {
            assert.fail(err, null, "test should not fail");
          }
        );
    },
    (err:any)=> {
      assert.fail(err, null, "test should not return an error");
    });
  }
}
