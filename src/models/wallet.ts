import databaseConnect from '../services/databaseConnect'

export default class WalletModel implements Models.Wallet {
  create(userID: number): Promise<any> {
    return new Promise((resolve, reject) => {
      databaseConnect(connection => {
        connection.query("INSERT INTO `WALLET` (`user_id`, `balance`, `currency`) VALUES (?, ?, ?);", 
          [ userID, 0, 0], 
          (err, results, fields) => {
            if (err) throw err

            resolve(results)
            connection.end()
          })
      })
    })
  }
  update(wallet: IWallet): Promise<any> {
    return new Promise((resolve, reject) => {
      databaseConnect(connection => {
        connection.query("UPDATE `WALLET` SET `user_id` = ?, `balance` = ?, `currency` = ? WHERE `WALLET`.`user_id` = ?;", 
          [ wallet.user_id, wallet.balance, wallet.currency, wallet.user_id ], 
          (err, results, fields) => {
            if (err) throw err

            resolve(results)
            connection.end()
          })
      })
    })
  }
  delete(userID: number): Promise<any> {
    return new Promise((resolve, reject) => {
      databaseConnect(connection => {
        connection.query("DELETE FROM `WALLET` WHERE `WALLET`.`user_id` = ?", 
          [ userID ], 
          (err, results, fields) => {
            if (err) throw err

            resolve(results)
            connection.end()
          })
      })
    })
  }
  
}