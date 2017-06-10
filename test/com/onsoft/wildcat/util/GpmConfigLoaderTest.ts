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

import { TestSuite, Test, BeforeClass, TestSorters, Async } from "jec-juta";
import { JsonLoaderError } from "jec-commons";
import { expect, assert } from "chai";
import { GpmConfigLoader } from "../../../../../src/com/onsoft/wildcat/util/GpmConfigLoader";
import { GpmConfig } from "../../../../../src/com/onsoft/wildcat/context/GpmConfig";
import * as utils from "../../../../../utils/test-utils/utilities/GpmConfigLoaderTestUtils";

@TestSuite({
  description: "Test the GpmConfigLoader class methods",
  testOrder: TestSorters.ORDER_ASCENDING
})
export class GpmConfigLoaderTest {

  public loader:GpmConfigLoader = null;

  @BeforeClass()
  public initLoader():void {
    this.loader = new GpmConfigLoader();
  }

  @Test({
    description: "should return null",
    order: 1
  })
  public getArchetypePathTest():void {
    expect((this.loader as GpmConfigLoader).getArchetypePath()).to.be.null;
  }

  @Test({
    description: "should set a new GPM path property",
    order: 2
  })
  public setArchetypePathTest():void {
    let loader:GpmConfigLoader = this.loader as GpmConfigLoader;
    loader.setArchetypePath(utils.INVALID_PATH);
    expect(loader.getArchetypePath()).to.equal(utils.INVALID_PATH);
    loader.setArchetypePath(null);
    expect(loader.getArchetypePath()).to.be.null;
  }

  @Test({
    description: "should load a valid config file with the right GpmConfig instance",
    order: 3
  })
  public loadTest(@Async done:Function):void {
    let loader:GpmConfigLoader = this.loader as GpmConfigLoader;
    loader.setArchetypePath(utils.ARCHETYPES_PATH);
    this.loader.load(
      utils.VALID_REQUEST,
      (data:GpmConfig)=> {
        expect(data.gpm.version).to.equal(utils.GPM_VERSION);
        expect(data.project.version).to.equal(utils.VERSION);
        expect(data.project.name).to.equal(utils.NAME);
        expect(data.project.title).to.equal(utils.TITLE);
        expect(data.project.description).to.equal(utils.DESCRIPTION);
        expect(data.project.author).to.equal(utils.AUTHOR);
        expect(data.processedFiles).to.be.an("array");
        expect(data.processedFiles).to.have.lengthOf(utils.PROCESSED_FILES.length);
        expect(data.processedFiles).to.have.members(utils.PROCESSED_FILES);
        done();
      },
      (err:JsonLoaderError)=> {
        assert.fail(err, null, "valid config should not fail");
      }
    );
  }

  @Test({
    description: "should call the error callback method when no config file exists",
    order: 4
  })
  public loadFailTest(@Async done:Function):void {
    let loader:GpmConfigLoader = this.loader as GpmConfigLoader;
    loader.setArchetypePath(utils.INVALID_PATH);
    this.loader.load(
      utils.INVALID_REQUEST,
      (data:GpmConfig)=> {
        assert.fail(data, null, "invalid config should fail");
      },
      (err:JsonLoaderError)=> {
        expect(err).to.be.an.instanceOf(JsonLoaderError);
        done();
      }
    );
  }

  @Test({
    description: "should call the error callback method when loading an invalid config file",
    order: 5
  })
  public loadJsonFailTest(@Async done:Function):void {
    let loader:GpmConfigLoader = this.loader as GpmConfigLoader;
    loader.setArchetypePath(utils.ARCHETYPES_PATH);
    this.loader.load(
      utils.INVALID_REQUEST,
      (data:GpmConfig)=> {
        assert.fail(data, null, "invalid config should fail");
      },
      (err:JsonLoaderError)=> {
        expect(err).to.be.an.instanceOf(JsonLoaderError);
        done();
      }
    );
  }
}
