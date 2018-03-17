"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DefaultTaskRunner_1 = require("./DefaultTaskRunner");
const WildcatLoggerProxy_1 = require("../../logging/WildcatLoggerProxy");
class TaskManager {
    constructor() {
        this._taskRunner = null;
        this._taskCollection = null;
        this.initObj();
    }
    initObj() {
        this._taskRunner = new DefaultTaskRunner_1.DefaultTaskRunner();
        this._taskCollection = new Array();
    }
    sendMessage(message) {
        WildcatLoggerProxy_1.WildcatLoggerProxy.getInstance().log(message);
    }
    setContext(request, config) {
        this._taskRunner.setContext(request, config);
        this.sendMessage("task manager initialized");
    }
    addTask(task) {
        this._taskCollection.push(task);
        this.sendMessage("new task added to task manager:" + task.constructor.name);
    }
    runTasks(callback) {
        const len = this._taskCollection.length;
        let i = 0;
        let task = null;
        let isRunning = true;
        const runTask = () => {
            task = this._taskCollection[i];
            this.sendMessage("running task: " + task.constructor.name);
            this._taskRunner.run(task, (message) => {
                this.sendMessage("task success: " + message);
                if (++i < len && isRunning)
                    runTask();
                else {
                    this.sendMessage("task manager: running tasks complete");
                    isRunning = false;
                    callback(null);
                }
            }, (err) => {
                if (isRunning) {
                    callback(err);
                    isRunning = false;
                }
            });
        };
        if (len > 0) {
            this.sendMessage("task manager: running tasks start");
            runTask();
        }
        else {
            isRunning = false;
            this.sendMessage("task manager: no tasks to run");
            callback(null);
        }
    }
}
exports.TaskManager = TaskManager;
;
