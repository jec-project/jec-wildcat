"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AbstractTask_1 = require("./core/AbstractTask");
const PathUtils_1 = require("../util/PathUtils");
const fs = require("fs");
class CreateProjectDirectoryTask extends AbstractTask_1.AbstractTask {
    constructor() {
        super();
    }
    execute(success, error) {
        const projectPath = process.cwd() + PathUtils_1.PathUtils.WORKSPACE +
            this.__request.directory;
        fs.mkdir(projectPath, (err) => {
            if (err)
                error("an error occured while creating project directory:\n" + err);
            else
                success("project directory created: " + projectPath);
        });
    }
}
exports.CreateProjectDirectoryTask = CreateProjectDirectoryTask;
;
