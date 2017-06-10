"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const GpmConfigError_1 = require("../exceptions/GpmConfigError");
const type = require("type-detect");
class DefaultGpmValidator {
    constructor() { }
    validateGpm(gpm) {
        let error = null;
        if (!gpm) {
            error = new GpmConfigError_1.GpmConfigError("GPM configuration must have a 'gpm' property");
        }
        else if (!gpm || type(gpm) !== "Object") {
            error = new GpmConfigError_1.GpmConfigError("'gpm' property must be a valid POJO");
        }
        return error;
    }
    validateProject(project) {
        let error = null;
        if (!project) {
            error = new GpmConfigError_1.GpmConfigError("GPM configuration must have a 'project' property");
        }
        else if (!project || type(project) !== "Object") {
            error = new GpmConfigError_1.GpmConfigError("'project' property must be a valid POJO");
        }
        return error;
    }
    validate(gpmConfig, callback) {
        let error = null;
        if (type(gpmConfig) !== "Object") {
            error = new GpmConfigError_1.GpmConfigError("GPM configuration must be a valid POJO");
            callback(error);
        }
        else {
            error = this.validateGpm(gpmConfig.gpm);
            if (error)
                callback(error);
            else {
                error = this.validateProject(gpmConfig.project);
                callback(error);
            }
        }
    }
}
exports.DefaultGpmValidator = DefaultGpmValidator;
;
