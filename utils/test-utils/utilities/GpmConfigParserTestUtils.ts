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
 * This module constains utilities used by the GpmConfigParserTest test suite.
 */

// Utilities:
export const GPM_VERSION:string = "1.0.0";
export const VERSION:string = "1.0.0";
export const NAME:string = "Basic";
export const TITLE:string = "Default GlassCat Project Model";
export const DESCRIPTION:string = "Default GlassCat Project Model";
export const AUTHOR:string = "ONSOFT SYSTEMS";
export const PROCESSED_FILES:string[] = ["html", "json", "css", "ejs"];
export const PRE_INSTALL:string[] = [];
export const POST_INSTALL:string[] = [];
export const GPM_FILE:any = {
  gpm: {
    version: GPM_VERSION
  },
  project: {
    name: NAME,
    version: VERSION,
    title: TITLE,
    description: DESCRIPTION,
    author: AUTHOR
  },
  processedFiles: PROCESSED_FILES,
  preInstall: PRE_INSTALL,
  postInstall: POST_INSTALL
};
