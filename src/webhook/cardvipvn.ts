import { Request, Response } from 'express'

export default async function (req: Request, res: Response): Promise<void> {
    const status = req.query['status']
    const pricesvalue = req.query['pricesvalue']
    const valueReceive = req.query['value_receive']
    const cardCode = req.query['card_code']
    const cardSeri = req.query['card_seri']
    const requestID = req.query['requestid']

    console.log({ status, pricesvalue, valueReceive, cardCode, cardSeri, requestID })
    
}
