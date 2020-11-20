import { parseHash, Hash } from './parseHash'
import { parseHashQuery } from './parseHashQuery'

// https://regex101.com/r/WZzjbn/3
const URL_REGEX = /(?<proto>http|https):\/\/(?<endpoint>[\w.]+)\/(?<path>[\w/]+)(?<query>\?.+)?(?<hash>#.+)?$/

export interface MoyskladUrl {
  endpoint: string
  path: string[]
  query?: Record<string, string | null>
  hash: Hash
}

export function parseUrl(url: string): MoyskladUrl {
  // TODO Возможно, предварительно пропускать ссылку через модуль URL
  const match = URL_REGEX.exec(url)

  const proto = match?.groups?.proto
  if (proto !== 'https') {
    throw new Error('В ссылке должен быть указан https протокол')
  }

  const endpoint = match?.groups?.endpoint
  const path = match?.groups?.path
  const query = match?.groups?.query
  const hash = match?.groups?.hash

  if (!endpoint || !path) {
    throw new Error(`Ошибка разбора url - ${url}`)
  }

  const result: MoyskladUrl = {
    endpoint,
    path: path.split('/').filter(it => it),
    hash: parseHash(hash ?? '#')
  }

  if (query) result.query = parseHashQuery(query)

  return result
}
