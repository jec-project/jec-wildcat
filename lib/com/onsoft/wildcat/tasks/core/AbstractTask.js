"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AbstractTask {
    constructor() {
        this.__request = null;
        this.__config = null;
    }
    setContext(request, config) {
        this.__request = request;
        this.__config = config;
    }
    execute(success, error) { }
}
exports.AbstractTask = AbstractTask;
;
