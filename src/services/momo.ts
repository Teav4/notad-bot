import request from 'request-promise'
import { isNumberic } from '../helper/number'

export default class MomoAPI implements IMomoAPI {
  constructor() {

  }

  private _CHECK_TRANS_ENDPOINT: string = 'https://api.luadao.pro/momo/findid.php'
  private _TRANSFER_MOMO_ENDPOINT: string = 'https://api.luadao.pro/momo/sendmoney.php'
  private _TRANSFER_MOMO_KEY: string = 'notad'

  public async transferToMomo(phone: string, value: number, name: string, desc: string): Promise<boolean> {
    
    if (!isNumberic(phone)) {
      console.error('phone is not a number' + phone)
      return false
    }
    
    const querystring: object = {
      apikey: this._TRANSFER_MOMO_KEY,
      sdtrut: phone,
      tienrut: value,
      tinnhatrut: desc,
      tenrut: name,
    }

    const resp = await request({
      method: 'GET',
      uri: this._TRANSFER_MOMO_ENDPOINT,
      qs: querystring,
    })
    .catch((err) => {
      console.error(new Error(err))
    })

    if (resp === 'Api Key Sai') {
      return false
    }
    
    const transferRes: IMomoTransferResponse = JSON.parse(resp)
    if (transferRes.result === true) {
      return true
    }

    return false
  }

  public async withdrawal(value: number, desc: string, phone: number, name?: string): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
  
  public listAll(): void {
    throw new Error('Method not implemented.');
  }

  public async checkTransaction(transactionID: number): Promise<IMomoTransaction | null> {
    
    const querystring: object = {
      tranid: transactionID
    }

    const resp: any = await request ({
      method: 'GET',
      uri: this._CHECK_TRANS_ENDPOINT,
      qs: querystring,
      json: true
    })
    .catch((err) => {
      console.error(new Error(err))
    })

    if (resp.name === undefined || resp.sdt === undefined) {
      return null
    }

    const trans: IMomoTransaction = {
      transactionID: resp.tranid,
      phone: resp.sdt,
      name: resp.name,
      amount: resp.amount,
      comment: resp.comment,
      time: resp.time,
    }

    return trans
  }
}
