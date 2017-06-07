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

import {FileStats} from "jec-commons";

/**
 * A utility class that keeps information about a file contained whithin a GPM
 * archetype directory.
 */
export class ArchetypePath {

  //////////////////////////////////////////////////////////////////////////////
  // Constructor function
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Creates a new <code>ArchetypePath</code> instance.
   */
  constructor() {}

  //////////////////////////////////////////////////////////////////////////////
  // Public properties
  //////////////////////////////////////////////////////////////////////////////

  /**
   * The name of the file associated with this <code>ArchetypePath</code>
   * instance.
   */
  public file:string = null;
  
  /**
   * The target path of the file associated with this <code>ArchetypePath</code>
   * instance.
   */
  public targetPath:string = null;

  /**
   * The origin path of the file associated with this <code>ArchetypePath</code>
   * instance.
   */
  public originPath:string = null;

  /**
   * Indicates whether the current path is a directory or a file. Valid values
   * are defined by the <code>PathType</code> enum.
   */
  public type:number = -1;

  /**
   * The reference to the <code>FileStats</code> object for this elements.
   */
  public stats:FileStats = null;

  /**
   * The extension of the file associated with this <code>ArchetypePath</code>
   * instance.
   */
  public extension:string = null;
};
