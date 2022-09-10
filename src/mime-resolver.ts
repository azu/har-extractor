import knownMIME from "mime-db";
import { prettifyBufferJSON } from "./data-utils.js";

const knownMimeMap = Object.keys(knownMIME)
    .map((v: keyof typeof knownMIME) => {
        const extensions = knownMIME[v].extensions;
        if (extensions === undefined) {
            return null;
        } else {
            return { key: v, extension: "." + extensions[0] };
        }
    })
    .filter((v) => v !== null) as { key: string; extension: string }[];

const filteredMimeMap = knownMimeMap.reduce((acc, curr) => ({ ...(acc || {}), [curr.key]: curr }), {});

interface MimeInfo {
    extension: string;
    pretty?: (buffer: Buffer) => Buffer;
    defaultFilename?: string;
}

export type MimeMapper = {
    [key in string]: MimeInfo;
};

export const mimeMap: MimeMapper = {
    ...filteredMimeMap,
    "application/json": {
        extension: ".json",
        pretty: prettifyBufferJSON,
    },
    "text/javascript": {
        extension: ".js",
        defaultFilename: "script.js",
    },
    "text/html": {
        extension: ".html",
        defaultFilename: "index.html",
    },
    "image/png": {
        extension: ".png",
    },
    "image/gif": {
        extension: ".gif",
    },
    "image/bmp": {
        extension: ".bmp",
    },
};

export const resolveFilePathForKnownMime = (props: {
    mimeInfo: MimeInfo;
    targetFilename: string;
    buffer: Buffer;
    dirnames: string[];
    pretty: boolean;
}) => {
    const { mimeInfo, targetFilename, buffer, dirnames, pretty } = props;

    const extension = mimeInfo.extension;
    const defaultFilename = mimeInfo.defaultFilename;

    const updatedBuffer = pretty && mimeInfo.pretty ? mimeInfo.pretty(buffer) : buffer;

    if (defaultFilename !== undefined && (!targetFilename || !targetFilename.includes(extension))) {
        return { uniquePath: dirnames.join("/") + defaultFilename, updatedBuffer: buffer };
    } else {
        const addExtension = targetFilename.includes(extension) ? "" : extension;
        dirnames[dirnames.length - 1] = targetFilename + addExtension;
        return { uniquePath: dirnames.join("/"), updatedBuffer };
    }
};
