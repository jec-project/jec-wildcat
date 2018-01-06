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

import { TestSuite, Test, BeforeAll } from "jec-juta";
import { expect } from "chai";
import { DefaultGpmValidator } from "../../../../../src/com/onsoft/wildcat/validators/DefaultGpmValidator";
import { GpmConfigError } from "../../../../../src/com/onsoft/wildcat/exceptions/GpmConfigError";
import * as utils from "../../../../../utils/test-utils/utilities/DefaultGpmValidatorTestUtils";

@TestSuite({
  description: "Test the DefaultGpmValidator class properties"
})
export class DefaultGpmValidatorTest {

  public validator:DefaultGpmValidator = null;

  @BeforeAll()
  public initTest():void {
    this.validator = new DefaultGpmValidator();
  }

  @Test({
    description: "should validate valid config files"
  })
  public validateTest():void {
    this.validator.validate(utils.VALID_GPM_FILE, (err:GpmConfigError)=>{
      expect(err).to.be.null;
    });
  }
  
  @Test({
    description: "should return an error when the 'gpm' property is missing"
  })
  public validateMissingGpmTest():void {
    this.validator.validate(utils.MISSING_GPM_PROP, (err:GpmConfigError)=>{
      expect(err).not.to.be.null;
    });
  }
  
  @Test({
    description: "should return an error when the 'gpm' property is not a POJO"
  })
  public validateInvalidGpmTest():void {
    this.validator.validate(utils.INVALID_GPM_PROP, (err:GpmConfigError)=>{
      expect(err).not.to.be.null;
    });
  }
  
  @Test({
    description: "should return an error when the 'project' property is missing"
  })
  public validateMissingPrijectTest():void {
    this.validator.validate(utils.MISSING_PROJECT_PROP, (err:GpmConfigError)=>{
      expect(err).not.to.be.null;
    });
  }
  
  @Test({
    description: "should return an error when the 'project' property is not a POJO"
  })
  public validateInvalidProjectTest():void {
    this.validator.validate(utils.INVALID_PROJECT_PROP, (err:GpmConfigError)=>{
      expect(err).not.to.be.null;
    });
  }
}