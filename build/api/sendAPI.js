"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const request_1 = __importDefault(require("request"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const { PAGE_ACCESS_TOKEN } = process.env;
function callSendAPI(senderPSID, response) {
    const requestBody = {
        recipient: {
            id: senderPSID
        },
        message: response
    };
    request_1.default({
        url: 'https://graph.facebook.com/v2.6/me/messages',
        qs: { "access_token": PAGE_ACCESS_TOKEN },
        method: 'POST',
        json: requestBody,
    }, (err, res, body) => {
        if (err) {
            console.error('Unable to send message:' + err);
        }
    });
}
exports.default = callSendAPI;
