/* eslint @typescript-eslint/no-explicit-any:0 */

export function parseEnum<T>(enumName: string, enumObj: any, val: string): T {
  if (typeof enumObj !== 'object') {
    throw new Error('Enum should to be object')
  }

  const hasValue = Object.keys(enumObj).some(k => enumObj[k] === val)

  if (hasValue) {
    return (val as any) as T
  } else {
    throw new Error(`"${val}" - is not ${enumName} enum value`)
  }
}
