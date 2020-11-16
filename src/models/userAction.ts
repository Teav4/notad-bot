import databaseConnect from '../services/databaseConnect'

export default class UserActionModel implements Models.UserAction {
  
  addNew(action: IUserAction): Promise<any> {
    const actionData: string = JSON.stringify(action.data)

    return new Promise((resolve, reject) => {
      databaseConnect(connection => {
        connection.query("INSERT INTO `USER_ACTIONS` (`ID`, `user_id`, `action_name`, `data`) VALUES (?,?,?,?);", 
        [ null, action.user_id, action.action_name, actionData],
        (err, result, fields) => {
          if (err) throw err

          resolve(result)
          connection.end()
        })
      })
    })
  }

  findByID(actionID: number): Promise<IUserAction[]|undefined> {
    return new Promise((resolve, reject) => {
      databaseConnect(connection => {
        connection.query("SELECT * FROM `USER_ACTIONS` WHERE `USER_ACTIONS`.`ID` = ?", [actionID], 
          (err, results, fields) => {
            if (err) throw err

            resolve(results)
            connection.end()
          })
      })
    })
  }

  findByUserID(userID: number): Promise<IUserAction[]|undefined> {
    return new Promise((resolve, reject) => {
      databaseConnect(connection => {
        connection.query("SELECT * FROM `USER_ACTIONS` WHERE `USER_ACTIONS`.`user_id` = ?", [userID], 
          (err, results, fields) => {
            if (err) throw err

            resolve(results)
            connection.end()
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
            connection.end()
          })
      })
    })
  }
  
}