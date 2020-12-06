declare namespace Messenger {
  export namespace Template {

    interface Attachment {
      type: "template",
      payload: ButtonMessage
    }

    interface Button {
      type: "web_url",
      url: string,
      title: string
    }
    interface PhoneButton {
      type: "phone_number",
      title: string,
      payload: string
    }
    interface ButtonMessage {
      template_type:"button",
      text: string,
      buttons: Button[]
    }
    interface QuickReplyText {
      content_type: "text",
      title: string,
      payload: "<POSTBACK_PAYLOAD>",
      image_url?: string,
    }
    interface QuickReplyPhoneNumber {
      content_type: "phone_number",
      payload: string,
    }
  }

  export namespace API {
    interface uploadMediaResponse {
      attachment_id: string,
    }
  }
}