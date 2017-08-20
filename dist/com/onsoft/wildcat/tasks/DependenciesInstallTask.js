"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AbstractTask_1 = require("./core/AbstractTask");
const child_process_1 = require("child_process");
const PathUtils_1 = require("../util/PathUtils");
const WildcatLoggerProxy_1 = require("../logging/WildcatLoggerProxy");
const jec_commons_1 = require("jec-commons");
class DependenciesInstallTask extends AbstractTask_1.AbstractTask {
    constructor() {
        super();
    }
    execute(success, error) {
        let gpm = this.__request.gpm;
        let commandPath = process.cwd() + PathUtils_1.PathUtils.WORKSPACE +
            this.__request.directory +
            jec_commons_1.JecStringsEnum.WEB_APP;
        let options = {
            encoding: jec_commons_1.EncodingFormat.UTF8,
            cwd: commandPath
        };
        child_process_1.exec("npm install", options, (err, stdout, stderr) => {
            if (stdout && stdout !== jec_commons_1.UrlStringsEnum.EMPTY_STRING) {
                WildcatLoggerProxy_1.WildcatLoggerProxy.getInstance().log(stdout);
            }
            if (stderr && stderr !== jec_commons_1.UrlStringsEnum.EMPTY_STRING) {
                WildcatLoggerProxy_1.WildcatLoggerProxy.getInstance().log(stderr);
            }
            if (err) {
                error("'" + gpm + "' project dependencies installation error: " + err);
            }
            else {
                success("'" + gpm + "' project dependencies installed");
            }
        });
    }
}
exports.DependenciesInstallTask = DependenciesInstallTask;
;
