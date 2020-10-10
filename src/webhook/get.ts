import dotenv from 'dotenv'
import { Request, Response } from 'express'

// import runtime env
dotenv.config()
const { VERIFY_TOKEN } = process.env

export default function(req: Request, res: Response): void {

  const mode = req.query['hub.mode']
  const token = req.query['hub.verify_token']
  const challenge = req.query['hub.challenge']

  if (mode && token) {
    if (mode === 'subscribe' && token === VERIFY_TOKEN) {
      
      // Respond with 200 OK and challenge token from the request
      res.status(200).send(challenge);

    } else {
      // Responds with '403 Forbidden' if verify tokens do not match
      res.sendStatus(403);  
    }
  }

}
