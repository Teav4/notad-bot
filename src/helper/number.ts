export function isNumberic(num: string) {
  if (typeof num != "string") return false // we only process strings!  
  // @ts-ignore
  return !isNaN(num) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
         !isNaN(parseFloat(num)) // ...and ensure strings of whitespace fail
}
