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
 * This module constains utilities used by the GpmConfigLoaderTest test suite.
 */

// Utilities:
export const ARCHETYPES_PATH:string = process.cwd() + "/utils/test-utils/archetypes/";
const buildWildcatRequest:Function = function(gpm:string):WildcatRequest {
  let builder:WildcatRequestBuilder = new WildcatRequestBuilder();
  let request:WildcatRequest = 
      builder.directory(process.cwd() + ARCHETYPES_PATH)
             .gpm(gpm)
             .build();
  return request;
};
const buildValidWildcatRequest:Function = function():WildcatRequest {
  let request:WildcatRequest = buildWildcatRequest("test");
  return request;
};
const buildInvalidWildcatRequest:Function = function():WildcatRequest {
  let request:WildcatRequest = buildWildcatRequest("invalid");
  return request;
};
export const VALID_REQUEST:WildcatRequest = buildValidWildcatRequest();
export const INVALID_REQUEST:WildcatRequest = buildInvalidWildcatRequest();
export const GPM_VERSION:string = "1.0.0";
export const VERSION:string = "1.0.0";
export const NAME:string = "Test";
export const TITLE:string = "Test GlassCat Project Model";
export const DESCRIPTION:string = "Deploys a test GlassCat project without any dependencies.";
export const AUTHOR:string = "ONSOFT SYSTEMS";
export const PROCESSED_FILES:string[] = ["html", "json", "css", "ejs"];
export const INVALID_PATH:string = "path/to/gpm";
