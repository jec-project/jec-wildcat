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

import { TestSuite, Test, BeforeAll } from "jec-juta";
import { expect } from "chai";
import { TaskImpl } from "../../../../../../utils/test-utils/classes/TaskImpl";
import * as utils from "../../../../../../utils/test-utils/utilities/TaskTestsUtils";

@TestSuite({
  description: "Test the AbstractTask methods"
})
export class AbstractTaskTest {

  public task:TaskImpl = null;

  @BeforeAll()
  public initTest():void {
    this.task = new TaskImpl();
  }

  @Test({
    description: "#setContext() should set the protected '__request' property with the specified object"
  })
  public setRequestTest():void {
    this.task.setContext(utils.REQUEST, utils.GPM_CONFIG);
    expect(this.task.getRequest()).equal(utils.REQUEST);
  }
  
  @Test({
    description: "#setContext() should set the protected '__config' property with the specified object"
  })
  public setConfigTest():void {
    this.task.setContext(utils.REQUEST, utils.GPM_CONFIG);
    expect(this.task.getConfig()).equal(utils.GPM_CONFIG);
  }
  
  @Test({
    description: "should invoke the success callback method"
  })
  public executeTest():void {
    this.task.execute((message:string)=> {
      expect(message).equal(utils.SUCCESS_MSG);
    });
  }
}
