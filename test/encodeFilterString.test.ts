import test from 'blue-tape'

import { encodeTuple, encodeArray } from '../src/encodeFilterString'

test('encode', t => {
  const agentTuple = [
    '9a7116ad-ba84-11e2-a39e-001b21d91495',
    '[bar] [,] [;] [\\]',
    '3192',
    'Company'
  ]

  const tmp1 = encodeTuple(agentTuple)

  t.equals(
    tmp1,
    '9a7116ad-ba84-11e2-a39e-001b21d91495,[bar] [\\,] [;] [\\\\],3192,Company',
    'should decode agent tuple'
  )

  const tmp2 = encodeArray([tmp1, tmp1])

  const encodedAgent =
    '9a7116ad-ba84-11e2-a39e-001b21d91495,[bar] [\\\\,] [\\;] [\\\\\\\\],3192,Company'

  t.equals(tmp2, `[${encodedAgent};${encodedAgent}]`, 'should encode array')

  const tmp3 = encodeTuple([tmp2, 'equals'])

  t.equals(
    tmp3,
    '[9a7116ad-ba84-11e2-a39e-001b21d91495\\,[bar] [\\\\\\\\\\,] [\\\\;] [\\\\\\\\\\\\\\\\]\\,3192\\,Company;9a7116ad-ba84-11e2-a39e-001b21d91495\\,[bar] [\\\\\\\\\\,] [\\\\;] [\\\\\\\\\\\\\\\\]\\,3192\\,Company],equals',
    'should encode complex tuple'
  )

  t.end()
})
