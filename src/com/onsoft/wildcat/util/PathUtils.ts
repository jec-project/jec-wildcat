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

/**
 * A utility class for working with Wildcat directories.
 */
export class PathUtils {

  //////////////////////////////////////////////////////////////////////////////
  // Public methods
  //////////////////////////////////////////////////////////////////////////////

  /**
   * The reference to the workspace directory name.
   */
  public static readonly WORKSPACE:string = "/workspace/";
  
  /**
   * The reference to the GPM public directory.
   */
  public static readonly GPMS_DIRECTORY:string = "/public/wildcat/";

  /**
   * The reference to the GPM archetype directory.
   */
  public static readonly ARCHETYPE_DIRECTORY:string = "/archetype";
};
