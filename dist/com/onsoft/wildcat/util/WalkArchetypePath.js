"use strict";
const fs = require("fs");
const UrlUtils_1 = require("../../glasscat/util/url/UrlUtils");
class WalkArchetypePath {
    constructor() {
        this.process = null;
    }
    internalWalk(path, pendingFiles, complete, error) {
        let currPath = null;
        let len = 0;
        let file = null;
        fs.stat(path, (err, stats) => {
            if (err) {
                error(err);
            }
            else {
                if (stats.isDirectory()) {
                    this.process(path);
                    fs.readdir(path, (err, files) => {
                        if (err)
                            error(err);
                        else {
                            len = files.length;
                            pendingFiles.num += len;
                            while (len--) {
                                file = files[len];
                                currPath = path + UrlUtils_1.UrlUtils.SLASH + file;
                                this.internalWalk(currPath, pendingFiles, complete, error);
                            }
                            if (!--pendingFiles.num)
                                complete();
                        }
                    });
                }
                else {
                    this.process(path);
                    if (!--pendingFiles.num)
                        complete();
                }
            }
        });
    }
    walk(path, complete, error) {
        let pendingFiles = {
            num: 1
        };
        this.internalWalk(path, pendingFiles, complete, error);
    }
}
exports.WalkArchetypePath = WalkArchetypePath;
;
