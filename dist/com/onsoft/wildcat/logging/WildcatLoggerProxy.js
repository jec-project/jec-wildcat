"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jec_commons_1 = require("jec-commons");
class WildcatLoggerProxy extends jec_commons_1.AbstractLoggerProxy {
    constructor() {
        super("[WILDCAT]");
        if (WildcatLoggerProxy._locked || WildcatLoggerProxy.INSTANCE) {
            this.throwSingletonError("WildcatLoggerProxy");
        }
        WildcatLoggerProxy._locked = true;
    }
    static getInstance() {
        if (WildcatLoggerProxy.INSTANCE === null) {
            WildcatLoggerProxy._locked = false;
            WildcatLoggerProxy.INSTANCE = new WildcatLoggerProxy();
        }
        return WildcatLoggerProxy.INSTANCE;
    }
}
WildcatLoggerProxy.INSTANCE = null;
WildcatLoggerProxy._locked = true;
exports.WildcatLoggerProxy = WildcatLoggerProxy;
;
