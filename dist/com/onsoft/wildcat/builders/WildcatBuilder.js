"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DefaultWildcatProcessor_1 = require("../core/DefaultWildcatProcessor");
class WildcatBuilder {
    constructor() { }
    build() {
        const wildcat = new DefaultWildcatProcessor_1.DefaultWildcatProcessor();
        return wildcat;
    }
}
exports.WildcatBuilder = WildcatBuilder;
;
