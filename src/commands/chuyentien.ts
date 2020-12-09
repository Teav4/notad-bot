import sendMessage from '../api/sendAPI'
import UserModels from '../models/user'
import WalletModels from '../models/wallet'
import UserActionModels from '../models/userAction'
import { isNumberic } from '../helper/number'
import { createQuickReplyText } from '../api/template/quickReply'

const User = new UserModels()
const Wallet = new WalletModels()
const UserAction = new UserActionModels()

/**
 * cmd: chuyentien [id] [value]
 * @param senderPSID 
 */
export async function init(senderPSID: ISenderPSID, message: string) {
  const [prefix, targetUserID, transValue]: string[] = message.split(' ')

  if (! isNumberic(transValue)) {
    sendMessage(senderPSID, { text: 'Giá trị chuyển không hợp lệ' })
    return
  }

  if (! isNumberic(targetUserID)) {
    sendMessage(senderPSID, { text: 'id người dùng không hợp lệ' })
    return
  }

  const _targetUserID = parseInt(targetUserID, 10)
  const _transValue = parseInt(transValue, 10)
  
  if (_transValue < 1000 || _transValue > 1000000) {
    sendMessage(senderPSID, { 
      text: 'Giá trị chuyển tiền phải lớn hơn 1000VND và bé hơn 1.000.000',
      quick_replies: [
        createQuickReplyText('Tôi hiểu.')
      ]  
    })
    return
  }

  
  // get user id
  let user = await User.findByFacebookPSID(senderPSID)
  if (user === null) {
    user = await User.createNew(senderPSID)
    
    if (user === null) {
      sendMessage(senderPSID, { text: 'Đã có lỗi xảy ra, hãy thử lại sau. Mã lỗi 301' })
      return false
    }
  }

  if (_targetUserID === user.user_id) {
    sendMessage(senderPSID, {
      text: 'Không thể chuyển tiền cho chính bản thân.',
      quick_replies: [
        createQuickReplyText('Tôi hiểu.')
      ]
    })
    return
  }

  let targetUser = await User.findByID(_targetUserID)
  if (targetUser === null) {
    sendMessage(senderPSID, { text: `Người dùng với ID: ${targetUserID} không tồn tại.` })
    return
  }

  UserAction.addNew({
    action_name: 'user_money_tranfer_confirm',
    data: { 
      user: user.user_id,
      to: _targetUserID,
      value: _transValue,
      message: null
    },
    user_id: user.user_id,
  })

  sendMessage(senderPSID, {
    text: `Bạn xác nhận chuyển số tiền ${_transValue}VND cho người dùng ${targetUser.name} [ID: ${targetUserID}]`,
    quick_replies: [
      createQuickReplyText('Yes', 'https://cdn.discordapp.com/attachments/782703068038824017/782703092021985299/pepeyes.png'),
      createQuickReplyText('No', 'https://cdn.discordapp.com/attachments/782703068038824017/782703105313341480/pepeno.png'),
      createQuickReplyText('Thêm lời nhắn')
    ]
  })
}

export async function check(senderPSID: ISenderPSID, message: string) {
  const textMessage = message.trim().toLowerCase()

  let user = await User.findByFacebookPSID(senderPSID)

  if (user === null) {
    user = await User.createNew(senderPSID)

    if (user === null) {
      sendMessage(senderPSID, { text: 'Đã có lỗi xảy ra, hãy thử lại sau. Mã lỗi 302' })
      return
    }
  }
  const action = await UserAction.findByUserID(user.user_id)
  console.log('action', action)
  if (action === null) {
    return  
  } else if (action[0].action_name !== 'user_money_tranfer_confirm') {
    return
  }
  
  const actionData = JSON.parse(action[0].data)
  // check timeout (1 minutes)
  if (action[0].last_update !== undefined && Date.now() - action[0].last_update > 1*60*1000) {
    console.log('timeout.')

    UserAction.deleteByUserID(user.user_id)
    return 
  }
  const targetUserID = actionData.to
  const transValue = actionData.value
  const targetUser = await User.findByID(targetUserID)
  if (targetUser === null) {
    sendMessage(senderPSID, { text: 'Đã có lỗi xảy ra, hãy thử lại sau. Mã lỗi 305' })
    return
  }

  if (actionData.message === '$$$wait_to_add_message$$$') {
    if (textMessage.length > 200) {
      sendMessage(senderPSID, { text: 'Lời nhắn nhập không đựoc quá 200 ký tự.' })
      return
    }
    actionData.message = textMessage

    UserAction.updateDataByUserID(user.user_id, actionData)
    sendMessage(senderPSID, {
      text: `Bạn xác nhận chuyển số tiền ${transValue}VND cho người dùng ${targetUser.name} [ID: ${targetUserID}]`,
      quick_replies: [
        createQuickReplyText('Yes', 'https://cdn.discordapp.com/attachments/782703068038824017/782703092021985299/pepeyes.png'),
        createQuickReplyText('No', 'https://cdn.discordapp.com/attachments/782703068038824017/782703105313341480/pepeno.png')
      ]
    })
    return
  }
  console.log({ textMessage, mess: actionData.message })
  if (textMessage === 'yes') {
    const userBalance = await Wallet.getWallet(user.user_id)
    if (userBalance === null) {
      sendMessage(senderPSID, { text: 'Đã có lỗi xảy ra, hãy thử lại sau. Mã lỗi 304' })
      return
    }
    if (userBalance.balance - transValue < 0) {
      sendMessage(senderPSID, { text: 'Số dư trong tài khoản không đủ để thực hiện giao dịch.' })
      UserAction.deleteByUserID(user.user_id)
      return
    }

    Wallet.addMoney(user.user_id, - transValue)
    Wallet.addMoney(targetUserID, transValue)

    
    sendMessage(senderPSID, {
      text: `Đã chuyển số tiền ${transValue}VND cho người dùng với ID: ${targetUserID}`,
      quick_replies: [
        createQuickReplyText('OK')
      ]
    })
    
    let text = `Đã nhận số tiền ${transValue}VND từ người dùng ${user.name} [ID: ${user.user_id}]`
    if (actionData.message !== null) text += `, lời nhắn: ${actionData.message}`
    sendMessage(targetUser.facebook_psid, {
      text,
      quick_replies: [
        createQuickReplyText('OK')
      ]
    })
  
  } else if (textMessage === 'thêm lời nhắn' && actionData.message === null) {
    actionData.message = '$$$wait_to_add_message$$$'
    UserAction.updateDataByUserID(user.user_id, actionData)
    sendMessage(senderPSID, { text: 'Nhập lời nhắn muốn gửi:' })
    return
  } else {
    sendMessage(senderPSID, {
      text: 'Đã hủy chuyển tiền.'
    })
  }
  UserAction.deleteByUserID(user.user_id)
}