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
import { expect } from "chai";
import { DefaultWildcatProcessor } from "../../../../../src/com/onsoft/wildcat/core/DefaultWildcatProcessor";

@TestSuite({
  description: "Test the DefaultWildcatProcessor class methods",
  disabled: true
})
export class DefaultWildcatProcessorTest {

  public request:DefaultWildcatProcessor = null;

 /* @BeforeClass()
  public initProject():void {
    this.request = new DefaultWildcatRequest();
  }

  @Test({
    description: "Should have a 'gpm' property set to 'null'"
  })
  public gpmTest():void {
    expect(this.request).to.have.property("gpm", null);
  }
  
  @Test({
    description: "Should have a 'properties' property set to 'null'"
  })
  public propertiesTest():void {
    expect(this.request).to.have.property("properties", null);
  }
  
  @Test({
    description: "Should have a 'projectName' property set to 'null'"
  })
  public projectNameTest():void {
    expect(this.request).to.have.property("projectName", null);
  }
  
  @Test({
    description: "Should have a 'contextRoot' property set to 'null'"
  })
  public contextRootTest():void {
    expect(this.request).to.have.property("contextRoot", null);
  }
  
  @Test({
    description: "Should have a 'directory' property set to 'null'"
  })
  public directoryTest():void {
    expect(this.request).to.have.property("directory", null);
  }*/
}