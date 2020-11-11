import databaseConnect from "../services/databaseConnect";

export default class UserModel implements Models.User {

  public addUser(user: IUser): Promise<any> {
    return new Promise((resolve, reject) => {
      databaseConnect(connection => {
        connection.query("INSERT INTO `USER` (`ID`, `name`, `avatar`, `roler`) VALUES (?, ?, ?, ?); ", 
          [ null, user.name, user.avatar, user.role ]
        ,(err, results, fields) => {
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
