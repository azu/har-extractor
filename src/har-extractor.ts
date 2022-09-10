import * as fs from "fs";
import { Har } from "har-format";
import * as path from "path";

//@ts-ignore
import makeDir from "make-dir";
import getEntryContentAsBuffer from "./data-utils.js";

import { convertEntryAsFilePathFormat, getAvailableFilename } from "./filename-resolve.js";

export interface ExtractOptions {
    outputDir: string;
    verbose?: boolean;
    dryRun?: boolean;
    removeQueryString?: boolean;
    pretty?: boolean;
}

export const extract = (harContent: Har, options: ExtractOptions) => {
    harContent.log.entries.forEach(async (entry) => {
        const buffer = getEntryContentAsBuffer(entry);
        if (!buffer) {
            return;
        }
        const { uniquePath, updatedBuffer } = convertEntryAsFilePathFormat(
            buffer,
            entry,
            options.removeQueryString,
            options.pretty
        );

        const outputPath = getAvailableFilename(path.join(options.outputDir, uniquePath));

        if (!options.dryRun) {
            makeDir.sync(path.dirname(outputPath));
        }
        if (options.verbose) {
            console.log(outputPath);
        }
        if (!options.dryRun) {
            fs.writeFileSync(outputPath, updatedBuffer);
        }
    });
};
