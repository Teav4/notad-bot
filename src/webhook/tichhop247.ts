import { Request, Response } from 'express'

export default function(req: Request, res: Response): void {
  const status = req.query['Code']
  const mess = req.query['Mess']
  const reason = req.query['Reason']
  const value = req.query['CardValue']
  const transID = req.query['TrxID']
  
  if (status && mess && reason && value && transID) {
    console.log('success', { status, mess, reason, value, transID })
    
    
    res.status(200).send()
    return
  }

  console.log('failed', { status, mess, reason, value, transID })

  res.status(400).send()
  return
}
