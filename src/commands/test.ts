import sendMessage from '../api/sendAPI'
import { createQuickReplyPhoneNumber } from '../api/template/quickReply'

export default async function test(senderPSID: ISenderPSID) {

  const response: IResponseMessage = {
    text: 'test123',
    quick_replies: [  ]
  }
  sendMessage(senderPSID, response)
}
