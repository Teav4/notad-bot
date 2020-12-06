import databaseConnect from "../services/databaseConnect";
import MessengerAPIService from '../services/messengerAPI'
import { randomBetween } from '../helper/number'

const MessengerAPI = new MessengerAPIService()

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

  async createNew(facebookPSID: string): Promise<IUser|null> {
    const userProfileResponse = await MessengerAPI.getPersonProfile(facebookPSID)

    if (userProfileResponse === null) {
      return null
    }

    // check exist
    const _user = await this.findByFacebookPSID(facebookPSID)
    if (_user !== null) {
      return _user
    }

    const user: IUser = {
      facebook_psid: facebookPSID,
      name: `${userProfileResponse.firstName} ${userProfileResponse.lastName}`,
      avatar: userProfileResponse.avatarUrl,
      role: 'user',
      user_id: randomBetween(1, 999999)
    }
    this.addUser(user)
    
    return user
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
