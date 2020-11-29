export function createQuickReplyText(title: string, imageUrl?: string): Messenger.Template.QuickReplyText {
  let response: Messenger.Template.QuickReplyText = {
    content_type: "text",
    payload: '<POSTBACK_PAYLOAD>',
    title,
  }

  if (imageUrl !== undefined) {
    response = Object.assign({ image_url: imageUrl }, response)
  }

  return response
}

/**
 * FIX ME
 * https://developers.facebook.com/docs/messenger-platform/send-messages/quick-replies
 */
export function createQuickReplyPhoneNumber(phoneNumber: number): Messenger.Template.QuickReplyPhoneNumber {
  return {
    content_type: 'phone_number',
    payload: phoneNumber.toString()
  }
}
