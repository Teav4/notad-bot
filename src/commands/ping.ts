import sendMessage from '../api/sendAPI'

export default async function ping(senderPSID: ISenderPSID) {
  const response: IResponseMessage = {
    text: `pong!!! your PSID is ${senderPSID}`
  }
  sendMessage(senderPSID, response)
}
