/// <reference types="node" />
import { Entry } from "har-format";
export declare const getAvailableFilename: (file: string) => string;
export declare const getAvailableDirectory: (dir: string) => string;
export declare const convertEntryAsFilePathFormat: (buffer: Buffer, entry: Entry, removeQueryString?: boolean, pretty?: boolean) => {
    uniquePath: string;
    updatedBuffer: Buffer;
};
