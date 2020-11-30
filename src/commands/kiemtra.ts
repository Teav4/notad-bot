import sendMessage from '../api/sendAPI'
import UserModels from '../models/user'
import WalletModels from '../models/wallet'
import { createQuickReplyText } from '../api/template/quickReply'

const Wallet = new WalletModels()
const User = new UserModels()

export default async function checkWallet(senderPSID: ISenderPSID, message: string) {
  
  let user = await User.findByFacebookPSID(senderPSID)
  if (user === null) {
    user = await User.createNew(senderPSID)

    if (user === null) {
      sendMessage(senderPSID, { text: 'Đã có lỗi xảy ra, hãy thử lại sau. Mã lỗi 401' })
      return
    }
  }
  let wallet = await Wallet.getWallet(user.user_id)
  if (wallet === null) {
    wallet = {
      user_id: user.user_id,
      balance: 0,
      currency: 'VND'
    }
    Wallet.create(wallet)
  }
  
  const text = `USER ID: ${wallet.user_id} \nTEN TAI KHOAN: ${user.name} \nSO DU: ${wallet.balance}VND`
  sendMessage(senderPSID, {
    text,
    quick_replies: [
      createQuickReplyText('OK')
    ]
  })
}
