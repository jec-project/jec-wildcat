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


/*!
 * This module constains utilities used by the DefaultGpmValidatorTest test
 * suite.
 */

// Utilities:
export const VALID_GPM_FILE:any = {
  gpm: {
    version: "1.0.0"
  },
  project: {
    name: "Basic",
    version: "1.0.0",
    title: "Default GlassCat Project Model",
    description: "Default GlassCat Project Model",
    author: "ONSOFT SYSTEMS"
  },
  processedFiles: ["html", "json", "css", "ejs"]
};
export const MISSING_GPM_PROP:any = {};
export const INVALID_GPM_PROP:any = {
  gpm: false
};
export const MISSING_PROJECT_PROP:any = {
  gpm: {
    version: "1.0.0"
  }
};
export const INVALID_PROJECT_PROP:any = {
  gpm: {
    version: "1.0.0"
  },
  project: false
};
