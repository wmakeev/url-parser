function padStart(n: number) {
  return String(n).padStart(2, '0')
}

/**
 * Возвращает время в формате строки запроса в url
 *
 * @param date Дата для преобразования в строку
 * @param timezoneOffset Смещение в минутах от исходной даты (кол-во минут которые нужно добавить к указанной дате `date`, чтобы результирующая дата была в нужном часовом поясе)
 */
export function getTimeString(
  date: Date | null,
  timezoneOffset = 0
): string | '' {
  if (date === null) return ''

  const _date = new Date(+date + timezoneOffset * 60 * 1000)

  return [
    padStart(_date.getDate()),
    '.',
    padStart(_date.getMonth() + 1),
    '.',
    _date.getFullYear(),
    ' ',
    padStart(_date.getHours()),
    ':',
    padStart(_date.getMinutes()),
    ':',
    padStart(_date.getSeconds())
  ].join('')
}
