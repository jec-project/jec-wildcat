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
import { expect, assert } from "chai";
import { GpmConfigParser } from "../../../../../src/com/onsoft/wildcat/context/GpmConfigParser";
import { GpmConfig } from "../../../../../src/com/onsoft/wildcat/context/GpmConfig";
import { Gpm } from "../../../../../src/com/onsoft/wildcat/context/Gpm";
import { Project } from "../../../../../src/com/onsoft/wildcat/context/Project";
import { GpmConfigError } from "../../../../../src/com/onsoft/wildcat/exceptions/GpmConfigError";
import * as utils from "../../../../../utils/test-utils/utilities/GpmConfigParserTestUtils";

@TestSuite({
  description: "Test the GpmConfigParser class methods"
})
export class GpmConfigParserTest {

  public parser:GpmConfigParser = null;

  @Before()
  public initParser():void {
    this.parser = new GpmConfigParser();

  }
  
  @After()
  public resetParser():void {
    this.parser = null;
  }

  @Test({
    description: "should not return an error object when the GPM file is valid"
  })
  public parseValidTest():void {
    this.parser.parse(utils.GPM_FILE, (data:GpmConfig)=> {}, (err:any)=> {
      assert.fail("ko", "ok", "error callback method never should be called");
    });
  }
  
  @Test({
    description: "should  return an error object when the GPM file is not a POJO"
  })
  public parseInvalidTest():void {
    let invalidObject:any = [];
    this.parser.parse(invalidObject, (data:GpmConfig)=> {}, (err:GpmConfigError)=> {
      expect(err).to.be.an.instanceOf(GpmConfigError);
    });
  }

  @Test({
    description: "should create a valid 'GPM' instance"
  })
  public gpmTest():void {
    this.parser.parse(utils.GPM_FILE, (data:GpmConfig)=> {
      expect(data.gpm).to.be.an.instanceOf(Gpm);
      expect(data.gpm.version).to.equal(utils.GPM_VERSION);
    }, (err:any)=> {});
  }
  
  @Test({
    description: "should create a valid 'Project' instance"
  })
  public projectTest():void {
    this.parser.parse(utils.GPM_FILE, (data:GpmConfig)=> {
      expect(data.project).to.be.an.instanceOf(Project);
      expect(data.project.name).to.equal(utils.NAME);
      expect(data.project.version).to.equal(utils.VERSION);
      expect(data.project.title).to.equal(utils.TITLE);
      expect(data.project.description).to.equal(utils.DESCRIPTION);
      expect(data.project.author).to.equal(utils.AUTHOR);
    }, (err:any)=> {});
  }
  
  @Test({
    description: "should create an array of string that represents the type of files to be processed "
  })
  public processedFilesTest():void {
    this.parser.parse(utils.GPM_FILE, (data:GpmConfig)=> {
      expect(data.processedFiles).to.be.an("array");
      expect(data.processedFiles).to.have.lengthOf(utils.PROCESSED_FILES.length);
      expect(data.processedFiles).to.have.members(utils.PROCESSED_FILES);
    }, (err:any)=> {});
  }
}