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
import { ArchetypePath } from "../../../../../src/com/onsoft/wildcat/util/ArchetypePath";

@TestSuite({
  description: "Test the ArchetypePath class properties"
})
export class ArchetypePathTest {

  public path:ArchetypePath = null;

  @BeforeClass()
  public initProject():void {
    this.path = new ArchetypePath();
  }

  @Test({
    description: "should have a 'file' property set to 'null'"
  })
  public fileTest():void {
    expect(this.path).to.have.property("file", null);
  }
  
  @Test({
    description: "should have a 'targetPath' property set to 'null'"
  })
  public targetPathTest():void {
    expect(this.path).to.have.property("targetPath", null);
  }
  
  @Test({
    description: "should have a 'originPath' property set to 'null'"
  })
  public originPathTest():void {
    expect(this.path).to.have.property("originPath", null);
  }
  
  @Test({
    description: "should have a 'type' property set to '-1'"
  })
  publictypeTest():void {
    expect(this.path).to.have.property("type", -1);
  }

  @Test({
    description: "should have a 'stats' property set to 'null'"
  })
  public statsTest():void {
    expect(this.path).to.have.property("stats", null);
  }
  
  @Test({
    description: "should have a 'extension' property set to 'null'"
  })
  public extensionTest():void {
    expect(this.path).to.have.property("extension", null);
  }
}