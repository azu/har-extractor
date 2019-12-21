import * as fs from "fs";
import { Har, Entry } from "har-format";
import * as path from "path";

const filenamify = require("filenamify");
const humanizeUrl = require("humanize-url");
const makeDir = require("make-dir");
export const getEntryContentAsBuffer = (entry: Entry): Buffer | undefined => {
    const content = entry.response.content;
    const text = content.text;
    if (text === undefined) {
        return;
    }
    if (content.encoding === "base64") {
        return Buffer.from(text, "base64");
    } else {
        return Buffer.from(text);
    }
};

export const convertEntryAsFilePathFormat = (entry: Entry): string => {
    const requestURL = entry.request.url;
    const stripSchemaURL: string = humanizeUrl(requestURL);
    const dirnames: string[] = stripSchemaURL.split("/").map(pathname => {
        return filenamify(pathname);
    });
    const fileName = dirnames[dirnames.length - 1];
    if (!fileName.includes(".html") && entry.response.content.mimeType.includes("text/html")) {
        return dirnames.join("/") + "/index.html";
    }
    return dirnames.join("/");
};

export interface ExtractOptions {
    outputDir: string;
    verbose?: boolean;
    dryRun?: boolean;
}

export const extract = (harContent: Har, options: ExtractOptions) => {
    harContent.log.entries.forEach(entry => {
        const buffer = getEntryContentAsBuffer(entry);
        if (!buffer) {
            return;
        }
        const outputPath = path.join(options.outputDir, convertEntryAsFilePathFormat(entry));
        if (!options.dryRun) {
            makeDir.sync(path.dirname(outputPath));
        }
        if (options.verbose) {
            console.log(outputPath);
        }
        if (!options.dryRun) {
            fs.writeFileSync(outputPath, buffer);
        }
    });
};
