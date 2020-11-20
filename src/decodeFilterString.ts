const ESCAPE_SYMBOL = '\\'
const TUPLE_DELIMITER = ','
const ARRAY_DELIMITER = ';'

function decodeParts(val: string, delimeter: string) {
  if (typeof val !== 'string') {
    throw new Error('decodeParts: value is not string')
  }

  let pos = 0

  const result = []

  let part = ''

  while (pos < val.length) {
    if (val[pos] === ESCAPE_SYMBOL) {
      part += val[pos + 1]
      pos += 2
    } else if (val[pos] === delimeter) {
      result.push(part)
      part = ''
      pos++
    } else {
      part += val[pos]
      pos++
    }
  }

  result.push(part)

  return result
}

export function decodeTuple(val: string) {
  return decodeParts(val, TUPLE_DELIMITER)
}

export function decodeArray(val: string) {
  if (!val || val[0] !== '[' || val[val.length - 1] !== ']') {
    throw new Error('parseArray: Значение не похоже на массив')
  }

  return decodeParts(val.slice(1, -1), ARRAY_DELIMITER)
}
