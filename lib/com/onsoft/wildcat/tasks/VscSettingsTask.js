"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AbstractTask_1 = require("./core/AbstractTask");
const PathUtils_1 = require("../util/PathUtils");
const fs = require("fs");
const jec_commons_1 = require("jec-commons");
class VscSettingsTask extends AbstractTask_1.AbstractTask {
    constructor() {
        super();
    }
    getSettingsTemplate() {
        let template = `// Place your settings in this file to overwrite default and user settings.
{
    "editor.rulers": [80],
    "editor.tabSize": 2,
    "files.exclude": {
        "**/*.js": true
    },
    "files.associations": {
        "*.ejs": "html"
    }
}`;
        return template;
    }
    getTasksTemplate() {
        let template = `{
    // See https://go.microsoft.com/fwlink/?LinkId=733558
    // for the documentation about the tasks.json format
    "version": "0.1.0",
    "tasks": [
        {
            "taskName": "build",
            "command": "tsc",
            "args": ["-p", "./"],
            "isShellCommand": true,
            "isBackground": true,
            "problemMatcher": "$tsc-watch",
            "showOutput": "always",
            "isBuildCommand": true
        }
    ]
}`;
        return template;
    }
    buildErrorMessage(error) {
        return "an error occured while creating VSC settings:\n" + error;
    }
    execute(success, error) {
        let folderPath = process.cwd() + PathUtils_1.PathUtils.WORKSPACE +
            this.__request.directory + jec_commons_1.UrlStringsEnum.SLASH +
            VscSettingsTask.RESOURCE_NAMES[0];
        fs.mkdir(folderPath, (err) => {
            if (err) {
                error(this.buildErrorMessage(err));
            }
            else {
                folderPath += jec_commons_1.UrlStringsEnum.SLASH;
                fs.writeFile(folderPath + VscSettingsTask.RESOURCE_NAMES[1], this.getSettingsTemplate(), (err) => {
                    if (err)
                        error(this.buildErrorMessage(err));
                    else {
                        fs.writeFile(folderPath + VscSettingsTask.RESOURCE_NAMES[2], this.getTasksTemplate(), (err) => {
                            if (err)
                                error(this.buildErrorMessage(err));
                            else
                                success("VSC settings created: " + folderPath);
                        });
                    }
                });
            }
        });
    }
}
VscSettingsTask.RESOURCE_NAMES = [".vscode", "settings.json", "tasks.json"];
exports.VscSettingsTask = VscSettingsTask;
;
