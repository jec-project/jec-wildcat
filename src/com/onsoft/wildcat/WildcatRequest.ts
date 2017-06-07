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

/**
 * Defines the basic set of API you must implement to create a request executed
 * whithin a full Wildcat session.
 */
export interface WildcatRequest {

  //////////////////////////////////////////////////////////////////////////////
  // Public methods
  //////////////////////////////////////////////////////////////////////////////

  /**
   * The path to the GlassCat Project Model (GPM) for this Wildcat request.
   */
  gpm:string;

  /**
   * The custom properties for this Wildcat request.
   */
  properties:Map<string, any>;

  /**
   * The name of the project associated with this Wildcat request.
   */
  projectName:string;

  /**
   * The directory where the project associated with this Wildcat request is
   * deployed.
   */
  directory:string;
  
  /**
   * The context root of the project associated with this Wildcat request.
   */
  contextRoot:string;
};
