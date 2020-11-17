import databaseConnect from "../services/databaseConnect";

export default class UserModel implements Models.User {

  public addUser(user: IUser): Promise<any> {
    return new Promise((resolve, reject) => {
      databaseConnect(connection => {
        connection.query("INSERT INTO `USER` (`ID`, `user_id`, `name`, `avatar`, `roler`) VALUES (?, ?, ?, ?); ", 
          [ null, user.user_id, user.name, user.avatar, user.role ]
        ,(err, results, fields) => {
          if (err) throw err
          
          resolve(results)
          connection.end()
        })
      })
    })
  }

  public findByID(userID: number): Promise<IUser> {
    return new Promise((resolve, reject) => {
      databaseConnect(connection => {
        connection.query("SELECT * FROM `USER` WHERE `USER`.`user_id` = ?", [userID], 
          (err, results, fields) => {
            if (err) throw err

            resolve(results)
            connection.end()
          })
      })
    })
  }

  public removeUser() {

  }
}
