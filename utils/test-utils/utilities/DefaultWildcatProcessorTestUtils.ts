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
 * This module constains utilities used by the DefaultWildcatProcessorTest test
 * suite.
 */

// Utilities:
export const ARCHETYPE_DEST_FOLDER:string = "test";
const buildWildcatEmptyRequest:Function = function():WildcatRequest {
  const builder:WildcatRequestBuilder = new WildcatRequestBuilder();
  const request:WildcatRequest = builder.build();
  return request;
};
const buildWildcatRequest:Function = function(gpm:string):WildcatRequest {
  const properties:any = {
    foo: "foo_val",
    bar: "bar_val"
  };
  const builder:WildcatRequestBuilder = new WildcatRequestBuilder();
  const request:WildcatRequest = 
      builder.directory(ARCHETYPE_DEST_FOLDER)
             .gpm(gpm)
             .properties(properties)
             .build();
  return request;
};
export const EMPTY_REQUEST:WildcatRequest = buildWildcatEmptyRequest();
const buildWildcatInvalidRequest:Function = function():WildcatRequest {
  const request:WildcatRequest = buildWildcatRequest("invalid");
  return request;
};
export const INVALID_REQUEST:WildcatRequest = buildWildcatInvalidRequest();
const buildValidWildcatRequest:Function = function():WildcatRequest {
  const request:WildcatRequest = buildWildcatRequest("test");
  request.contextRoot = "test";
  request.projectName = "Test EJP";
  return request;
};
export const VALID_REQUEST:WildcatRequest = buildValidWildcatRequest();
export const ARCHETYPE_TEST_FOLDER:string = "utils/test-utils/archetypes";
export const ARCHETYPE_DEST_PATH:string = process.cwd() + "/workspace/test";
export const FILES:string[] = [
  "test",
  "webapp",
  "tsconfig.json",
  "src",
  ".vscode",
  "JEC-INF",
  "styles/webapp",
  "views/webapp",
  "package.json",
  "package-lock.json",
  "index.html/webapp",
  "Welcome.ts/src",
  "Welcome.js/src",
  "tasks.json/.vscode",
  "settings.json/.vscode",
  "web.json/JEC-INF",
  "css/webapp/styles",
  "welcome.ejs/webapp/views",
  "app.css/webapp/styles/css"
];