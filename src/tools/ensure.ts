export function ensureExist<T>(val: T | null | undefined, msg: string): T {
  if (val !== null && val !== undefined) {
    return val
  } else {
    throw new Error(msg)
  }
}
