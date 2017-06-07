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

import {WildcatRequest} from "../WildcatRequest";
import {DefaultWildcatRequest} from "../core/DefaultWildcatRequest";
import {WildcatPropertiesBuilder} from "./WildcatPropertiesBuilder";

/**
 * A helper class that creates new <code>WildcatRequest</code> instances.
 */
export class WildcatRequestBuilder {

  //////////////////////////////////////////////////////////////////////////////
  // Constructor function
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Creates a new <code>WildcatRequestBuilder</code> instance.
   */
  constructor() {}

  //////////////////////////////////////////////////////////////////////////////
  // Private properties
  //////////////////////////////////////////////////////////////////////////////

  /**
   * The <code>gpm</code> property of the new <code>WildcatRequest</code>
   * instance.
   */
  private _gpm:string = null;

  /**
   * The <code>directory</code> property of the new <code>WildcatRequest</code>
   * instance.
   */
  private _directory:string = null;

  /**
   * The <code>contextRoot</code> property of the new <code>WildcatRequest</code>
   * instance.
   */
  private _contextRoot:string = null;

  /**
   * The <code>projectName<code> property of the new <code>WildcatRequest</code>
   * instance.
   */
  private _projectName:string = null;
  
  /**
   * A map that contains the properties associated with the new
   * <code>WildcatRequest</code> instance.
   */
  private _properties:Map<string, any> = null;
  
  //////////////////////////////////////////////////////////////////////////////
  // Public methods
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Sets the <code>projectName</code> property of the new
   * <code>WildcatRequest</code> instance.
   */
  public projectName(projectName:string):WildcatRequestBuilder {
    this._projectName = projectName;
    return this;
  }

  /**
   * Sets the <code>gpm</code> property of the new <code>WildcatRequest</code>
   * instance.
   */
  public gpm(gpm:string):WildcatRequestBuilder {
    this._gpm = gpm;
    return this;
  }

  /**
   * Sets the <code>directory</code> property of the new 
   * <code>WildcatRequest</code> instance.
   */
  public directory(directory:string):WildcatRequestBuilder {
    this._directory = directory;
    return this;
  }

  /**
   * Sets the <code>contextRoot</code> property of the new 
   * <code>WildcatRequest</code> instance.
   */
  public contextRoot(contextRoot:string):WildcatRequestBuilder {
    this._contextRoot = contextRoot;
    return this;
  }

  /**
   * Sets the <code>properties</code> property of the new 
   * <code>WildcatRequest</code> instance.
   */
  public properties(props:any):WildcatRequestBuilder {
    let builder:WildcatPropertiesBuilder = new WildcatPropertiesBuilder();
    this._properties = builder.build(props);
    return this;
  }

  /**
   * Creates and returns new <code>WildcatRequest</code> instance.
   * 
   * @return {WildcatRequest} a new <code>WildcatRequest</code> instance.
   */
  public build():WildcatRequest {
    let request:WildcatRequest = new DefaultWildcatRequest();
    request.gpm = this._gpm;
    request.directory = this._directory;
    request.contextRoot = this._contextRoot;
    request.projectName = this._projectName;
    request.properties = this._properties;
    return request;
  }
};
