"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class WildcatPropertiesBuilder {
    constructor() { }
    build(config) {
        const propsMap = new Map();
        let prop = null;
        for (prop in config) {
            if (prop !== WildcatPropertiesBuilder.GPM &&
                prop !== WildcatPropertiesBuilder.LOW_DASH) {
                propsMap.set(prop, config[prop]);
            }
        }
        return propsMap;
    }
}
WildcatPropertiesBuilder.GPM = "gpm";
WildcatPropertiesBuilder.LOW_DASH = "_";
exports.WildcatPropertiesBuilder = WildcatPropertiesBuilder;
;
