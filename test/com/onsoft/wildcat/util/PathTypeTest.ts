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

import { TestSuite, Test } from "jec-juta";
import { expect } from "chai";
import { PathType } from "../../../../../src/com/onsoft/wildcat/util/PathType";
import * as utils from "../../../../../utils/test-utils/utilities/PathTypeTestUtils";

@TestSuite({
  description: "Test the PathType enum"
})
export class PathTypeTest {

  @Test({
    description: "PathType.FILE should be equal to '0'"
  })
  public FILETest():void {
    expect(PathType.FILE).to.equal(utils.FILE);
  }

  @Test({
    description: "PathType.DIRECTORY should be equal to '1'"
  })
  public DIRECTORYTest():void {
    expect(PathType.DIRECTORY).to.equal(utils.DIRECTORY);
  }
}
