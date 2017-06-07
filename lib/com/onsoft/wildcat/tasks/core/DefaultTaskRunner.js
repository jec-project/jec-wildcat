"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class DefaultTaskRunner {
    constructor() {
        this._request = null;
        this._config = null;
    }
    setContext(request, config) {
        this._request = request;
        this._config = config;
    }
    run(task, success, error) {
        task.setContext(this._request, this._config);
        task.execute(success, error);
    }
}
exports.DefaultTaskRunner = DefaultTaskRunner;
;
