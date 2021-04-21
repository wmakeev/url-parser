import test from 'blue-tape'

import { parseUrl } from '../src/parseUrl'

test('parseUrl #1', t => {
  const url =
    "https://online.moysklad.ru/app/#customerorder?global_periodFilter=01.10.2020%2000:00:00,31.10.2020%2023:59:59,inside_period,PRESETS,MONTH,0&global_customerOrderShippingStatusFilter=shipped,&global_agentSourceFilter=%5B69a1f634-69c0-11e3-6cd1-7054d21a8d1e%5C%5C,%5Bfoo%5D%20slash%5B%5C%5C%5C%5C%5C%5C%5C%5C%5C%5C%5C%5C%5C%5C%5C%5C%5D%20coma%5B%5C%5C%5C%5C%5C%5C%5C%5C%5C%5C,%5D%20semi%5B%5C%5C%5C%5C;%5D%20amp%5B%5C&%5D%20plus%5B+%5D%20sym%5B%C2%A7%C2%B1!@%23$%25%5E*()_-=%7C'%22:%7B%7D%3C%3E.%60~?/%5D%20%7C%20%5D%20%5B%5C%5C,3670%5C%5C,Company;dc2e1bcd-50c0-11ea-0a80-06820016bf88%5C%5C,%D0%9C%D0%B0%D0%BA%D0%B5%D0%B5%D0%B2%20%D0%92%D0%B8%D1%82%D0%B0%D0%BB%D0%B8%D0%B9%20(mvv)%5C%5C,_mvv%5C%5C,Company%5D,equals&global_operationPublishedFilter=0"

  const result = parseUrl(url)

  t.equals(result.endpoint, 'online.moysklad.ru')
  t.deepEqual(result.path, ['app'])
  t.deepEqual(result.hash.path, ['customerorder'])
  t.deepEqual(Object.keys(result.hash.query!), [
    'global_periodFilter',
    'global_customerOrderShippingStatusFilter',
    'global_agentSourceFilter',
    'global_operationPublishedFilter'
  ])

  t.equals(
    result.hash.query?.global_agentSourceFilter,
    '[69a1f634-69c0-11e3-6cd1-7054d21a8d1e\\,[foo] slash[\\\\\\\\\\\\\\\\] coma[\\\\\\\\\\,] semi[\\\\;] amp[&] plus[+] sym[§±!@#$%^*()_-=|\'":{}<>.`~?/] | ] [\\,3670\\,Company;dc2e1bcd-50c0-11ea-0a80-06820016bf88\\,Макеев Виталий (mvv)\\,_mvv\\,Company],equals'
  )

  t.end()
})

test('parseUrl #2', t => {
  const url =
    'https://online.moysklad.ru/app/#demand/edit?id=537ea222-7be8-11eb-0a80-02ed00032e68'

  const result = parseUrl(url)

  t.equals(result.endpoint, 'online.moysklad.ru')
  t.deepEqual(result.path, ['app'])
  t.deepEqual(result.hash.path, ['demand', 'edit'])
  t.deepEqual(Object.keys(result.hash.query!), ['id'])

  t.end()
})
