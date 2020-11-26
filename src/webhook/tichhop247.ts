import { Request, Response } from 'express'
import UserActionsModels from '../models/userAction'
import UserModels from '../models/user'
import WalletModels from '../models/wallet'
import TransactionModels from '../models/transaction'
import sendMessage from '../api/sendAPI'
import config from '../config'

const User = new UserModels()
const Transaction = new TransactionModels()
const Wallet = new WalletModels()
const UserAction = new UserActionsModels()

export default async function(req: Request, res: Response): Promise<void> {
  const status = req.query['Code']
  const mess = req.query['Mess']
  const reason = req.query['Reason']
  const value = req.query['CardValue']
  const transID = req.query['TrxID']

  console.log('log', { status, mess, reason, value, transID })
  console.log('chekc', JSON.stringify({ transID: transID }))
  const actionResult = await UserAction.findByDataString(JSON.stringify({ transID: transID }))
  if (actionResult !== null) {
    const _actionResult = actionResult[0]
    const user = await User.findByID(_actionResult.user_id)

    if (user === null) {
      console.error('Nạp thẻ lỗi, User.findByID(_actionResult.user_id)')
      return
    }

    if (status && mess && reason && value && transID) {
      console.log('success', { status, mess, reason, value, transID })
      
      if (status === '1') {
        const money: number = parseInt(value.toString(), 10)
        
        if (money < 1000) {
          sendMessage(user.facebook_psid, { text: `Nạp thẻ thất bại bởi lỗi không xác định. Vui lòng liên hệ admin để được hỗ trợ.` })
        } else {
          const moneyToAdd: number = money - money * config.tichhop247_card_rate.default
          
          Wallet.addMoney(user.user_id, moneyToAdd)  
          Transaction.addNew({
            method: 'thecao247',
            amount: money,
            fee: money * config.tichhop247_card_rate.default,
            time: new Date(),
            trans_id: transID.toString(),
            user_id: user.user_id,
            description: 'napthe'
          })

          sendMessage(user.facebook_psid, { 
            text: `Đã nạp thành công ${moneyToAdd}VND vào tài khoản (phí giao dịch ${money * config.tichhop247_card_rate.default}VND - ${config.tichhop247_card_rate.default*100}%), mã giao dịch: ${transID}` 
          })
        }
      }
      
      if (status === '2') sendMessage(user.facebook_psid, { text: `Nạp thẻ lỗi, mệnh giá không đúng.` })
      
      if (status === '3') sendMessage(user.facebook_psid, { text: `Nạp thẻ lỗi, mệnh giá không đúng.` })
      
      if (status === '5') sendMessage(user.facebook_psid, { text: `Nạp thẻ lỗi, thông tin thẻ không chính xác.` })
      
      if (status === '99') sendMessage(user.facebook_psid, { text: `Nạp thẻ lỗi, dịch vụ đang bảo trì. Vui lòng liên hệ admin để được hỗ trợ` })
      
    } else {
      sendMessage(user.facebook_psid, { text: `Nạp thẻ thất bại bởi lỗi không xác định. Vui lòng liên hệ admin để được hỗ trợ.` })
    }
    
    res.status(200).send()
    UserAction.deleteByUserID(_actionResult.user_id)
    return
  }
  res.status(400).send()
  return
}
