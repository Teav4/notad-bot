import config from '../config'
import ping from '../commands/ping'
import test from '../commands/test'
import * as momo from '../commands/momo'
import * as napthe from '../commands/napthe'
import * as chuyentien from '../commands/chuyentien'

export default function(senderPSID: ISenderPSID, receivedMessage: IWebhookMessage) {
  const textMessage = receivedMessage.text

  // disable self listen
  if (senderPSID === config.page.pageID) {
    return
  }
  
  if (textMessage) {

      napthe.check(senderPSID, textMessage)
      chuyentien.check(senderPSID, textMessage)

      if (receivedMessage.text === 'ping') {
        ping(senderPSID)
      }

      if (receivedMessage.text === 'test') {
        test(senderPSID)
      }

      if (receivedMessage.text.indexOf('napmomo ') === 0) {
        momo.napMoMo(senderPSID, textMessage)
      }
      if (receivedMessage.text.indexOf('chuyentien ') === 0) {
        chuyentien.init(senderPSID, textMessage)
      }
      if (receivedMessage.text === 'napthe') {
        napthe.add(senderPSID, textMessage)
      }
      
  }
  
  if (receivedMessage.attachments) {
    // Get the URL of the message attachment
  }

}
