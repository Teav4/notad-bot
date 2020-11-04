declare type IsenderPSID = string 

declare interface IWebhookMessage {
  mid: string,
  is_echo: true,
  text: string,
  attachments: [
    {
      payload: {
        url: string
      }
    }
  ]
}

declare interface IWebhookMessageEvent {
  object : string,
  entry: [
    {
      id: string,
      time: number,
      messaging: [
        {
          sender: {
            id: IsenderPSID
          },
          recipient:{
            id: string
          },
          timestamp: number,
          message: IWebhookMessage,
          postback: any
        }
      ]
    }
  ]
}

declare interface IResponseMessage {
  text?: string,
  attachment?: {
    type: 'template',
    payload: {
      template_type: 'generic',
      elements: Array<{
        title: string,
        subtitle: string,
        image_url: string,
        buttons: Array<{
          type: 'postback',
          title: string,
          payload: 'yes' | 'no',
        }>
      }>
    }
  }
}

// MODELS
declare interface IUser {
  id: number,
  name: string,
  avatar: string,
  role: string,
}
declare interface IWallet {
  user_id: number,
  balance: number,
  currency: number,
}
declare interface ITransaction {
  id: number,
  user_id: number,
  amount: number,
  fee: number,
  time: Date,
  description: number,
}

// TICH HOP 247

declare type ICardNetWorkType = 'VTT' | 'VMS' | 'VNP' | 'VNM'
declare interface ICardCheckStatus {
  Code: '1. Thành công' | '0. Thất bại' | '99. Lỗi hệ thống',
  Message: string,
  Reason: string,
  CardValue: number,
  StageName: string,
  Stage: 1 | 2 | 3 | 5 | 99,
}

declare interface ITichhop247 {
  /**
   * Gui yeu cau nap the
   */
  Add(network: ICardNetWorkType, privateCode: string, series: string, value: number, transactionID: string): Promise<boolean>;
  
  /**
   * Kiem tra tinh trang the da nap
   */
  CheckStatus: (transactionID: string) => Promise<ICardCheckStatus>
}
