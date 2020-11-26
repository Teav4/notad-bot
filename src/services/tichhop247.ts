import request from 'request'
import qs from 'qs'

export default class Tichhop247 implements ITichhop247 {
  private _apikey: string;

  private _SEND_ENDPOINT = 'http://tichhop247.com/API/NapThe'
  private _CHECK_ENDPOINT = 'http://tichhop247.com/API/TrangThai'
  private _CALLBACK_URL = 'https://whfb.luadao.pro/tichhop247'

  constructor(apikey: string) {
    
    this._apikey = apikey
  }

  private sendGET(type: 'SEND' | 'CHECK', data: any): Promise<any> {
    const headers: request.Headers = {
      'Content-Type': 'application/json' 
    }

    const otps: request.OptionsWithUri = {
      uri: (type === 'SEND') ? this._SEND_ENDPOINT : this._CHECK_ENDPOINT,
      method: 'GET',
      qs: Object.assign({ APIKey: this._apikey }, data),
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
      Code: 1 | 0
      Message: 'Đã nhận thẻ' | 'TrxID đã tồn tại'
    }
    console.log({
      Network: network,
      CardCode: privateCode,
      CardSeri: series,
      CardValue: value,
      URLCallback: this._CALLBACK_URL,
      TrxID: transactionID,
    })
    const resp: _IResponse = await this.sendGET('SEND',{
      Network: network,
      CardCode: privateCode,
      CardSeri: series,
      CardValue: value,
      URLCallback: this._CALLBACK_URL,
      TrxID: transactionID,
    })

    if (resp.Code === 0) {
      console.error(new Error(resp.Message))
      return false
    }
    
    return true
  }

  public async CheckStatus(transactionID: string): Promise<ICardCheckStatus> {
    const resp: ICardCheckStatus = await this.sendGET('CHECK', {
      TrxID: transactionID,
    })

    return resp
  }

}
