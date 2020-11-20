function padStart(n: number) {
  return String(n).padStart(2, '0')
}

export function getTimeString(date: Date | null): string | '' {
  if (date === null) return ''

  return [
    padStart(date.getDate()),
    '.',
    padStart(date.getMonth() + 1),
    '.',
    date.getFullYear(),
    ' ',
    padStart(date.getHours()),
    ':',
    padStart(date.getMinutes()),
    ':',
    padStart(date.getSeconds())
  ].join('')
}
