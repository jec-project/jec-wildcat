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

import {GpmConfig} from "../context/GpmConfig";
import {GpmConfigParser} from "../context/GpmConfigParser";
import {WildcatRequest} from "../WildcatRequest";
import {JsonLoader, JsonLoaderError} from "jec-commons";
import {PathUtils} from "./PathUtils";

/**
 * A helper class for loading Glasscat Project Model (GPM) files.
 */
export class GpmConfigLoader {

  //////////////////////////////////////////////////////////////////////////////
  // Constructor function
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Creates a new <code>GpmConfigLoader</code> instance.
   */
  constructor() {
    this.initObj();
  }

  //////////////////////////////////////////////////////////////////////////////
  // Private properties
  //////////////////////////////////////////////////////////////////////////////

  /**
   * The reference to the GPM file name.
   */
  private static readonly GPM_FILE_REF:string = "/gpm.json";

  /**
   * The <code>GpmConfigParser</code> instance used to parse the GPM
   * configuration file.
   */
  private _parser:GpmConfigParser = null;

  //////////////////////////////////////////////////////////////////////////////
  // Private methods
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Initializes this object.
   */
  private initObj():void {
    this._parser = new GpmConfigParser();
  }

  /**
   * Returns the reference to the GPM directory.
   * 
   * @param {WildcatRequest} request the <code>WildcatRequest</code> instance.
   * @return {string} the reference to the GPM directory.
   */
  private getGpmPath(request:WildcatRequest):string {
    let gpmPath:string = process.cwd() + PathUtils.GPMS_DIRECTORY + request.gpm;
    return gpmPath;
  }

  //////////////////////////////////////////////////////////////////////////////
  // Public methods
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Loads the GPM config file for the specified <code>WildcatRequest</code>
   * object.
   * 
   * @param {WildcatRequest} the wildcat request for which to load the config
   *                             file.
   * @param {Function} success the callback method called in case of file
   *                           loading success. This method takes the loaded
   *                           file reference as parameter.
   * @param {Function} error the callback method called in case of file
   *                           loading error. This method takes the error
   *                           reference as parameter.
   */
  public load(request:WildcatRequest, success:(data:GpmConfig)=>void,
                                      error:(err:JsonLoaderError)=>void):void {
    let loader:JsonLoader = new JsonLoader();
    let gpmPath:string = this.getGpmPath(request);
    loader.load(
      gpmPath + GpmConfigLoader.GPM_FILE_REF,
      (data:any)=>{
        this._parser.parse(data, success, error);
      },
      error
    );
  }
};
