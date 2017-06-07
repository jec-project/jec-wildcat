"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ArchetypePropertiesProcessor {
    constructor() {
        this._propsMap = null;
    }
    setContext(request, config) {
        this._propsMap = request.properties;
    }
    mapProperties(file) {
        let result = file;
        let found = null;
        let rawProp = null;
        let prop = null;
        let propLen = -1;
        let propVal = null;
        while ((found = ArchetypePropertiesProcessor.PROP_PATTERN.exec(result)) !== null) {
            rawProp = found[0];
            propLen = rawProp.length;
            prop = rawProp.substring(2, propLen - 2).trim();
            if (this._propsMap.has(prop)) {
                propVal = this._propsMap.get(prop);
                result = result.replace(rawProp, propVal);
            }
        }
        return result;
    }
}
ArchetypePropertiesProcessor.PROP_PATTERN = /<%\s*.*?%>/ig;
exports.ArchetypePropertiesProcessor = ArchetypePropertiesProcessor;
;
