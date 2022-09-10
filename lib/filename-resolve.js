import * as fs from "fs";
import * as path from "path";
//@ts-ignore
import filenamify from "filenamify";
//@ts-ignore
import humanizeUrl from "humanize-url";
import { mimeMap, resolveFilePathForKnownMime } from "./mime-resolver.js";
var knownNewPaths = [];
var hasSameName = function (file) { return knownNewPaths.includes(file); };
export var getAvailableFilename = function (file) {
    var extension = path.extname(file);
    var basename = path.basename(file, path.extname(file));
    var outputPath = file;
    var fId = 1;
    while (hasSameName(outputPath) || fs.existsSync(outputPath)) {
        outputPath = path.join(path.dirname(file), basename + fId + extension);
        fId = fId + 1;
    }
    knownNewPaths.push(outputPath);
    return outputPath;
};
export var getAvailableDirectory = function (dir) {
    var index = 1;
    console.log("CH", dir, fs.existsSync(dir));
    while (!dir || fs.existsSync(dir)) {
        dir = path.resolve(dir + (index === 1 ? "" : "-" + index));
        index++;
        console.log("CH2", dir, fs.existsSync(dir));
    }
    return dir;
};
export var convertEntryAsFilePathFormat = function (buffer, entry, removeQueryString, pretty) {
    if (removeQueryString === void 0) { removeQueryString = false; }
    if (pretty === void 0) { pretty = true; }
    var requestURL = entry.request.url;
    var stripSchemaURL = humanizeUrl(removeQueryString ? requestURL.split("?")[0] : requestURL);
    var dirnames = stripSchemaURL.split("/").map(function (pathname) {
        return filenamify(pathname, { maxLength: 255 });
    });
    var targetFilename = dirnames[dirnames.length - 1];
    var mime = entry.response.content.mimeType;
    var mimeInfo = mimeMap[mime];
    if (mimeInfo === undefined) {
        return { uniquePath: dirnames.join("/"), updatedBuffer: buffer };
    }
    else {
        return resolveFilePathForKnownMime({ mimeInfo: mimeInfo, targetFilename: targetFilename, buffer: buffer, dirnames: dirnames, pretty: pretty });
    }
};
//# sourceMappingURL=filename-resolve.js.map