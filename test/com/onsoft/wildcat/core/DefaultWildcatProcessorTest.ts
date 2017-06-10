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

import { TestSuite, Test, Before, After, BeforeClass, AfterClass, Async } from "jec-juta";
import { expect, assert } from "chai";
import { DefaultWildcatProcessor } from "../../../../../src/com/onsoft/wildcat/core/DefaultWildcatProcessor";
import { ArchetypePath } from "../../../../../src/com/onsoft/wildcat/util/ArchetypePath";
import { ArchetypePathWalker } from "../../../../../src/com/onsoft/wildcat/util/ArchetypePathWalker";
import * as utils from "../../../../../utils/test-utils/utilities/DefaultWildcatProcessorTestUtils";
import * as taskUtils from "../../../../../utils/test-utils/utilities/ProjectDirectoryTaskTestUtils";
import * as loggerUtils from "../../../../../utils/test-utils/utilities/LoggerTestUtils";

@TestSuite({
  description: "Test the DefaultWildcatProcessor class methods"
})
export class DefaultWildcatProcessorTest {

  public processor:DefaultWildcatProcessor = null;

  public fileProcessor(element:ArchetypePath):void {
    let ref:string = element.file + element.targetPath;
    expect(utils.FILES.indexOf(ref)).not.to.equal(-1);
  }

  @BeforeClass()
  public initTest():void {
    loggerUtils.initLogger();
    taskUtils.deleteProjectFolder(utils.ARCHETYPE_DEST_FOLDER);
  }

  @After()
  public resetProcessor():void {
    this.processor = null;
  }

  @Before()
  public initProcessor():void {
    this.processor = new DefaultWildcatProcessor();
    this.processor.setArchetypePath(utils.ARCHETYPE_TEST_FOLDER);
  }

  @AfterClass()
  public resetTest():void {
    loggerUtils.resetLogger();
    taskUtils.deleteProjectFolderAsync(utils.ARCHETYPE_TEST_FOLDER);
  }

  @Test({
    description: "should return an error when no GPM file is defined in the request"
  })
  public noGpmTest(@Async done:Function):void {
    this.processor.execute(
      utils.EMPTY_REQUEST,
      (err:any)=> {
        expect(err).not.to.be.null;
        done();
      }
    );
  }

  @Test({
    description: "should return an error when GPM file is not valid"
  })
  public invalidGpmTest(@Async done:Function):void {
    this.processor.execute(
      utils.INVALID_REQUEST,
      (err:any)=> {
        expect(err).not.to.be.null;
        done();
      }
    );
  }

  @Test({
    description: "should deploy a GPM project from the specified archetype",
    timeout: 50000
  })
  public validGpmTest(@Async done:Function):void {
    let walker:ArchetypePathWalker = null;
    this.processor.execute(
      utils.VALID_REQUEST,
      (err:any)=> {
        expect(err).to.be.null;
        walker = new ArchetypePathWalker();
        walker.process = this.fileProcessor;
        walker.walk(
          utils.ARCHETYPE_DEST_PATH,
          ()=> {
            done();
          },
          (err:any)=> {
            assert.fail(err, null, "test should not fail");
          }
        );
      }
    );
  }
}