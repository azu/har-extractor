/// <reference types="node" />
import { Entry } from "har-format";
declare const getEntryContentAsBuffer: (entry: Entry) => Buffer | undefined;
export declare const prettifyBufferJSON: (buffer: Buffer) => Buffer;
export default getEntryContentAsBuffer;
