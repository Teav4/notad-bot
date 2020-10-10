import { IsenderPSID, IResponseMessage } from '../@types'
import sendAPI from '../api/sendAPI'

export default function handlePostback (senderPSID: IsenderPSID, receivedPostback: any){
  let response: IResponseMessage
  
  // Get the payload for the postback
  let payload = receivedPostback.payload

  // Set the response based on the postback payload
  if (payload === 'yes') {
    response = { text: 'Thanks!' }
  
  } else {
    response = { text: 'Oops, try sending another image' }

  }

  sendAPI(senderPSID, response)

}
