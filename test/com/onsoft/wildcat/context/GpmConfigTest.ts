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
import { GpmConfig } from "../../../../../src/com/onsoft/wildcat/context/GpmConfig";

@TestSuite({
  description: "Test the GpmConfig class properties"
})
export class GpmConfigTest {

  public config:GpmConfig = null;

  @BeforeClass()
  public initProject():void {
    this.config = new GpmConfig();
  }

  @Test({
    description: "Should have a 'gpm' property set to 'null'"
  })
  public gpmTest():void {
    expect(this.config).to.have.property("gpm", null);
  }
  
  @Test({
    description: "Should have a 'project' property set to 'null'"
  })
  public projectTest():void {
    expect(this.config).to.have.property("project", null);
  }
  
  @Test({
    description: "Should have a 'processedFiles' property set to 'null'"
  })
  public processedFilesTest():void {
    expect(this.config).to.have.property("processedFiles", null);
  }
}