import MessengerAPI from '../../services/messengerAPI'

const messengerAPI = new MessengerAPI()

/**
 * // FIX ME:
 * send ONLY 1 image
 * @param imageUrl string
 */
export default async function createImageMessage(imageUrl: string|string[]) {
  
  const _imageUrl = (typeof imageUrl === 'string') ? [ imageUrl ] : imageUrl
  let imageUploadResponse: Array<Messenger.API.uploadMediaResponse|null> = await Promise.all(_imageUrl.map(url => messengerAPI.uploadMediaFile(url)))

  let elements: any = []

  imageUploadResponse.forEach(image => {
    if (image !== null) {
      elements.push({
        "media_type": "image",
        "attachment_id": image.attachment_id
      })
    }
  })

  return {
    type: "template",
    payload: {
       template_type: "media",
       elements,
    }
  }

}
