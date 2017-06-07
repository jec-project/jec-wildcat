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

import { TestSuite, Test, BeforeClass } from "jec-juta";
import * as chai from "chai";
import * as spies from "chai-spies";
import { TaskImpl } from "../../../../../../utils/test-utils/classes/TaskImpl";
import { DefaultTaskRunner } from "../../../../../../src/com/onsoft/wildcat/tasks/core/DefaultTaskRunner";
import { TaskRunner } from "../../../../../../src/com/onsoft/wildcat/tasks/core/TaskRunner";
import * as utils from "../../../../../../utils/test-utils/utilities/TaskTestsUtils";

// Chai declarations:
const expect:any = chai.expect;
chai.use(spies);

@TestSuite({
  description: "Test the DefaultTaskRunner methods"
})
export class DefaultTaskRunnerTest {

  public task:TaskImpl = null;
  public taskRunner:TaskRunner = null;

  @BeforeClass()
  public initTask():void {
    this.task = new TaskImpl();
    this.taskRunner = new DefaultTaskRunner();
  }

  @Test({
    description: "Should invoke the success callback method"
  })
  public runTest():void {
    this.taskRunner.run(this.task, (message:string)=> {
      expect(message).equal(utils.SUCCESS_MSG);
    });
  }
  
  @Test({
    description: "Should call the execute method on the specified task"
  })
  public executeTaskTest():void {
    let spy:any = chai.spy.on(this.task, "execute");
    this.taskRunner.run(this.task, (message:string)=> {
      expect(spy).to.have.been.called.once;
    });
  }
}
