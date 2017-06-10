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

import {Wildcat} from "../Wildcat";
import {GpmConfigLoader} from "../util/GpmConfigLoader";
import {WildcatRequest} from "../WildcatRequest";
import {GpmConfig} from "../context/GpmConfig";
import {Project} from "../context/Project";
import {TaskManager} from "../tasks/core/TaskManager";
import {CreateProjectDirectoryTask} from "../tasks/CreateProjectDirectoryTask";
import {DeployArchetypeTask} from "../tasks/DeployArchetypeTask";
import {DependenciesInstallTask} from "../tasks/DependenciesInstallTask";
import {VscSettingsTask} from "../tasks/VscSettingsTask";
import {WildcatLoggerProxy} from "../logging/WildcatLoggerProxy";

/**
 * The default implementation of the <code>Wildcat</code> interface.
 */
export class DefaultWildcatProcessor implements Wildcat {

  //////////////////////////////////////////////////////////////////////////////
  // Constructor function
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Creates a new <code>DefaultWildcatProcessor</code> instance.
   */
  constructor() {
    this.initObj();
  }

  //////////////////////////////////////////////////////////////////////////////
  // Private properties
  //////////////////////////////////////////////////////////////////////////////

  /**
   * The <code>GpmConfigLoader</code> isntance used to load the GPM
   * configuration file.
   */
  private _loader:GpmConfigLoader = null;

  /**
   * The <code>TaskManager</code> instance used to manage GPM tasks.
   */
  private _taskManager:TaskManager = null;

  /**
   * Returns the reference to the archetype directory.
   * 
   */
  private _archetypePath:string = null;

  //////////////////////////////////////////////////////////////////////////////
  // Private methods
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Initializes this object.
   */
  private initObj():void {
    WildcatLoggerProxy.getInstance();
    this._loader = new GpmConfigLoader();
  }

  /**
   * Displays the messages that shows request information.
   * 
   * @param {WildcatRequest} request the request for the current GPM.
   */
  private sendRequestMessage(request:WildcatRequest):void {
    let msg:string =
`request properties:
- gpm=${request.gpm}
- projectName=${request.projectName}
- directory=${request.directory}
- contextRoot=${request.contextRoot}`;
    this.sendMessage(msg);
  }

  /**
   * Displays the messages that shows config information.
   * 
   * @param {GpmConfig} config the loaded configuration for the current GPM.
   */
  private sendConfigMessage(config:GpmConfig):void {
    let project:Project = config.project;
    let msg:string =
`GPM config loaded:
- GPM version=${config.gpm.version}
project model:
- title=${project.title}
- description=${project.description}
- version=${project.version}
- author=${project.author}`;
    this.sendMessage(msg);
  }

  /**
   * Creates, initializes and run the tasks manager.
   * 
   * @param {WildcatRequest} request the request associated with this processor.
   * @param {GpmConfig} config the GPM configuration associated with this
   *                           processor.
   * @param {Function} callback the callback method called an the end of the
   *                            process. This function takes an object parameter
   *                            which represents an error message whether the
   *                            process failed.
   */
  private manageTasks(request:WildcatRequest, config:GpmConfig,
                                                callback:(err:any)=>void):void {
    let optionalTask:boolean = false;
    let properties:Map<string, any> = request.properties;
    this._taskManager = new TaskManager();
    this._taskManager.setContext(request, config);
    this._taskManager.addTask(new CreateProjectDirectoryTask());
    this.createDeployArchetypeTask();
    optionalTask = properties.get("vscSettings");
    if(optionalTask !== null || optionalTask !== undefined ||
       optionalTask !== false) {
      this._taskManager.addTask(new VscSettingsTask());
    }
    optionalTask = properties.get("disableDependencies");
    if(optionalTask === null || optionalTask === undefined ||
       optionalTask !== false) {
      this._taskManager.addTask(new DependenciesInstallTask());
    }
    this._taskManager.runTasks(callback);
  }

  /**
   * Initializes the task that is responsible for deploying archetype.
   */
  private createDeployArchetypeTask():void {
    let task:DeployArchetypeTask = new DeployArchetypeTask();
    task.setArchetypePath(this._archetypePath);
    this._taskManager.addTask(task);
  }

  /**
   * The wrapper function used to send decorated messages to the output stream.
   * 
   * @param {string} message the message to decorate and to send to the output
   *                         stream.
   */
  private sendMessage(message:string):void {
    WildcatLoggerProxy.getInstance().log(message);
  }

  //////////////////////////////////////////////////////////////////////////////
  // Public methods
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Returns the reference to the archetypes directory.
   * 
   * @return {string} the reference to the archetypes directory.
   */
  public getArchetypePath():string {
    return this._archetypePath;
  }

  /**
   * Sets the reference to the archetypes directory.
   * 
   * @param {string} archetypePath the reference to the archetypes directory.
   */
  public setArchetypePath(archetypePath):void {
    this._archetypePath = archetypePath;
    this._loader.setArchetypePath(archetypePath);
  }

  /**
   * @inheritDoc
   */
  public execute(request:WildcatRequest, callback:(err:any)=>void):void {
    this.sendMessage("request process start");
    this.sendRequestMessage(request);
    this.sendMessage("loading GPM config");
     this._loader.load(
      request,
      (config:GpmConfig)=> {
        this.sendConfigMessage(config);
        this.manageTasks(request, config, (err:any)=>{
          if(err) this.sendMessage("request error:" + err.toString());
          else this.sendMessage("request process complete");
          callback(err);
        });
      },
      (err:any)=> {
        this.sendMessage("request error:" + err.toString());
        callback(err);
      }
    );
  }
};
