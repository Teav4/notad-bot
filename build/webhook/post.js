"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const handleMessage_1 = __importDefault(require("../routes/handleMessage"));
const handlePostback_1 = __importDefault(require("../routes/handlePostback"));
function default_1(req, res) {
    let body = req.body;
    if (body.object === 'page') {
        body.entry.forEach((entry) => {
            let webhookEvent = entry.messaging[0];
            let senderPSID = webhookEvent.sender.id;
            let message = webhookEvent.message;
            if (webhookEvent.message) {
                handleMessage_1.default(senderPSID, message);
            }
            else if (webhookEvent.postback) {
                handlePostback_1.default(senderPSID, webhookEvent.postback);
            }
            res.status(200).send('EVENT_RECEIVED');
        });
    }
    else {
        res.sendStatus(404);
    }
}
exports.default = default_1;
