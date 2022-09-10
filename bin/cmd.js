#!/usr/bin/env node
"use strict";
import fs from "fs";
import path from "path";

// Polyfill for es6 import support
import { createRequire } from "module";
const meow = createRequire(import.meta.url)("meow");

import { extract } from "../lib/har-extractor.js";
import { getAvailableDirectory } from "../lib/filename-resolve.js";

const DEFAULT_VAL = "!DEFAULT";

const cli = meow(
    `
    Usage
      $ har-extractor-easy <harfile> [--output ./output/path]

    Options:
      --output, -o Output directory (Default = ./[harfile-name])
      --remove-query-string, -r Remove query string from file path (Default = true)
      --dry-run Enable dry run mode (Default = false)
      --verbose Show processing file path (Default = true)
      --pretty Prettifies JSON files (Default = true)

    Examples
      $ har-extractor-easy ./net.har
      (Extracts to new directory with same name as har file eg. ./net-har/)
`,
    {
        flags: {
            output: {
                type: "string",
                alias: "o",
                default: DEFAULT_VAL,
            },
            removeQueryString: {
                type: "boolean",
                alias: "r",
                default: true,
            },
            verbose: {
                type: "boolean",
                default: true,
            },
            dryRun: {
                type: "boolean",
                default: false,
            },
            pretty: {
                type: "boolean",
                default: true,
            },
        },
        autoHelp: true,
    }
);

const harFilePath = cli.input[0];
if (!harFilePath) {
    cli.showHelp();
    throw "HAR File required";
}
const harInputPath = path.resolve(process.cwd(), harFilePath);
try {
    const harContent = JSON.parse(fs.readFileSync(harInputPath, "utf-8"));

    let outputDir = cli.flags.output;
    if (outputDir === DEFAULT_VAL) {
        outputDir = getAvailableDirectory(process.cwd() + "/" + path.basename(harInputPath.replace(".", "-")));
    }

    extract(harContent, {
        verbose: cli.flags.verbose,
        dryRun: cli.flags.dryRun,
        removeQueryString: cli.flags.removeQueryString,
        pretty: cli.flags.pretty,
        outputDir,
    });
} catch (error) {
    console.error(error);
    cli.showHelp();
}
