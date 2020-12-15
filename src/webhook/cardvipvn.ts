import { Request, Response } from 'express'
import UserActionModels from '../models/userAction'
import UserModels from '../models/user'
import WalletModels from '../models/wallet'
import TransactionModels from '../models/transaction'
import sendMessage from '../api/sendAPI'
import config from '../config'

const User = new UserModels()
const Transaction = new TransactionModels()
const Wallet = new WalletModels()
const UserAction = new UserActionModels()

export default async function (req: Request, res: Response): Promise<void> {
    
    const status = req.query['status']
    const pricesvalue = req.query['pricesvalue']
    const valueReceive = req.query['value_receive']
    const cardCode = req.query['card_code']
    const cardSeri = req.query['card_seri']
    const requestID = req.query['requestid']

    console.log({ status, pricesvalue, valueReceive, cardCode, cardSeri, requestID })

    const actionResult = await UserAction.findByDataString(JSON.stringify({ transID: requestID }))
    if (actionResult !== null) {
      const _actionResult = actionResult[0]
      const user = await User.findByID(_actionResult.user_id)
  
      if (user === null) {
        console.error('Nạp thẻ lỗi, User.findByID(_actionResult.user_id)')
        return
      }
  
      if (status && pricesvalue && valueReceive && cardCode && cardSeri && requestID) {
      
        if (status === '200') {
          const money: number = parseInt(valueReceive.toString(), 10)
          
          if (money < 1000) {
            sendMessage(user.facebook_psid, { text: `Nạp thẻ thất bại bởi lỗi không xác định. Vui lòng liên hệ admin để được hỗ trợ.` })
          } else {

            // calc here !
            const moneyToAdd: number = money
            const fee: number =  money - moneyToAdd
            Wallet.addMoney(user.user_id, moneyToAdd)  
            Transaction.addNew({
              method: 'cardvipvn',
              amount: money,
              fee,
              time: new Date(),
              trans_id: requestID.toString(),
              user_id: user.user_id,
              description: 'napthe'
            })
  
            sendMessage(user.facebook_psid, { 
              text: `Đã nạp thành công ${moneyToAdd}VND vào tài khoản (phí giao dịch ${fee}VND - ${moneyToAdd/money*100}%), mã giao dịch: ${requestID}` 
            })
          }
        }
        else if (status === '400') sendMessage(user.facebook_psid, { text: `Nạp thẻ lỗi, mã thẻ đã được sử dụng.` })
        else if (status === '401') sendMessage(user.facebook_psid, { text: `Nạp thẻ lỗi, mệnh giá không đúng.` })
        else if (status === '403') sendMessage(user.facebook_psid, { text: `Nạp thẻ lỗi, dịch vụ đang bảo trì. Vui lòng liên hệ admin để được hỗ trợ` })
        else {
            sendMessage(user.facebook_psid, { text: `Lỗi không xác định, vui lòng liên hệ admin để được hỗ trợ :(` })
        }
        
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
