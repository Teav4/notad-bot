import config from '../config'
import request from 'request'

export default class CardVipVN implements ICardVipVNAPI {
    private _apikey: string

    private _SEND_URL = 'http://partner.cardvip.vn/api/createExchange'

    constructor(apikey: string) {
        this._apikey = apikey
    }

    private headers: request.Headers = {
        'Content-Type': 'application/json' 
    }
    
    public Add(cardData: ICardVipVN.CardInfo): Promise<any> {
        
        const requestOptions: request.Options = {
            uri: this._SEND_URL,
            headers: this.headers,
            body: JSON.stringify({
                APIKey : this._apikey,
                NetworkCode: cardData.network,
                PricesExchange: cardData.price,
                NumberCard: cardData.privateCode,
                SeriCard: cardData.cardSeries,
                IsFast: cardData.isFast,
                RequestId: cardData.requestID
            })
        }
        
        return new Promise((resolve, reject) => {
            request.post(requestOptions, (err, response, body) => {
                if (err) throw err
                console.log(body)
                resolve(body)
            })
        })
    }
    
    public getExchangeRate(): Promise<IThesieureAPI.getExchangeRateResult> {
        return new Promise((resolve, reject) => {
            request('https://thesieure.com/chargingws/price?partner_id=' + config.thesieure.partner_id, (err, response, body) => {
                if (err) throw err

                if (response.statusCode === 200) {
                    const result = JSON.parse(body)
                    resolve(result)
                }
                else {
                    reject(response.statusCode)
                }
            })
        })
    }
}