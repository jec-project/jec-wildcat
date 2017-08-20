"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const GpmConfigParser_1 = require("../context/GpmConfigParser");
const jec_commons_1 = require("jec-commons");
const PathUtils_1 = require("./PathUtils");
class GpmConfigLoader {
    constructor() {
        this._parser = null;
        this._archetypePath = null;
        this.initObj();
    }
    initObj() {
        this._parser = new GpmConfigParser_1.GpmConfigParser();
    }
    resolveGpmPath(request) {
        let gpmPath = this._archetypePath ?
            this._archetypePath :
            process.cwd() + PathUtils_1.PathUtils.GPMS_DIRECTORY;
        if (gpmPath.lastIndexOf(jec_commons_1.UrlStringsEnum.SLASH) !== gpmPath.length - 1) {
            gpmPath += jec_commons_1.UrlStringsEnum.SLASH;
        }
        gpmPath += request.gpm;
        return gpmPath;
    }
    getArchetypePath() {
        return this._archetypePath;
    }
    setArchetypePath(archetypePath) {
        this._archetypePath = archetypePath;
    }
    load(request, success, error) {
        let loader = new jec_commons_1.JsonLoader();
        let gpmPath = this.resolveGpmPath(request);
        loader.load(gpmPath + GpmConfigLoader.GPM_FILE_REF, (data) => {
            this._parser.parse(data, success, error);
        }, error);
    }
}
GpmConfigLoader.GPM_FILE_REF = "/gpm.json";
exports.GpmConfigLoader = GpmConfigLoader;
;
