import { parseHashQuery } from './parseHashQuery'

// https://regex101.com/r/uV6yS6/2
/**
 * Формат hash строки запроса
 *
 * `#[section]/[action?]?[query?]`
 *
 * `#mycompany/edit?id=5d5e7e15-7f55`
 * */
const HASH_REGEX = /#(?:([\w-]+)(?:\/(\w+))?(?:\?(.+))?)?/

export interface Hash {
  path: string[] | null
  query?: Record<string, string | null>
}

export function parseHash(hash: string): Hash {
  const match = HASH_REGEX.exec(hash)

  if (match?.length) {
    return {
      path: [match[1], match[2]].filter(it => it),
      query: parseHashQuery(match[3])
    }
  } else {
    return {
      path: null,
      query: {}
    }
  }
}
