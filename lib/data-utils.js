var getEntryContentAsBuffer = function (entry) {
    var content = entry.response.content;
    var text = content.text;
    if (text === undefined) {
        return;
    }
    if (content.encoding === "base64") {
        return Buffer.from(text, "base64");
    }
    else {
        return Buffer.from(text);
    }
};
export var prettifyBufferJSON = function (buffer) {
    var json = JSON.parse(buffer.toString());
    var prettyJSON = JSON.stringify(json, null, 2);
    return Buffer.from(prettyJSON);
};
export default getEntryContentAsBuffer;
//# sourceMappingURL=data-utils.js.map