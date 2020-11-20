import databaseConnect from "../services/databaseConnect";

export default class UserModel implements Models.User {

  public addUser(user: IUser): Promise<any> {
    return new Promise((resolve, reject) => {
      databaseConnect(connection => {
        connection.query("INSERT INTO `USER` (`ID`, `user_id`, `facebook_psid`, `name`, `avatar`, `roler`) VALUES (?, ?, ?, ?, ?, ?); ", 
          [ null, user.user_id, user.facebook_psid, user.name, user.avatar, user.role ]
        ,(err, results, fields) => {
          if (err) throw err
          
          // connection.end()
          resolve(results)
        })
      })
    })
  }

  public findByID(userID: number): Promise<IUser|null> {
    return new Promise((resolve, reject) => {
      databaseConnect(connection => {
        connection.query("SELECT * FROM `USER` WHERE `USER`.`user_id` = ?", [userID],
          (err, results, fields) => {
            if (err) throw err

            // connection.end()
            resolve(results[0] ? results[0] : null)
          })
      })
    })
  }

  public findByFacebookPSID(facebookPSID: string): Promise<IUser|null> {
    return new Promise((resolve, reject) => {
      databaseConnect(connection => {
        connection.query("SELECT * FROM `USER` WHERE `USER`.`facebook_psid` = ?", [facebookPSID],
          (err, results, fields) => {
            if (err) throw err

            // connection.end()
            resolve(results[0] ? results[0] : null)
          })
      })
    })
  }
  public removeUser() {

  }
}
