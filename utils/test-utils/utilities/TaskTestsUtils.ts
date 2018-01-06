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

import { WildcatRequest } from "../../../src/com/onsoft/wildcat/WildcatRequest";
import { WildcatRequestBuilder } from "../../../src/com/onsoft/wildcat/builders/WildcatRequestBuilder";

/*!
 * This module constains utilities used by the AbstractTaskTest and
 * DefaultTaskRunnerTest test suites.
 */

// Utilities:
const buildWildcatRequest:Function = function():WildcatRequest {
  let builder:WildcatRequestBuilder = new WildcatRequestBuilder();
  let request:WildcatRequest = builder.build();
  return request;
};
export const SUCCESS_MSG:string = "Task success";
export const GPM_CONFIG:any = {
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
  processedFiles: ["html", "json", "css", "ejs"],
  preInstall: [],
  postInstall: []
};
export const REQUEST:WildcatRequest = buildWildcatRequest();

