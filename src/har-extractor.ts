import * as fs from "fs";
import { Har, Entry } from "har-format";
import * as path from "path";

const filenamify = require("filenamify");
const humanizeUrl = require("humanize-url");

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

export const convertEntryAsFilePathFormat = (entry: Entry, removeQueryString: boolean = false): string => {
    const requestURL = entry.request.url;
    const stripSchemaURL: string = humanizeUrl(removeQueryString ? requestURL.split("?")[0] : requestURL);
    const dirnames: string[] = stripSchemaURL.split("/").map((pathname) => {
        return filenamify(pathname, { maxLength: 255 });
    });
    const fileName = dirnames[dirnames.length - 1];
    if (
        fileName &&
        !fileName.includes(".html") &&
        entry.response.content.mimeType &&
        entry.response.content.mimeType.includes("text/html")
    ) {
        return dirnames.join("/") + "/index.html";
    }
    return dirnames.join("/");
};

export interface ExtractOptions {
    outputDir: string;
    verbose?: boolean;
    dryRun?: boolean;
    removeQueryString?: boolean;
}

const ensureDir = (dirPath: string): void => {
    // Split the path into components
    const parts = dirPath.split(path.sep);
    console.log(parts);

    // Iterate through each part of the path
    for (let i = 1; i <= parts.length; i++) {
        const subPath = parts.slice(0, i).join(path.sep);

        if (fs.existsSync(subPath)) {
            if (fs.lstatSync(subPath).isFile()) {
                // If subPath is a file, move it to an index file within a new directory
                const fileContent = fs.readFileSync(subPath); // Read the file content
                fs.unlinkSync(subPath); // Remove the file
                fs.mkdirSync(subPath); // Create the directory
                fs.writeFileSync(path.join(subPath, "index"), fileContent); // Write the file content to index
            }
        } else {
            // If subPath does not exist, create the directory
            fs.mkdirSync(subPath);
        }
    }
};

export const extract = (harContent: Har, options: ExtractOptions) => {
    harContent.log.entries.forEach((entry) => {
        const buffer = getEntryContentAsBuffer(entry);
        if (!buffer) {
            return;
        }
        const outputPath = path.join(options.outputDir, convertEntryAsFilePathFormat(entry, options.removeQueryString));
        const outputDir = path.dirname(outputPath);

        if (!options.dryRun && outputDir.length > 0) {
            try {
                ensureDir(outputDir);
            } catch (error: any) {
                if (error?.code !== "EEXIST") {
                    throw error;
                }
            }
        }

        if (options.verbose) {
            console.log(outputPath);
        }
        if (!options.dryRun) {
            fs.writeFileSync(outputPath, buffer);
        }
    });
};
