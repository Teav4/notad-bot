import request from 'request'
import qs from 'qs'

export default class CardVipVN implements ICardVipVNAPI {
    private _apikey: string

    private _SEND_URL = 'http://partner.cardvip.vn/api/createExchange'

    constructor(apikey: string) {
        this._apikey = apikey
    }

    private headers: request.Headers = {
        'Content-Type': 'application/json' 
    }
    
    Add(network: string, price: number, privateCode: string, cardSeries: string, isFast: boolean, requestID: string): Promise<any> {
        
        const requestOptions: request.Options = {
            uri: this._SEND_URL,
            headers: this.headers,
            body: qs.stringify({
                APIKey : this._apikey,
                NetworkCode: network,
                PricesExchange: price,
                NumberCard: privateCode,
                SeriCard: cardSeries,
                IsFast: isFast,
                RequestId: requestID
            })
        }
        
        return new Promise((resolve, reject) => {
            request.post(requestOptions, (err, response, body) => {
                if (err) throw err

                resolve(body)
            })
        })
    }
    
}