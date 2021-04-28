const FILTER_TIME_REGEX = new RegExp(
  /^(\d{2}).(\d{2}).(\d{4})\s(\d{2}):(\d{2}):(\d{2})$/
)

/**
 * Преобразует строковое значение даты в `Date`
 *
 * @param timeString Дата в формате url МойСклад
 * @param timezoneOffset Смещение часового пояса (кол-во минут которое нужно вычесть из даты указанной в url, чтобы получить локальную дату)
 * @returns
 */
export function parseTimeString(timeString: string | '', timezoneOffset = 0) {
  if (timeString === '') return null

  // 2017-04-08 13:33:00.123
  const m = FILTER_TIME_REGEX.exec(timeString)

  if (!m || m.length !== 7) {
    throw new Error(`Некорректный формат даты "${timeString}"`)
  }

  const dateExp = `${m[3]}-${m[2]}-${m[1]}T${m[4]}:${m[5]}:${m[6]}`

  const date = new Date(dateExp)

  return new Date(+date - timezoneOffset * 60 * 1000)
}
