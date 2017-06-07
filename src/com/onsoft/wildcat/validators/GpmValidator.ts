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

import {GpmConfigError} from "../exceptions/GpmConfigError";

/**
 * The <code>GpmValidator</code> interface defines the API for validating 
 * GlassCat Project Model (GPM) files.
 */
export interface GpmValidator {

  /**
   * Validates the specified GPM file.
   * 
   * @param {Object} gpmConfig the GPM file to validate.
   * @param {Function} callback the method called once the validation process is
   *                            finished. This function takes an error object as
   *                            parameter. 
   */
  validate(gpmConfig:any, callback:(err:GpmConfigError)=>void):void;
};
