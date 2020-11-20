export function assertOk(val: boolean, msg: string) {
  if (!val) {
    throw new Error(msg)
  }
}

export function assertEqual<T>(actual: T, expected: T, msg: string) {
  if (actual !== expected) {
    throw new Error(msg + ` (expected ${expected} but got ${actual})`)
  }
}
