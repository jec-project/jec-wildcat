"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const GpmConfigError_1 = require("../exceptions/GpmConfigError");
const type = require("type-detect");
class DefaultGpmValidator {
    constructor() { }
    validate(gpmConfig, callback) {
        let error = null;
        if (type(gpmConfig) !== "Object") {
            error = new GpmConfigError_1.GpmConfigError("GPM configuration must be a valid POJO");
            callback(error);
        }
        else {
            callback(null);
        }
    }
}
exports.DefaultGpmValidator = DefaultGpmValidator;
;
