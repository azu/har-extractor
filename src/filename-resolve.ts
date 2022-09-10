import * as fs from "fs";
import * as path from "path";
import { Entry } from "har-format";

//@ts-ignore
import filenamify from "filenamify";
//@ts-ignore
import humanizeUrl from "humanize-url";
import { mimeMap, resolveFilePathForKnownMime } from "./mime-resolver.js";

const knownNewPaths: string[] = [];

const hasSameName = (file: string) => knownNewPaths.includes(file);

export const getAvailableFilename = (file: string) => {
    const extension = path.extname(file);
    const basename = path.basename(file, path.extname(file));

    let outputPath = file;

    let fId = 1;
    while (hasSameName(outputPath) || fs.existsSync(outputPath)) {
        outputPath = path.join(path.dirname(file), basename + fId + extension);
        fId = fId + 1;
    }

    knownNewPaths.push(outputPath);

    return outputPath;
};

export const getAvailableDirectory = (dir: string) => {
    let index = 1;
    console.log("CH", dir, fs.existsSync(dir));
    while (!dir || fs.existsSync(dir)) {
        dir = path.resolve(dir + (index === 1 ? "" : "-" + index));
        index++;
        console.log("CH2", dir, fs.existsSync(dir));
    }
    return dir;
};

export const convertEntryAsFilePathFormat = (
    buffer: Buffer,
    entry: Entry,
    removeQueryString: boolean = false,
    pretty: boolean = true
): { uniquePath: string; updatedBuffer: Buffer } => {
    const requestURL = entry.request.url;
    const stripSchemaURL: string = humanizeUrl(removeQueryString ? requestURL.split("?")[0] : requestURL);
    const dirnames: string[] = stripSchemaURL.split("/").map((pathname) => {
        return filenamify(pathname, { maxLength: 255 });
    });
    const targetFilename = dirnames[dirnames.length - 1];

    const mime = entry.response.content.mimeType;
    const mimeInfo = mimeMap[mime];
    if (mimeInfo === undefined) {
        return { uniquePath: dirnames.join("/"), updatedBuffer: buffer };
    } else {
        return resolveFilePathForKnownMime({ mimeInfo, targetFilename, buffer, dirnames, pretty });
    }
};
