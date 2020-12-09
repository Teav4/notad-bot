import sendMessage from '../api/sendAPI'
import { createQuickReplyPhoneNumber } from '../api/template/quickReply'
import createImageMessage from '../api/template/image'

export default async function test(senderPSID: ISenderPSID) {

  const response: IResponseMessage = {
    attachment: await createImageMessage(['https://purr.objects-us-east-1.dream.io/i/0oKOv.jpg', 'https://purr.objects-us-east-1.dream.io/i/0oKOv.jpg'])
  }
  sendMessage(senderPSID, response)
}
