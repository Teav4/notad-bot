import databaseConnect from '../services/databaseConnect'

export default class TransactionModel implements Models.Transaction {

  findByID(transactionID: number): Promise<ITransaction> {
    return new Promise((resolve, reject) => {
      databaseConnect(connection => {
        connection.query("SELECT * FROM `TRANSACTION` WHERE `TRANSACTION`.`id` = ?", [transactionID], 
          (err, results, fields) => {
            if (err) throw err

            resolve(results)
            connection.end()
          })
      })
    })
  }

  addNew(transaction: ITransaction): Promise<any> {
    return new Promise((resolve, reject) => {
      databaseConnect(connection => {
        connection.query("INSERT INTO `TRANSACTION` (`id`, `user_id`, `amount`, `fee`, `time`, `description`) VALUES (?, ?, ?, ?, ?, ?);", 
          [null, transaction.user_id, transaction.amount, transaction.fee, transaction.time, transaction.description ]
        , (err, results, fields) => {
          if (err) throw err
          
          resolve(results)
          connection.end()
        })
      })
    })
  } 
}
