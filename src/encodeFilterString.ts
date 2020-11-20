const ESCAPE_SYMBOL = '\\'
const TUPLE_DELIMITER = ','
const ARRAY_DELIMITER = ';'

function encodeParts(parts: string[], delimiter: string) {
  return parts
    .map(part => {
      let res = ''
      let pos = 0

      while (pos < part.length) {
        const sym = part[pos]

        res +=
          sym === ESCAPE_SYMBOL || sym === delimiter ? ESCAPE_SYMBOL + sym : sym

        pos++
      }

      return res
    })
    .join(delimiter)
}

export function encodeTuple(tuple: string[]) {
  return encodeParts(tuple, TUPLE_DELIMITER)
}

export function encodeArray(arr: string[]) {
  return `[${encodeParts(arr, ARRAY_DELIMITER)}]`
}
