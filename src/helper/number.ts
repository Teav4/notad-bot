export function isNumberic(num: string) {
  if (typeof num != "string") return false // we only process strings!  
  // @ts-ignore
  return !isNaN(num) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
         !isNaN(parseFloat(num)) // ...and ensure strings of whitespace fail
}

/**
 * Generate random number between two numbers 
 * @param min 
 * @param max 
 */
export function randomBetween(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min);  
}
