import { Request, Response } from 'express'

import handleMessage from '../routes/handleMessage'
import handlePostback from '../routes/handlePostback'

export default function(req: Request, res: Response): void {

  let body: IWebhookMessageEvent = req.body
  
  if (body.object === 'page') {
    body.entry.forEach((entry) => {
      
      // Gets the body of the webhook event
      let webhookEvent = entry.messaging[0]

      // Get the sender PSID
      let senderPSID: string = webhookEvent.sender.id

      // Get the message
      let message = webhookEvent.message

      /**
       * Check if the event is a message or postback and
       * pass the event to the appropriate handler function
       */
      if (webhookEvent.message) {
        handleMessage(senderPSID, message)
      } 
      else if (webhookEvent.postback) {
        handlePostback(senderPSID, webhookEvent.postback)
      }
      // Return a '200 OK' response to all events
      res.status(200).send('EVENT_RECEIVED');

    })
  } else {
    // Return a '404 Not Found' if event is not from a page subscription
    res.sendStatus(404);
  }

}
