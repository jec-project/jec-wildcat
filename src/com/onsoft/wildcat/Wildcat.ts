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

import {WildcatRequest} from "./WildcatRequest";

/**
 * The main Wildcat execution entry point, which will execute a full Wildcat
 * execution session.
 */
export interface Wildcat {

  //////////////////////////////////////////////////////////////////////////////
  // Public methods
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Executes the specified request.
   * 
   * @param {WildcatRequest} request the request to execute.
   * @param {Function} callback the callback method called an the end of the
   *                            process. This function takes an object parameter
   *                            which represents an error message whether the
   *                            process failed.
   */
  execute(request:WildcatRequest, callback:(err:any)=>void):void;
};
