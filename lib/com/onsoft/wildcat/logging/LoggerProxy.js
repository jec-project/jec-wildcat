"use strict";
class LoggerProxy {
    constructor() {
        this._logger = null;
        if (LoggerProxy.INSTANCE) {
            throw new Error();
        }
    }
    static getInstance() {
        if (LoggerProxy.INSTANCE === null) {
            LoggerProxy.INSTANCE = new LoggerProxy();
        }
        return LoggerProxy.INSTANCE;
    }
    setLogger(logger) {
        this._logger = logger;
    }
    log(message) {
        this._logger.info(LoggerProxy.WILDCAT + message);
    }
}
LoggerProxy.INSTANCE = null;
LoggerProxy.WILDCAT = "[WILDCAT] ";
exports.LoggerProxy = LoggerProxy;
;
