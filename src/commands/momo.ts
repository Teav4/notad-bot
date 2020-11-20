import sendMessage from '../api/sendAPI'
import MoMoAPI from '../services/momo'
import TransactionModels from '../models/transaction'
import UserModel from '../models/user'
import { isNumberic, randomBetween } from '../helper/number'
import MessengerAPIService from '../services/messengerAPI'
import WalletModels from '../models/wallet'

const momoAPI = new MoMoAPI()
const Transaction = new TransactionModels()
const User = new UserModel()
const MessengerAPI = new MessengerAPIService()
const Wallet = new WalletModels()

export async function napMoMo(senderPSID: ISenderPSID, message: string) {
  const [prefix, momoTransCode]: string[] = message.split(' ')

  if (isNumberic(momoTransCode) === false) {
    sendMessage(senderPSID, { text: 'Mã giao dịch không đúng định dạng. Hãy nhập lại' })
    return
  }

  const trans = await momoAPI.checkTransaction(parseInt(momoTransCode, 10))
  if (trans === null) {
    sendMessage(senderPSID, { text: 'Mã giao dịch sai hoặc không tồn tại. Liên hệ admin để được hỗ trợ!' })
    return
  }

  let user: IUser|null = await User.findByFacebookPSID(senderPSID)
  if (user === null) {
    const userProfileResponse = await MessengerAPI.getPersonProfile(senderPSID)

    if (userProfileResponse === null) {
      sendMessage(senderPSID, { text: 'Đã có lỗi xảy ra, hãy thử lại sau.' })
      return
    }

    user = {
      facebook_psid: senderPSID,
      user_id: randomBetween(1, 999999),
      name: `${userProfileResponse.firstName} ${userProfileResponse.lastName}`,
      avatar: userProfileResponse.avatarUrl,
      role: 'user',
    }
    User.addUser(user)
  }
  
  const dateNow = new Date()
  // check transaction
  const checkTrans = await Transaction.findByID('momo', momoTransCode)
  if (checkTrans !== null) {
    sendMessage(senderPSID, { text: 'Lỗi, mã giao dịch đã được sử dụng.' })
    return  
  }

  Transaction.addNew({
    user_id: user.user_id,
    amount: trans.amount,
    fee: 0,
    time: dateNow,
    description: trans.comment,
    method: 'momo',
    trans_id: momoTransCode,
  })

  Wallet.addMoney(user.user_id, trans.amount)
  const uWallet = await Wallet.getWallet(user.user_id)

  if (uWallet === null) {
    sendMessage(senderPSID, { text: 'Lỗi giao dịch không xác định, hãy liên hệ admin để được hỗ trợ.' })
    return
  }

  sendMessage(senderPSID, { text: 'Nạp tài khoản thành công' })
  setTimeout(() => sendMessage(senderPSID, { text: `USERID: ${senderPSID}\nTài khoản: ${uWallet.balance}VND\nCập nhật ngày ${dateNow.getDate()}/${dateNow.getMonth()+1}/${dateNow.getFullYear()}` }), 1000)
}
