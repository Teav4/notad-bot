"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sendAPI_1 = __importDefault(require("../api/sendAPI"));
function default_1(senderPSID, receivedMessage) {
    let response;
    if (receivedMessage.text) {
        response = { text: `You sent the message ${receivedMessage.text}. Now send me an attachment!` };
    }
    else if (receivedMessage.attachments) {
        let attachmentURL = receivedMessage.attachments[0].payload.url;
        response = {
            "attachment": {
                "type": "template",
                "payload": {
                    "template_type": "generic",
                    "elements": [{
                            "title": "Is this the right picture?",
                            "subtitle": "Tap a button to answer.",
                            "image_url": attachmentURL,
                            "buttons": [
                                {
                                    "type": "postback",
                                    "title": "Yes!",
                                    "payload": "yes",
                                },
                                {
                                    "type": "postback",
                                    "title": "No!",
                                    "payload": "no",
                                }
                            ],
                        }]
                }
            }
        };
    }
    else {
        response = { text: 'OK!' };
    }
    sendAPI_1.default(senderPSID, response);
}
exports.default = default_1;
