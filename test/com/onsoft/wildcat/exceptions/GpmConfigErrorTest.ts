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
import { GpmConfigError } from "../../../../../src/com/onsoft/wildcat/exceptions/GpmConfigError";
import * as utils from "../../../../../utils/test-utils/utilities/GpmConfigErrorTestUtils";

@TestSuite({
  description: "Test the GpmConfigError class methods"
})
export class GpmConfigErrorTest {

  @Test({
    description: "GpmConfigError should extend Error"
  })
  public gpmTest():void {
    const error:GpmConfigError = new GpmConfigError(null);
    expect(error).to.be.instanceOf(Error);
  }
  
  @Test({
    description: "should return the same string as passed in the class constructor"
  })
  public propertiesTest():void {
    const error:GpmConfigError = new GpmConfigError(utils.ERROR_MSG);
    expect(error.message).to.equal(utils.ERROR_MSG);
  }
}