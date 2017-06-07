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

import * as fs from "fs";
import {PathUtils} from "../../../src/com/onsoft/wildcat/util/PathUtils";
import { WildcatRequest } from "../../../src/com/onsoft/wildcat/WildcatRequest";
import { WildcatRequestBuilder } from "../../../src/com/onsoft/wildcat/builders/WildcatRequestBuilder";
const rimraf:any = require("rimraf");

/*!
 * This module constains utilities used by the CreateProjectDirectoryTaskTest
 * test suite.
 */

// Utilities:
export const DIRECTORY:string = "testTaskDir";
const buildWildcatRequest:Function = function():WildcatRequest {
  let builder:WildcatRequestBuilder = new WildcatRequestBuilder();
  let request:WildcatRequest = builder.build();
  request.directory = DIRECTORY;
  return request;
};
export const PATH:string = process.cwd() + PathUtils.WORKSPACE;
export const createTempFolder:Function = function():void {
  fs.mkdirSync(PATH);
};
export const deleteTempFolder:Function = function():void {
  rimraf.sync(PATH);
};
export const REQUEST:WildcatRequest = buildWildcatRequest();
export const GPM_CONFIG:any = {

};