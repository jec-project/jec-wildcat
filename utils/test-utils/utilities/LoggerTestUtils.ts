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

import { WildcatLoggerProxy } from "../../../src/com/onsoft/wildcat/logging/WildcatLoggerProxy";
import { Logger, ConsoleLogger } from "jec-commons";

/*!
 * This module contains utilities to work with the WildcatLoggerProxy singleton.
 */

// Utilities:
export const initLogger:Function = function():void {
  let logger:Logger = new ConsoleLogger();
  WildcatLoggerProxy.getInstance().setLogger(logger);
};
export const resetLogger:Function = function():void {
  WildcatLoggerProxy.getInstance().setLogger(null);
};