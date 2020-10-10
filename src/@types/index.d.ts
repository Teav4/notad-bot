export type IsenderPSID = string 

export interface IWebhookMessage {
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

export interface IWebhookMessageEvent {
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

export interface IResponseMessage {
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
