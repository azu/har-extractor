#!/usr/bin/env node
"use strict";
const fs = require("fs");
const path = require("path");
const meow = require("meow");
const { extract } = require("../lib/har-extractor.js");
const cli = meow(
    `
    Usage
      $ har-extractor <harfile> --output /path/to/output

    Options:
      --output, -o Output directory
      --remove-query-string, -r Remove query string from file path
      --dry-run Enable dry run mode
      --verbose Show processing file path

    Examples
      $ har-extractor ./net.har --output /path/to/output
`,
    {
        flags: {
            output: {
                type: "string",
                alias: "o"
            },
            removeQueryString: {
                type: "boolean",
                alias: "r",
                default: false
            },
            verbose: {
                type: "boolean",
                default: true
            },
            dryRun: {
                type: "boolean",
                default: false
            }
        },
        autoHelp: true
    }
);

const harFilePath = cli.input[0];
if (!harFilePath) {
    cli.showHelp();
}
try {
    const harContent = JSON.parse(fs.readFileSync(path.resolve(process.cwd(), harFilePath), "utf-8"));
    extract(harContent, {
        verbose: cli.flags.verbose,
        dryRun: cli.flags.dryRun,
        removeQueryString: cli.flags.removeQueryString,
        outputDir: cli.flags.output
    });
} catch (error) {
    console.error(error);
    cli.showHelp();
}
