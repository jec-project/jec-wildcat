"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const GpmConfigParser_1 = require("../context/GpmConfigParser");
const jec_commons_1 = require("jec-commons");
const PathUtils_1 = require("./PathUtils");
class GpmConfigLoader {
    constructor() {
        this._parser = null;
        this.initObj();
    }
    initObj() {
        this._parser = new GpmConfigParser_1.GpmConfigParser();
    }
    getGpmPath(request) {
        let gpmPath = process.cwd() + PathUtils_1.PathUtils.GPMS_DIRECTORY + request.gpm;
        return gpmPath;
    }
    load(request, success, error) {
        let loader = new jec_commons_1.JsonLoader();
        let gpmPath = this.getGpmPath(request);
        loader.load(gpmPath + GpmConfigLoader.GPM_FILE_REF, (data) => {
            this._parser.parse(data, success, error);
        }, error);
    }
}
GpmConfigLoader.GPM_FILE_REF = "/gpm.json";
exports.GpmConfigLoader = GpmConfigLoader;
;
