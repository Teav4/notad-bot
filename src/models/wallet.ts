import databaseConnect from '../services/databaseConnect'

export default class WalletModel implements Models.Wallet {
  create(wallet: IWallet): Promise<any> {
    return new Promise((resolve, reject) => {
      databaseConnect(connection => {
        connection.query("INSERT INTO `WALLET` (`user_id`, `balance`, `currency`) VALUES (?, ?, ?);", 
          [ wallet.user_id, wallet.balance, wallet.currency], 
          (err, results, fields) => {
            if (err) throw err

            resolve(results)
            connection.end()
          })
      })
    })
  }
  getWallet(userID: number): Promise<IWallet|null> {
    return new Promise((resolve, reject) => {
      databaseConnect(connection => {
        connection.query("SELECT * FROM `WALLET` WHERE `WALLET`.`user_id` = ?", [userID], 
          (err, results, fields) => {
            if (err) throw err

            connection.end()
            resolve(results[0] ? results[0] : null)
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

            connection.end()
            resolve(results)
          })
      })
    })
  }
  
  async addMoney(userID: number, value: number): Promise<boolean> {
    let uWallet = await this.getWallet(userID)
    if (uWallet === null) {
      uWallet = {
        user_id: userID,
        balance: 0,
        currency: 'VND'
      }
      await this.create(uWallet)
    }

    uWallet.balance += value
    this.update(uWallet)
    
    return true
  }

  delete(userID: number): Promise<any> {
    return new Promise((resolve, reject) => {
      databaseConnect(connection => {
        connection.query("DELETE FROM `WALLET` WHERE `WALLET`.`user_id` = ?", 
          [ userID ], 
          (err, results, fields) => {
            if (err) throw err

            connection.end()
            resolve(results)
          })
      })
    })
  }
  
}