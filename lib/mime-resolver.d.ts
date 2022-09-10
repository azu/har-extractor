/// <reference types="node" />
interface MimeInfo {
    extension: string;
    pretty?: (buffer: Buffer) => Buffer;
    defaultFilename?: string;
}
export declare type MimeMapper = {
    [key in string]: MimeInfo;
};
export declare const mimeMap: MimeMapper;
export declare const resolveFilePathForKnownMime: (props: {
    mimeInfo: MimeInfo;
    targetFilename: string;
    buffer: Buffer;
    dirnames: string[];
    pretty: boolean;
}) => {
    uniquePath: string;
    updatedBuffer: Buffer;
};
export {};
