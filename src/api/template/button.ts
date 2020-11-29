export function createButton (title: string, url: string): Messenger.Template.Button {
  return {
    type: "web_url",
    title,
    url,
  }
}

export function createPhoneButton (title: string, phoneNumber: number): Messenger.Template.PhoneButton {
  return {
    type: "phone_number",
    title,
    payload: phoneNumber.toString(),
  }
}

export function createUrlButton(text: string, buttons: Messenger.Template.Button[]): any {
  return {
    type: "template",
    payload:{
      template_type: "button",
      text,
      buttons,
    }
  }
}
