import { IsenderPSID, IWebhookMessage, IResponseMessage } from '../@types'
import sendAPI from '../api/sendAPI'

export default function(senderPSID: IsenderPSID, receivedMessage: IWebhookMessage){
  let response: IResponseMessage

  if (receivedMessage.text) {
    response = { text: `You sent the message ${receivedMessage.text}. Now send me an attachment!` }
  } else if (receivedMessage.attachments) {
    // Get the URL of the message attachment
    let attachmentURL: string = receivedMessage.attachments[0].payload.url
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
    }
  } else {
    response = { text: 'OK!' }
  }

  sendAPI(senderPSID, response)

}
