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
 * A helper class that creates properties references associated with a Wildcat
 * request.
 */
export class WildcatPropertiesBuilder {

  //////////////////////////////////////////////////////////////////////////////
  // Constructor function
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Creates a new <code>WildcatPropertiesBuilder</code> instance.
   */
  constructor() {}

  //////////////////////////////////////////////////////////////////////////////
  // Private properties
  //////////////////////////////////////////////////////////////////////////////

  /**
   * The reference to the <code>gpm</code> property.
   */
  private static readonly GPM:string = "gpm";

  /**
   * The reference to the low dash character.
   */
  private static readonly LOW_DASH:string = "_";

  //////////////////////////////////////////////////////////////////////////////
  // Public methods
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Builds and returns the properties associated with a
   * <code>WildcatRequest</code> instance.
   * 
   * @param {Object} config the set of properties defined in the request
   *                        configuration.
   * @returns {Map<string, any>} a map that contains all properties for a
   *                             Wildcat request.
   */
  public build(config:any):Map<string, any> {
    const propsMap = new Map<string, any>();
    let prop:string = null;
    for(prop in config) {
      if( prop !== WildcatPropertiesBuilder.GPM &&
          prop !== WildcatPropertiesBuilder.LOW_DASH) {
        propsMap.set(prop, config[prop]);
      }
    }
    return propsMap;
  }
};
