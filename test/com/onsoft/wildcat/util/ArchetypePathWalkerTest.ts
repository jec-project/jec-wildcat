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

import { TestSuite, Test, Async } from "jec-juta";
import { expect, assert } from "chai";
import { ArchetypePathWalker } from "../../../../../src/com/onsoft/wildcat/util/ArchetypePathWalker";
import { ArchetypePath } from "../../../../../src/com/onsoft/wildcat/util/ArchetypePath";
import * as utils from "../../../../../utils/test-utils/utilities/ArchetypePathWalkerTestUtils";

@TestSuite({
  description: "Test the ArchetypePathWalker class methods"
})
export class ArchetypePathWalkerTest {

  public numProcessedFiles:number = 0;

  public fileProcessor(element:ArchetypePath):void {
    let ref:string = element.file + element.targetPath;
    expect(utils.FILES.indexOf(ref)).not.to.equal(-1);
    this.numProcessedFiles++;
  }

  @Test({
    description: "should walk through the complete folder structure",
    timeout: 10000
  })
  public walkTest(@Async done):void {
    let walker:ArchetypePathWalker = new ArchetypePathWalker();
    walker.process = this.fileProcessor.bind(this);
    walker.walk(
      utils.PATH,
      ()=> {
        expect(this.numProcessedFiles).to.equal(utils.FILES.length);
        done();
      },
      (err:any)=> {
        assert.fail(err, null, "Test should not fail");
      }
    );
  }
}