"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sendAPI_1 = __importDefault(require("../api/sendAPI"));
function handlePostback(senderPSID, receivedPostback) {
    let response;
    let payload = receivedPostback.payload;
    if (payload === 'yes') {
        response = { text: 'Thanks!' };
    }
    else {
        response = { text: 'Oops, try sending another image' };
    }
    sendAPI_1.default(senderPSID, response);
}
exports.default = handlePostback;
