import { IsenderPSID, IResponseMessage } from '../@types'
import request, { Response as IResponse } from 'request'

// import runtime env
import dotenv from 'dotenv'
dotenv.config()

const { PAGE_ACCESS_TOKEN } = process.env

export default function callSendAPI(senderPSID: IsenderPSID, response: IResponseMessage): void {
  // Contruct the message body
  const requestBody = {
    recipient: {
      id: senderPSID
    },
    message: response
  }

  // Send the HTTP request to the Message Platform
  request({
    url: 'https://graph.facebook.com/v2.6/me/messages',
    qs: { "access_token": PAGE_ACCESS_TOKEN },
    method: 'POST',
    json: requestBody,
  }, (err: Error, res: IResponse, body: string) => {
    if (err) {
      console.error('Unable to send message:' + err)
    }
    
  })

}
