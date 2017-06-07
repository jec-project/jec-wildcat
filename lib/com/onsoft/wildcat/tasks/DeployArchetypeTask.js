"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AbstractTask_1 = require("./core/AbstractTask");
const PathUtils_1 = require("../util/PathUtils");
const PathType_1 = require("../util/PathType");
const ArchetypePathWalker_1 = require("../util/ArchetypePathWalker");
const ArchetypePropertiesProcessor_1 = require("../util/ArchetypePropertiesProcessor");
const fs = require("fs");
const jec_commons_1 = require("jec-commons");
class DeployArchetypeTask extends AbstractTask_1.AbstractTask {
    constructor() {
        super();
        this._walker = null;
        this._serverPath = null;
        this._extensionMap = null;
        this._propertiesProcessor = null;
        this.initObj();
    }
    initObj() {
        this._walker = new ArchetypePathWalker_1.ArchetypePathWalker();
        this._serverPath = process.cwd();
        this._extensionMap = new Map();
        this._propertiesProcessor = new ArchetypePropertiesProcessor_1.ArchetypePropertiesProcessor();
    }
    buildFiles(archetypePaths, success, error) {
        let gpm = this.__request.gpm;
        let len = archetypePaths.length - 1;
        let pending = len;
        let cursor = 1;
        let projectPath = this._serverPath + PathUtils_1.PathUtils.WORKSPACE +
            this.__request.directory;
        for (; cursor <= len; ++cursor) {
            let archPath = archetypePaths[cursor];
            let file = projectPath + archPath.targetPath +
                jec_commons_1.UrlStringsEnum.SLASH + archPath.file;
            if (archPath.type === PathType_1.PathType.DIRECTORY) {
                fs.mkdir(file, (err) => {
                    if (err) {
                        error("an error occured while creating archetype directory:\n" + err);
                    }
                    if (!--pending) {
                        success("'" + gpm + "' project archetype deployed at: " + projectPath);
                    }
                });
            }
            else {
                fs.readFile(archPath.originPath, (err, data) => {
                    if (err) {
                        error("an error occured while deploying '" + gpm +
                            "' project archetype:\n" + err);
                    }
                    else {
                        let stream = fs.createWriteStream(file);
                        let writableData = this._extensionMap.get(archPath.extension) ?
                            this._propertiesProcessor.mapProperties(data.toString()) :
                            data;
                        fs.writeFile(file, writableData, (err) => {
                            if (err) {
                                error("an error occured while creating archetype file:\n" + err);
                            }
                            if (!--pending) {
                                success("'" + gpm + "' project archetype deployed at: "
                                    + projectPath);
                            }
                        });
                    }
                });
            }
        }
    }
    setContext(request, config) {
        super.setContext(request, config);
        this._propertiesProcessor.setContext(request, config);
        let processedFiles = config.processedFiles;
        let len = -1;
        if (processedFiles) {
            len = processedFiles.length;
            while (len--) {
                this._extensionMap.set(processedFiles[len], true);
            }
        }
    }
    execute(success, error) {
        let gpm = this.__request.gpm;
        let archetypePath = this._serverPath + PathUtils_1.PathUtils.GPMS_DIRECTORY +
            gpm + PathUtils_1.PathUtils.ARCHETYPE_DIRECTORY;
        let archetypeFiles = new Array();
        this._walker.process = (file) => {
            archetypeFiles.push(file);
        };
        this._walker.walk(archetypePath, () => {
            this.buildFiles(archetypeFiles, success, error);
        }, (err) => {
            error("'" + gpm + "' project archetype error: " + err.toString());
        });
    }
}
exports.DeployArchetypeTask = DeployArchetypeTask;
;
