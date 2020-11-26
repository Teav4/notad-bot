import config from '../config'
import ping from '../commands/ping'
import * as momo from '../commands/momo'
import * as napthe from '../commands/napthe'

export default function(senderPSID: ISenderPSID, receivedMessage: IWebhookMessage) {
  const textMessage = receivedMessage.text

  // disable self listen
  if (senderPSID === config.page.pageID) {
    return
  }
  
  if (textMessage) {

      napthe.check(senderPSID, textMessage)

      if (receivedMessage.text === 'ping') {
        ping(senderPSID)
      }
      if (receivedMessage.text.indexOf('napmomo ') === 0) {
        momo.napMoMo(senderPSID, textMessage)
      }
      if (receivedMessage.text === 'napthe') {
        napthe.add(senderPSID, textMessage)
      }
      
  }
  
  if (receivedMessage.attachments) {
    // Get the URL of the message attachment
  }

}
