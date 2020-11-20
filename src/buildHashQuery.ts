import 'ts-replace-all'

function encodeHashQueryComponent(component: string) {
  return encodeURI(component.replaceAll(/\\/g, '\\\\'))
    .replaceAll('&', '%5C&')
    .replaceAll('\\', '%5C')
    .replaceAll('#', '%23')

  // TODO сделать по стандарту? Какой стандарт?
  // Минимальная кодировка как Google Chrome
  //
  // .replaceAll('%2B', '+')
  //
  // .replaceAll(' ', '%20')
}

export function buildHashQuery(queryParts: Record<string, string | null>) {
  const query = Object.keys(queryParts)
    .filter(key => queryParts[key] !== undefined)
    .map(key => {
      const part = queryParts[key]

      const value = part !== null ? part : ''

      return `${key}=${encodeHashQueryComponent(value)}`
    })
    .join('&')

  return query
}
