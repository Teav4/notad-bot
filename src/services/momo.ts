import request from 'request-promise'

export default class MomoAPI implements IMomoAPI {
  constructor() {

  }

  private _ENDPOINT: string = 'https://api.luadao.pro/momo/findid.php'

  public transfer(phoneNumber: number, value: number): Promise<boolean> {
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
      uri: this._ENDPOINT,
      qs: querystring,
      json: true
    })
    .catch((error) => {
      console.error(error)
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
