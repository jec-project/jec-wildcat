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

import {DefaultTaskRunner} from "./DefaultTaskRunner";
import {TaskRunner} from "./TaskRunner";
import {Task} from "./Task";
import {WildcatRequest} from "../../WildcatRequest";
import {GpmConfig} from "../../context/GpmConfig";
import {WildcatLoggerProxy} from "../../logging/WildcatLoggerProxy";

/**
 * The __TaskManager__ class is responsible for managing tasks in a Wildcat
 * processor.
 *
 * @class TaskManager
 */
export class TaskManager {

  //////////////////////////////////////////////////////////////////////////////
  // Constructor function
  //////////////////////////////////////////////////////////////////////////////

  constructor() {
    this.initObj();
  }

  //////////////////////////////////////////////////////////////////////////////
  // Private properties
  //////////////////////////////////////////////////////////////////////////////

  /**
   * The task runner associated with this task manager.
   * 
   * @attribute _taskRunner
   * @private
   * @type TaskRunner
   * @default null
   */
  private _taskRunner:TaskRunner = null;

  /**
   * The list of tasks managed by this task manager.
   * 
   * @attribute _taskCollection
   * @private
   * @type Array<Task>
   * @default null
   */
  private _taskCollection:Array<Task> = null;

  //////////////////////////////////////////////////////////////////////////////
  // Private methods
  //////////////////////////////////////////////////////////////////////////////

  private initObj():void {
    this._taskRunner = new DefaultTaskRunner();
    this._taskCollection = new Array<Task>();
  }

  /**
   * The wrapper function used to send decorated messages to the output stream.
   * 
   * @method manageTasks
   * @private
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
   * Sets the execution context for this task manager.
   * 
   * @method setContext
   * @param {WildcatRequest} request the request associated with this task
   *                                 manager.
   * @param {GpmConfig} config the GPM configuration associated with this task
   *                           manager.
   */
  public setContext(request:WildcatRequest, config:GpmConfig):void {
    this._taskRunner.setContext(request, config);
    this.sendMessage("task manager initialized");
  }

  /**
   * Adds a new task to this task manager.
   * 
   * @method addTask
   * @param {Task} task the task to add to this task manager.
   */
  public addTask(task:Task):void {
    this._taskCollection.push(task);
    this.sendMessage("new task added to task manager:" + task.constructor.name);
  }
  
  /**
   * Executes all the tasks registered whitin this task manager.
   * 
   * @method runTasks
   * @param {Function} callback the callback method called an the end of the
   *                            process. This function takes an object parameter
   *                            which represents an error message whether the
   *                            process failed.
   */
  public runTasks(callback:(err:any)=>void):void {
    let len:number = this._taskCollection.length;
    let i:number = 0;
    let task:Task = null;
    let isRunning:boolean = true;
    let runTask:Function = ()=> {
      task = this._taskCollection[i];
      this.sendMessage("running task: " + task.constructor.name);
      this._taskRunner.run(
        task,
        (message:string)=>{
          this.sendMessage("task success: " + message);
          if(++i < len && isRunning) runTask();
          else {
            this.sendMessage("task manager: running tasks complete");
            isRunning = false;
            callback(null);
          }
        },
        (err:any)=>{
          if(isRunning) {
            callback(err);
            isRunning = false;
          }
        }
      );
    }
    if(len > 0) {
      this.sendMessage("task manager: running tasks start");
      runTask();
    } else {
      isRunning = false;
      this.sendMessage("task manager: no tasks to run");
      callback(null);
    }
  }
};
