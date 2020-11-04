import request from 'request'
import qs from 'qs'

export default class Tichhop247 implements ITichhop247 {
  private _apikey: string;

  private _ENDPOINT = 'http://tichhop247.com/API/NapThe'
  private _CALLBACK_URL = 'https://google.com'

  constructor(apikey: string) {
    
    this._apikey = apikey
  }

  private sendGET(data: any): Promise<any> {
    const headers: request.Headers = {
      'Content-Type': 'application/json' 
    }

    const otps: request.OptionsWithUri = {
      uri: this._ENDPOINT,
      method: 'GET',
      body: qs.stringify(Object.assign({ APIKey: this._apikey }, data)),
      json: true
    }

    return new Promise ((resolve, reject) => {
      request(otps, (err, response, body) => {
        
        if (err) {
          console.error('[tichhop247] ' + err)
          reject()
        }

        if (response.statusCode !== 200) {
          console.error('[tichhop247] Request error with status code ' + response.statusCode)
          reject()
        }
        
        resolve(body)
      })    
    })
  }

  public async Add(network: ICardNetWorkType, privateCode: string, series: string, value: number, transactionID: string): Promise<boolean> {
    interface _IResponse { 
      Code: '1. Là hệ thống đã nhận thẻ' | '0. Lỗi, hệ thống từ chối thẻ này ' 
    }

    const resp: _IResponse = await this.sendGET({
      Network: network,
      CardCode: privateCode,
      CardSeri: series,
      CardValue: value,
      URLCallback: this._CALLBACK_URL,
      TrxID: transactionID,
    })

    console.log(resp)

    return resp.Code === '1. Là hệ thống đã nhận thẻ'
  }

  public async CheckStatus(transactionID: string): Promise<ICardCheckStatus> {
    const resp: ICardCheckStatus = await this.sendGET({
      TrxID: transactionID,
    })

    console.log(resp)
    return resp
  }

}
