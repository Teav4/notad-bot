import databaseConnect from '../services/databaseConnect'

export default class TransactionModel implements Models.Transaction {

  findByID(method: string, transactionID: string): Promise<ITransaction> {
    return new Promise((resolve, reject) => {
      databaseConnect(connection => {
        connection.query("SELECT * FROM `TRANSACTION` WHERE `TRANSACTION`.`trans_id` = ? AND `TRANSACTION`.`method` = ?", [transactionID, method], 
          (err, results, fields) => {
            if (err) throw err

            resolve(results[0] ? results[0] : null)
          })
      })
    })
  }

  addNew(transaction: ITransaction): Promise<any> {
    return new Promise((resolve, reject) => {
      databaseConnect(connection => {
        connection.query("INSERT INTO `TRANSACTION` (`id`, `user_id`, `amount`, `fee`, `time`, `description`, `method`, `trans_id`) VALUES (?, ?, ?, ?, ?, ?, ?, ?);", 
          [null, transaction.user_id, transaction.amount, transaction.fee, transaction.time, transaction.description, transaction.method, transaction.trans_id ]
        , (err, results, fields) => {
          if (err) throw err
          
          resolve(results)
        })
      })
    })
  }
}
