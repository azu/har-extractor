import { Entry } from "har-format";

const getEntryContentAsBuffer = (entry: Entry): Buffer | undefined => {
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

export const prettifyBufferJSON = (buffer: Buffer): Buffer => {
    const json = JSON.parse(buffer.toString());
    const prettyJSON = JSON.stringify(json, null, 2);
    return Buffer.from(prettyJSON);
};

export default getEntryContentAsBuffer;
