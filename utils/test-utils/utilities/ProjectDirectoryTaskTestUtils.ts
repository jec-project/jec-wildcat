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
import { PathUtils } from "../../../src/com/onsoft/wildcat/util/PathUtils";
import { WildcatRequest } from "../../../src/com/onsoft/wildcat/WildcatRequest";
import { WildcatRequestBuilder } from "../../../src/com/onsoft/wildcat/builders/WildcatRequestBuilder";
import { JecStringsEnum } from "jec-commons";
const fse:any = require("fs-extra");

/*!
 * This module constains utilities used by the CreateProjectDirectoryTaskTest
 * test suite.
 */

// Utilities:
const PACKAGE:string = `{
  "name": "Custom Project",
  "version": "1.0.0",
  "description": "Used by the DependenciesInstallTaskTest test class to deploy dependencies",
  "author": "ONSOFT SYSTEMS",
  "license": "MIT",
  "dependencies": {
    "@types/handlebars": "^4.0.31"
  }
}`;
export const CREATE_PROJECT_DIRECTORY:string = "testCreateTaskDir";
export const VSC_SETTINGS_DIRECTORY:string = "testVscTaskDir";
export const DEPENDENCIES_INSTALL_DIRECTORY:string = "testDependenciesTaskDir";
export const DEPLOY_INSTALL_DIRECTORY:string = "testDeployTaskDir";
export const GPM_PATH:string = "test";
export const DEFAULT_ARCHETYPE_PATH:string = process.cwd() + "/public/wildcat/test/archetype";
export const ARCHETYPE_PATH:string = process.cwd() + "/utils/test-utils/archetypes";
const buildWildcatRequest:Function = function():WildcatRequest {
  let builder:WildcatRequestBuilder = new WildcatRequestBuilder();
  let request:WildcatRequest = builder.build();
  return request;
};
export const PATH:string = process.cwd() + PathUtils.WORKSPACE;
export const createProjectFolder:Function = function(dir:string):void {
  fs.mkdirSync(PATH + dir);
};
export const deleteProjectFolder:Function = function(dir:string):void {
  fse.removeSync(PATH + dir);
};
export const deleteProjectFolderAsync:Function = function(dir:string):void {
  fse.remove(PATH + dir);
};
export const createPackageFile:Function = function(dir:string):void {
  let fd:number = 0;
  let webbAppPath:string = PATH + dir + JecStringsEnum.WEB_APP;
  fs.mkdirSync(webbAppPath);
  fd = fs.openSync(webbAppPath + "package.json", "w");
  fs.writeSync(fd, PACKAGE, 0);
  fs.closeSync(fd);
};
export const REQUEST:WildcatRequest = buildWildcatRequest();
export const GPM_CONFIG:any = {

};
