const FILTER_TIME_REGEX = new RegExp(
  /^(\d{2}).(\d{2}).(\d{4})\s(\d{2}):(\d{2}):(\d{2})$/
)

export function parseTimeString(timeString: string | '') {
  if (timeString === '') return null

  // 2017-04-08 13:33:00.123
  const m = FILTER_TIME_REGEX.exec(timeString)

  if (!m || m.length !== 7) {
    throw new Error(`Некорректный формат даты "${timeString}"`)
  }

  const dateExp = `${m[3]}-${m[2]}-${m[1]}T${m[4]}:${m[5]}:${m[6]}`

  return new Date(dateExp)
}
