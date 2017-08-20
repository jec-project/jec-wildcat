"use strict";
const AbstractTask_1 = require("./core/AbstractTask");
const child_process_1 = require("child_process");
const PathUtils_1 = require("../util/PathUtils");
const WildcatLoggerProxy_1 = require("../logging/WildcatLoggerProxy");
const UrlPatterns_1 = require("../../commons/util/UrlPatterns");
class TypeScriptBuildTask extends AbstractTask_1.AbstractTask {
    constructor() {
        super();
    }
    execute(success, error) {
        let gpm = this.__request.gpm;
        let commandPath = process.cwd() + PathUtils_1.PathUtils.WORKSPACE +
            this.__request.directory;
        let options = {
            encoding: "utf8",
            cwd: commandPath
        };
        child_process_1.exec("tsc", options, (err, stdout, stderr) => {
            if (stdout && stdout !== UrlPatterns_1.UrlPatterns.EMPTY_STRING) {
                WildcatLoggerProxy_1.WildcatLoggerProxy.getInstance().log(stdout);
            }
            if (stderr && stderr !== UrlPatterns_1.UrlPatterns.EMPTY_STRING) {
                WildcatLoggerProxy_1.WildcatLoggerProxy.getInstance().log(stderr);
            }
            if (err) {
                error("'" + gpm + "' project files compilation error: " + err);
            }
            else {
                success("'" + gpm + "' project files compiled");
            }
        });
    }
}
exports.TypeScriptBuildTask = TypeScriptBuildTask;
;
