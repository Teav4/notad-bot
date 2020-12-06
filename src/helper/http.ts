export function isUrl(url: string):boolean {
  if (url.indexOf('http://') === 0 || url.indexOf('https://') === 0) {
    return true
  }

  return false
}
