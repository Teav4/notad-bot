import databaseConnect from '../services/databaseConnect'

export default class UserActionModel implements Models.UserAction {
  
  addNew(action: IUserAction): Promise<any> {
    const actionData: string = JSON.stringify(action.data)

    return new Promise((resolve, reject) => {
      databaseConnect(connection => {
        connection.query("INSERT INTO `USER_ACTIONS` (`ID`, `user_id`, `action_name`, `data`, `last_update`) VALUES (?,?,?,?,?);", 
        [ null, action.user_id, action.action_name, actionData, Date.now()],
        (err, result, fields) => {
          if (err) throw err

          resolve(result)
          // connection.end()
        })
      })
    })
  }

  findByID(actionID: number): Promise<IUserAction[]|null> {
    return new Promise((resolve, reject) => {
      databaseConnect(connection => {
        connection.query("SELECT * FROM `USER_ACTIONS` WHERE `USER_ACTIONS`.`ID` = ?", [actionID], 
          (err, results, fields) => {
            if (err) throw err

            if (results.length === 0) resolve(null)
            else resolve(results)
            // connection.end()
          })
      })
    })
  }

  findByUserID(userID: number): Promise<IUserAction[]|null> {
    return new Promise((resolve, reject) => {
      databaseConnect(connection => {
        connection.query("SELECT * FROM `USER_ACTIONS` WHERE `USER_ACTIONS`.`user_id` = ?", [userID], 
          (err, results, fields) => {
            if (err) throw err

            if (results.length === 0) resolve(null)
            else resolve(results)
            // connection.end()
          })
      })
    })
  }

  findByDataString(data: string): Promise<IUserAction[]|null> {
    return new Promise((resolve, reject) => {
      databaseConnect(connection => {
        connection.query("SELECT * FROM `USER_ACTIONS` WHERE `USER_ACTIONS`.`data` = ?", [data], 
          (err, results, fields) => {
            if (err) throw err

            if (results.length === 0) resolve(null)
            else resolve(results)
            // connection.end()
          })
      })
    })
  }

  updateDataByUserID(userID: number, data: any): Promise<any> {
    const jsonData = JSON.stringify(data)
    console.log(jsonData)
    return new Promise((resolve, reject) => {
      databaseConnect(connection => {
        connection.query("UPDATE `USER_ACTIONS` SET `data` = ?, `last_update` = ? WHERE `USER_ACTIONS`.`user_id` = ?", 
          [ jsonData, Date.now(), userID ], 
          (err, results, fields) => {
            if (err) throw err

            // connection.end()
            resolve(results)
          })
      })
    })
  }

  deleteByUserID(userID: number): Promise<any> {
    return new Promise((resolve, reject) => {
      databaseConnect(connection => {
        connection.query("DELETE FROM `USER_ACTIONS` WHERE `USER_ACTIONS`.`user_id` = ?", [userID], 
          (err, results, fields) => {
            if (err) throw err

            resolve(results)
            // connection.end()
          })
      })
    })
  }

  deleteByID(actionID: number): Promise<any> {
    return new Promise((resolve, reject) => {
      databaseConnect(connection => {
        connection.query("DELETE FROM `USER_ACTIONS` WHERE `USER_ACTIONS`.`ID` = ?", [actionID], 
          (err, results, fields) => {
            if (err) throw err

            resolve(results)
            // connection.end()
          })
      })
    })
  }
  
}