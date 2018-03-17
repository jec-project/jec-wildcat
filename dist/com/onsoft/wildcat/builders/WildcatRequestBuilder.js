"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DefaultWildcatRequest_1 = require("../core/DefaultWildcatRequest");
const WildcatPropertiesBuilder_1 = require("./WildcatPropertiesBuilder");
class WildcatRequestBuilder {
    constructor() {
        this._gpm = null;
        this._directory = null;
        this._contextRoot = null;
        this._projectName = null;
        this._properties = null;
    }
    projectName(projectName) {
        this._projectName = projectName;
        return this;
    }
    gpm(gpm) {
        this._gpm = gpm;
        return this;
    }
    directory(directory) {
        this._directory = directory;
        return this;
    }
    contextRoot(contextRoot) {
        this._contextRoot = contextRoot;
        return this;
    }
    properties(props) {
        const builder = new WildcatPropertiesBuilder_1.WildcatPropertiesBuilder();
        this._properties = builder.build(props);
        return this;
    }
    build() {
        const request = new DefaultWildcatRequest_1.DefaultWildcatRequest();
        request.gpm = this._gpm;
        request.directory = this._directory;
        request.contextRoot = this._contextRoot;
        request.projectName = this._projectName;
        request.properties = this._properties;
        return request;
    }
}
exports.WildcatRequestBuilder = WildcatRequestBuilder;
;
