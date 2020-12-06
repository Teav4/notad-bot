import request from 'request-promise'
import config from '../config'
import { isUrl } from '../helper/http'

export default class MessengerAPI implements IMessengerAPI {

  private API_ENDPOINT: string = "https://graph.facebook.com/"
  
  async getPersonProfile(userPSID: string): Promise<IPersonProfile|null> {
    const requestUrl: string = this.API_ENDPOINT + userPSID
    console.log(this.API_ENDPOINT+userPSID+"?fields=first_name,last_name,profile_pic"+"&access_token="+config.page.access_token)
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
    console.log(resp)
    return {
      firstName: resp.first_name,
      lastName: resp.last_name,
      avatarUrl: resp.profile_pic,
      locale: resp.locale,
      timezone: resp.timezone,
      gender: resp.gender
    }
  }

  async uploadMediaFile(imageUrl: string): Promise<Messenger.API.uploadMediaResponse|null> {
    if (! isUrl(imageUrl)) {
      console.log(imageUrl + " is not valid a url.")
      return null
    }

    const requestUrl = "https://graph.facebook.com/v9.0/me/message_attachments?access_token=" + config.page.access_token
    const resp = await request.post({
      headers: {
        "Content-Type": "application/json",
      },
      uri: requestUrl,
      json: true,
      form: {
        message: {
          attachment: {
            type: "image", 
            payload: {
              is_reusable: true,
              url: imageUrl
            }
          }
        },
      },
    })

    return (resp) ? { attachment_id: resp.attachment_id } : null
  }
  
}