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

import { TestSuite, Test } from "jec-juta";
import { expect } from "chai";
import { PathUtils } from "../../../../../src/com/onsoft/wildcat/util/PathUtils";
import * as utils from "../../../../../utils/test-utils/utilities/PathUtilsTestUtils";

@TestSuite({
  description: "Test the PathUtils class constants"
})
export class PathUtilsTest {

  @Test({
    description: "PathUtils.WORKSPACE should be equal to '/workspace/'"
  })
  public WORKSPACETest():void {
    expect(PathUtils.WORKSPACE).to.equal(utils.WORKSPACE);
  }

  @Test({
    description: "PathUtils.GPMS_DIRECTORY should be equal to '/public/wildcat/'"
  })
  public GPMS_DIRECTORYTest():void {
    expect(PathUtils.GPMS_DIRECTORY).to.equal(utils.GPMS_DIRECTORY);
  }
  
  @Test({
    description: "PathUtils.ARCHETYPE_DIRECTORY should be equal to '/archetype'"
  })
  public ARCHETYPE_DIRECTORYTest():void {
    expect(PathUtils.ARCHETYPE_DIRECTORY).to.equal(utils.ARCHETYPE_DIRECTORY);
  }
}
