import request from 'request-promise'
import config from '../config'

export default class MessengerAPI implements IMessengerAPI {

  private API_ENDPOINT: string = "https://graph.facebook.com/"

  async getPersonProfile(userPSID: string): Promise<IPersonProfile|null> {
    const requestUrl: string = this.API_ENDPOINT + userPSID
    const resp = await request.get({
      uri: requestUrl,
      qs: {
        fields: "first_name,last_name,profile_pic",
        access_token: config.page.access_token
      },
      json: true
    })
    
    if (resp === {}) {
      return null
    }
    
    return {
      firstName: resp.first_name,
      lastName: resp.last_name,
      avatarUrl: resp.profile_pic,
      locale: resp.locale,
      timezone: resp.timezone,
      gender: resp.gender
    }
  }
  
}