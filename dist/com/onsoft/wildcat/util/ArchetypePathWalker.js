"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const jec_commons_1 = require("jec-commons");
const jec_commons_node_1 = require("jec-commons-node");
const ArchetypePath_1 = require("./ArchetypePath");
const PathType_1 = require("./PathType");
const ArchetypePathOperation_1 = require("./ArchetypePathOperation");
class ArchetypePathWalker {
    constructor() {
        this.process = null;
    }
    internalWalk(path, operation, complete, error) {
        let currPath = null;
        let len = operation.originPath.length;
        let file = null;
        let archetypePath = null;
        fs.stat(path, (err, stats) => {
            if (err) {
                error(err);
            }
            else {
                archetypePath = this.buildArchetypePath(path, stats, len);
                if (stats.isDirectory()) {
                    this.process(archetypePath);
                    fs.readdir(path, (err, files) => {
                        if (err)
                            error(err);
                        else {
                            len = files.length;
                            operation.pending += len;
                            while (len--) {
                                file = files[len];
                                currPath = path + jec_commons_1.UrlStringsEnum.SLASH + file;
                                this.internalWalk(currPath, operation, complete, error);
                            }
                            if (!--operation.pending)
                                complete();
                        }
                    });
                }
                else {
                    this.process(archetypePath);
                    if (!--operation.pending)
                        complete();
                }
            }
        });
    }
    buildArchetypePath(path, stats, sourcePathLength) {
        const archPath = new ArchetypePath_1.ArchetypePath();
        const targetPath = path.substring(sourcePathLength);
        let charIndex = path.lastIndexOf(jec_commons_1.UrlStringsEnum.SLASH) + 1;
        archPath.file = path.substring(charIndex);
        archPath.originPath = path;
        charIndex = targetPath.lastIndexOf(jec_commons_1.UrlStringsEnum.SLASH);
        archPath.targetPath = targetPath.substring(0, charIndex);
        if (stats.isDirectory()) {
            archPath.type = PathType_1.PathType.DIRECTORY;
        }
        else {
            archPath.type = PathType_1.PathType.FILE;
            charIndex = path.lastIndexOf(jec_commons_1.UrlStringsEnum.DOT) + 1;
            archPath.extension = path.substring(charIndex);
        }
        archPath.stats = new jec_commons_node_1.FileStatsProxy(stats);
        return archPath;
    }
    walk(path, complete, error) {
        const operation = new ArchetypePathOperation_1.ArchetypePathOperation();
        operation.pending = 1;
        operation.originPath = path;
        this.internalWalk(path, operation, complete, error);
    }
}
exports.ArchetypePathWalker = ArchetypePathWalker;
;
