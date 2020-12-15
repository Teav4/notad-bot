import sendMessage from '../api/sendAPI'
import UserActionsModels from '../models/userAction'
import UserModels from '../models/user'
import TichHop247 from '../services/tichhop247'
import { randomBetween } from '../helper/number' 
import config from '../config'
import validate from '../validate/tichhop247_napthe'
import { createQuickReplyText } from '../api/template/quickReply'

const UserAction = new UserActionsModels()
const User = new UserModels()
const Tichhop247 = new TichHop247(config.tichhop247_key || '')

export async function add(senderPSID: ISenderPSID, message: string): Promise<boolean> {
  let textMessage: string = message
  console.log("senderPSID1", senderPSID)

  // get user id
  let user = await User.findByFacebookPSID(senderPSID)
  
  if (user === null) {
    user = await User.createNew(senderPSID)

    if (user === null) {
      sendMessage(senderPSID, { text: 'Đã có lỗi xảy ra, hãy thử lại sau. Mã lỗi 201' })
      return false
    }
  }
  const userID = user.user_id
  console.log('b')
  const actionResponse = await UserAction.findByUserID(userID)
  console.log('actionResponse', actionResponse)
  if (actionResponse === null) {
    // create new
    UserAction.addNew({
      action_name: 'napthe247',
      user_id: userID,
      data: {}
    })

    setTimeout(() => {
      sendMessage(senderPSID, {
        text: 'Chọn nhà mạng (VTT,VMS,VNP, VNM):',
        quick_replies: [
          createQuickReplyText('VTT', 'https://media.discordapp.net/attachments/782677973152170015/782678382257242112/viettel-100x100.png'),
          createQuickReplyText('VMS', 'https://media.discordapp.net/attachments/782677973152170015/782679215283109918/mobifone-100x100.png'),
          createQuickReplyText('VNP', 'https://media.discordapp.net/attachments/782677973152170015/782678440318599189/vinaphone-xoa-nen.png'),
          createQuickReplyText('VNM', 'https://media.discordapp.net/attachments/782677973152170015/782678415903293460/vietnammobiphone-100x100.png')
        ]
      })
    })
    sendMessage(senderPSID, { text: 'Gõ X để hủy nhập.' })

    return true

  }

  return false
  // const response: IResponseMessage = {
  //   text: `it's works!!!`
  // }
  // sendMessage(senderPSID, response)
}

export async function check(senderPSID: ISenderPSID, message: string) {
  let textMessage: string = message.trim()
  console.log("senderPSID2", senderPSID)

  // get user id
  let user = await User.findByFacebookPSID(senderPSID)

  if (user === null) {
    user = await User.createNew(senderPSID)

    if (user === null) {
      sendMessage(senderPSID, { text: 'Đã có lỗi xảy ra, hãy thử lại sau. Mã lỗi 201' })
      return
    }
  }
  const userID = user.user_id

  const actionResponse = await UserAction.findByUserID(userID)
  if (actionResponse !== null && actionResponse[0].action_name === 'napthe247') {

    // check timeout (1 minutes)
    if (actionResponse[0].last_update !== undefined && Date.now() - actionResponse[0].last_update > 1*60*1000) {
      console.log('timeout.')

      UserAction.deleteByUserID(userID)
      return 
    }

    // cancel command
    if (textMessage === 'X') {
      console.log('cancel.')

      sendMessage(senderPSID, { text: 'đã hủy.' })
      UserAction.deleteByUserID(userID)
      return
    }

    if (actionResponse[0].action_name === 'napthe247') {
      const actionData = JSON.parse(actionResponse[0].data)

      if (actionData.network === undefined) {
        actionData.network = textMessage

        const validateStatus = validate.network(textMessage)
        if (validateStatus.isPassed) {
          UserAction.updateDataByUserID(userID, actionData)
          sendMessage(senderPSID, { text: 'Nhập mã thẻ:' })

        } else {
          sendMessage(senderPSID, { text: validateStatus.message})
        }

        return
      }

      if (actionData.privateCode === undefined) {
        actionData.privateCode = textMessage

        const validateStatus = validate.privateCode(textMessage)
        if (validateStatus.isPassed) {
          UserAction.updateDataByUserID(userID, actionData)
          sendMessage(senderPSID, { text: 'Nhập số series:' })

        } else {
          sendMessage(senderPSID, { text: validateStatus.message})
        }

        return
      }

      if (actionData.series === undefined) {
        actionData.series = textMessage

        const validateStatus = validate.series(textMessage)
        if (validateStatus.isPassed) {
          UserAction.updateDataByUserID(userID, actionData)
          sendMessage(senderPSID, { text: 'Nhập mệnh giá thẻ:' })
        
        } else {
          sendMessage(senderPSID, { text: validateStatus.message})
        }

        return
      }

      if (actionData.value === undefined) {
        actionData.value = textMessage

        const validateStatus = validate.value(textMessage)
        if (validateStatus.isPassed) {
          UserAction.deleteByUserID(userID)
        
          const transactionID = randomBetween(1, 999999).toString()
          const isComplete = await Tichhop247.Add(actionData.network, actionData.privateCode, actionData.series, actionData.value, transactionID)
        
          if (!isComplete) {
            sendMessage(senderPSID, { text: 'Thông tin thẻ sai, hoặc đã được sử dụng. Vui lòng liên hệ admin để được hỗ trợ.' })
          } else {
            UserAction.addNew({
              action_name: 'napthe247_waitting_webhook',
              data: { transID: transactionID },
              user_id: userID
            })
  
            sendMessage(senderPSID, { text: `Thẻ đang trong quá trình xử lý, có thể mất đến 5p. Nếu quá thời gian đó vui lòng liên hệ admin để được hỗ trợ!` })
          }

        } else {
          sendMessage(senderPSID, { text: validateStatus.message})
        }

        return
      }
      
    }
  }

}
