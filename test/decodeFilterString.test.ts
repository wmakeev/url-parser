import test from 'blue-tape'

import { decodeTuple, decodeArray } from '../src/decodeFilterString'
import { parseUrl } from '../src/parseUrl'

test('decode', t => {
  const url =
    'https://online.moysklad.ru/app/#customerorder?global_agentSourceFilter=%5B9a7116ad-ba84-11e2-a39e-001b21d91495%5C%5C,%5Bbar%5D%20%5B%5C%5C%5C%5C%5C%5C%5C%5C%5C%5C,%5D%20%5B%5C%5C%5C%5C;%5D%20%5B%5C%5C%5C%5C%5C%5C%5C%5C%5C%5C%5C%5C%5C%5C%5C%5C%5D%5C%5C,3192%5C%5C,Company;f3eb7413-f31c-11e3-73b8-002590a28eca%5C%5C,Test%20(2)%5C%5C,4027%5C%5C,Company%5D,equals'

  const result = parseUrl(url)

  const agentSourceFilter = result.hash.query?.global_agentSourceFilter

  t.equals(
    agentSourceFilter,
    '[9a7116ad-ba84-11e2-a39e-001b21d91495\\,[bar] [\\\\\\\\\\,] [\\\\;] [\\\\\\\\\\\\\\\\]\\,3192\\,Company;f3eb7413-f31c-11e3-73b8-002590a28eca\\,Test (2)\\,4027\\,Company],equals',
    'should parse url global_agentSourceFilter part'
  )

  const tmp1 = decodeTuple(agentSourceFilter!)

  t.equals(
    tmp1[0],
    '[9a7116ad-ba84-11e2-a39e-001b21d91495,[bar] [\\\\,] [\\;] [\\\\\\\\],3192,Company;f3eb7413-f31c-11e3-73b8-002590a28eca,Test (2),4027,Company]',
    'should parse agents array string'
  )

  t.equals(tmp1[1], 'equals', 'should parse filter mode')

  const tmp2 = decodeArray(tmp1[0])

  t.equals(
    tmp2[0],
    '9a7116ad-ba84-11e2-a39e-001b21d91495,[bar] [\\,] [;] [\\\\],3192,Company',
    'should decode array'
  )

  const tmp3 = decodeTuple(tmp2[0])

  t.deepEqual(
    tmp3,
    [
      '9a7116ad-ba84-11e2-a39e-001b21d91495',
      '[bar] [,] [;] [\\]',
      '3192',
      'Company'
    ],
    'should decode agent tuple'
  )

  t.end()
})
