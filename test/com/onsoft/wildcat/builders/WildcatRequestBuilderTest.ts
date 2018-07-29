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

import { TestSuite, Test, Before, After } from "jec-juta";
import { expect } from "chai";
import { WildcatRequestBuilder } from "../../../../../src/com/onsoft/wildcat/builders/WildcatRequestBuilder";
import { DefaultWildcatRequest } from "../../../../../src/com/onsoft/wildcat/core/DefaultWildcatRequest";
import { WildcatRequest } from "../../../../../src/com/onsoft/wildcat/WildcatRequest";
import * as utils from "../../../../../utils/test-utils/utilities/WildcatRequestBuilderTestUtils";

@TestSuite({
  description: "Test the WildcatRequestBuilder class methods"
})
export class WildcatRequestBuilderTest {

  public builder:WildcatRequestBuilder = null;

  @Before()
  public initBuilder():void {
    this.builder = new WildcatRequestBuilder();
  }

  @After()
  public resetBuilder():void {
    this.builder = null;
  }

  @Test({
    description: "Should return an instance of DefaultWildcatRequest"
  })
  public buildTest():void {
    this.builder = new WildcatRequestBuilder();
    expect(this.builder.build()).to.be.an.instanceOf(DefaultWildcatRequest);
  }
  
  @Test({
    description: "Should return a WildcatRequest object with the right project name"
  })
  public projectNameTest():void {
    this.builder = new WildcatRequestBuilder();
    this.builder.projectName(utils.PROJECT_NAME);
    const result:WildcatRequest = this.builder.build();
    expect(result).to.have.property("projectName", utils.PROJECT_NAME);
  }
  
  @Test({
    description: "Should return a WildcatRequest object with the right gpm value"
  })
  public gpmTest():void {
    this.builder = new WildcatRequestBuilder();
    this.builder.gpm(utils.GPM);
    const result:WildcatRequest = this.builder.build();
    expect(result).to.have.property("gpm", utils.GPM);
  }
  
  @Test({
    description: "Should return a WildcatRequest object with the right directory value"
  })
  public directoryTest():void {
    this.builder = new WildcatRequestBuilder();
    this.builder.directory(utils.DIRECTORY);
    const result:WildcatRequest = this.builder.build();
    expect(result).to.have.property("directory", utils.DIRECTORY);
  }

  @Test({
    description: "Should return a WildcatRequest object with the right contextRoot value"
  })
  public contextRootTest():void {
    this.builder = new WildcatRequestBuilder();
    this.builder.contextRoot(utils.CONTEXTROOT);
    const result:WildcatRequest = this.builder.build();
    expect(result).to.have.property("contextRoot", utils.CONTEXTROOT);
  }

  @Test({
    description: "Should return a WildcatRequest object with the right properties map"
  })
  public properties():void {
    this.builder = new WildcatRequestBuilder();
    this.builder.properties(utils.PROPERTIES);
    const result:WildcatRequest = this.builder.build();
    const properties:Map<string, any> = result.properties;
    expect(properties).to.be.an.instanceOf(Map);
    expect(properties.get("foo")).to.equal(utils.FOO_PROPERTY);
    expect(properties.get("bar")).to.equal(utils.BAR_PROPERTY);
  }
}