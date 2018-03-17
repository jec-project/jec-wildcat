"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DefaultGpmValidator_1 = require("../validators/DefaultGpmValidator");
const GpmConfig_1 = require("../context/GpmConfig");
const Gpm_1 = require("../context/Gpm");
const Project_1 = require("../context/Project");
class GpmConfigParser {
    constructor() {
        this._validator = null;
        this.initObj();
    }
    initObj() {
        this._validator = new DefaultGpmValidator_1.DefaultGpmValidator();
    }
    parseGpm(gpmConfig, config) {
        const gpm = new Gpm_1.Gpm();
        gpm.version = config.gpm.version;
        gpmConfig.gpm = gpm;
    }
    parseProject(gpmConfig, config) {
        const project = new Project_1.Project();
        const projectCfg = config.project;
        project.name = projectCfg.name;
        project.version = projectCfg.version;
        project.title = projectCfg.title;
        project.description = projectCfg.description;
        project.author = projectCfg.author;
        gpmConfig.project = project;
    }
    parseProcessedFiles(gpmConfig, config) {
        gpmConfig.processedFiles = config.processedFiles;
    }
    parse(config, success, error) {
        let gpmConfig = null;
        this._validator.validate(config, (err) => {
            if (err)
                error(err);
            else {
                gpmConfig = new GpmConfig_1.GpmConfig();
                this.parseGpm(gpmConfig, config);
                this.parseProject(gpmConfig, config);
                this.parseProcessedFiles(gpmConfig, config);
                success(gpmConfig);
            }
        });
    }
}
exports.GpmConfigParser = GpmConfigParser;
;
