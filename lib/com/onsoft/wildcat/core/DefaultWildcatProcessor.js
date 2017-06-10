"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const GpmConfigLoader_1 = require("../util/GpmConfigLoader");
const TaskManager_1 = require("../tasks/core/TaskManager");
const CreateProjectDirectoryTask_1 = require("../tasks/CreateProjectDirectoryTask");
const DeployArchetypeTask_1 = require("../tasks/DeployArchetypeTask");
const DependenciesInstallTask_1 = require("../tasks/DependenciesInstallTask");
const VscSettingsTask_1 = require("../tasks/VscSettingsTask");
const WildcatLoggerProxy_1 = require("../logging/WildcatLoggerProxy");
class DefaultWildcatProcessor {
    constructor() {
        this._loader = null;
        this._taskManager = null;
        this._archetypePath = null;
        this.initObj();
    }
    initObj() {
        WildcatLoggerProxy_1.WildcatLoggerProxy.getInstance();
        this._loader = new GpmConfigLoader_1.GpmConfigLoader();
    }
    sendRequestMessage(request) {
        let msg = `request properties:
- gpm=${request.gpm}
- projectName=${request.projectName}
- directory=${request.directory}
- contextRoot=${request.contextRoot}`;
        this.sendMessage(msg);
    }
    sendConfigMessage(config) {
        let project = config.project;
        let msg = `GPM config loaded:
- GPM version=${config.gpm.version}
project model:
- title=${project.title}
- description=${project.description}
- version=${project.version}
- author=${project.author}`;
        this.sendMessage(msg);
    }
    manageTasks(request, config, callback) {
        let optionalTask = false;
        let properties = request.properties;
        this._taskManager = new TaskManager_1.TaskManager();
        this._taskManager.setContext(request, config);
        this._taskManager.addTask(new CreateProjectDirectoryTask_1.CreateProjectDirectoryTask());
        this.createDeployArchetypeTask();
        optionalTask = properties.get("vscSettings");
        if (optionalTask !== null || optionalTask !== undefined ||
            optionalTask !== false) {
            this._taskManager.addTask(new VscSettingsTask_1.VscSettingsTask());
        }
        optionalTask = properties.get("disableDependencies");
        if (optionalTask === null || optionalTask === undefined ||
            optionalTask !== false) {
            this._taskManager.addTask(new DependenciesInstallTask_1.DependenciesInstallTask());
        }
        this._taskManager.runTasks(callback);
    }
    createDeployArchetypeTask() {
        let task = new DeployArchetypeTask_1.DeployArchetypeTask();
        task.setArchetypePath(this._archetypePath);
        this._taskManager.addTask(task);
    }
    sendMessage(message) {
        WildcatLoggerProxy_1.WildcatLoggerProxy.getInstance().log(message);
    }
    getArchetypePath() {
        return this._archetypePath;
    }
    setArchetypePath(archetypePath) {
        this._archetypePath = archetypePath;
        this._loader.setArchetypePath(archetypePath);
    }
    execute(request, callback) {
        this.sendMessage("request process start");
        this.sendRequestMessage(request);
        this.sendMessage("loading GPM config");
        this._loader.load(request, (config) => {
            this.sendConfigMessage(config);
            this.manageTasks(request, config, (err) => {
                if (err)
                    this.sendMessage("request error:" + err.toString());
                else
                    this.sendMessage("request process complete");
                callback(err);
            });
        }, (err) => {
            this.sendMessage("request error:" + err.toString());
            callback(err);
        });
    }
}
exports.DefaultWildcatProcessor = DefaultWildcatProcessor;
;
