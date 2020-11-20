import ping from '../commands/ping'
import * as momo from '../commands/momo'

export default function(senderPSID: ISenderPSID, receivedMessage: IWebhookMessage) {
  const textMessage = receivedMessage.text
  
  if (textMessage) {
   
      if (receivedMessage.text === 'ping') {
        ping(senderPSID)
      }
      if (receivedMessage.text.indexOf('napmomo ') === 0) {
        momo.napMoMo(senderPSID, textMessage)
      }
      
  }
  
  if (receivedMessage.attachments) {
    // Get the URL of the message attachment
  }

}
