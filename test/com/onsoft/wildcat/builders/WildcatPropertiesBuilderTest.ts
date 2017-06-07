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
import { WildcatPropertiesBuilder } from "../../../../../src/com/onsoft/wildcat/builders/WildcatPropertiesBuilder";
import * as utils from "../../../../../utils/test-utils/utilities/WildcatPropertiesBuilderTestUtils";

@TestSuite({
  description: "Test the WildcatPropertiesBuilder class methods"
})
export class WildcatPropertiesBuilderTest {

  public result:Map<string, any> = null;

  @BeforeClass()
  public init():void {
    let builder:WildcatPropertiesBuilder = new WildcatPropertiesBuilder();
    this.result = builder.build(utils.PROPERTIES);
  }

  @Test({
    description: "Should return a map with the specified properties"
  })
  public buildTest():void {
    expect(this.result.get("customProp")).to.equal(utils.CUSTOM_PROP);
  }
  
  @Test({
    description: "Should exclude the low dash character (_) from the returned map"
  })
  public buildExcludeLowdashTest():void {
    expect(this.result.get("_")).to.equal(undefined);
  }
  
  @Test({
    description: "Should exclude the 'gpm' property from the returned map"
  })
  public buildExcludeGpmTest():void {
    expect(this.result.get("gpm")).to.equal(undefined);
  }
}