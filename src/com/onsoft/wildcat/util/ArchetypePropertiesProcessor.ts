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

import {WildcatRequest} from "../WildcatRequest";
import {GpmConfig} from "../context/GpmConfig";

/**
 * A helper class that lists all properties in a GPM archetype and replaces
 * properties references by their value in archetype files.
 */
export class ArchetypePropertiesProcessor {

  //////////////////////////////////////////////////////////////////////////////
  // Constructor function
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Creates a new <code>ArchetypePropertiesProcessor</code> instance.
   */
  constructor() {}

  //////////////////////////////////////////////////////////////////////////////
  // Private properties
  //////////////////////////////////////////////////////////////////////////////

  /**
   * The list of properties for the context objects assocaited with this
   * <code>ArchetypePropertiesProcessor</code> instance.
   */
  private _propsMap:Map<string, any> = null;

  /**
   * The reference to the pattern used to find custom properties in a GPM file.
   */
  private static readonly PROP_PATTERN:RegExp = /<%\s*.*?%>/ig;

  //////////////////////////////////////////////////////////////////////////////
  // Public methods
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Sets the execution context for this
   * <code>ArchetypePropertiesProcessor</code> instance.
   * 
   * @param {WildcatRequest} request the request associated with processor.
   * @param {GpmConfig} config the GPM configuration associated with this 
   *                           processor.
   */
  public setContext(request:WildcatRequest, config:GpmConfig):void {
    this._propsMap = request.properties;
  }

  /**
   * Cheks the properties defined in the specified file and replace them by
   * their values specified by the current context.
   * 
   * @param {string} file the file to process.
   */
  public mapProperties(file:string):string {
    let result:string = file;
    let found:Array<any> = null;
    let rawProp:string = null;
    let prop:string = null;
    let propLen:number = -1;
    let propVal:any = null;
    while(
      (found = ArchetypePropertiesProcessor.PROP_PATTERN.exec(result)) !== null
    ) {
      rawProp = found[0];
      propLen = rawProp.length;
      prop = rawProp.substring(2, propLen - 2).trim();
      if(this._propsMap.has(prop)) {
        propVal = this._propsMap.get(prop);
        result = result.replace(rawProp, propVal);
        //console.log(result)
        //console.log(prop, propVal);
      }
    }
    return result;
  }
};