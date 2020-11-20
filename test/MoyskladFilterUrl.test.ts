import fs from 'fs'
import path from 'path'
import test from 'blue-tape'
import { URL } from 'url'
import { AgentFilter } from '../src/filters/AgentFilter'
import { FilterParameter } from '../src/filters/FilterParameter'
import { MultiselectFilterMode } from '../src/filters/MultiselectFilter'

import { MoyskladFilterUrl } from '../src/MoyskladFilterUrl'

test('MoyskladFilterUrl #1', t => {
  const { AgentSource: AgentSourceFilter } = FilterParameter

  const msFilterUrl = new MoyskladFilterUrl({
    hash: { path: ['customerorder'] }
  })

  const agentFilter = new AgentFilter({
    mode: MultiselectFilterMode.EMPTY
  })

  // Добавление фильтра
  msFilterUrl.addFilter(AgentSourceFilter, agentFilter)

  const agentFilter2 = msFilterUrl.getFilter(AgentSourceFilter)

  const filter2Str = agentFilter2?.toString()

  t.equals(filter2Str, ',empty')

  const url = msFilterUrl.toString()

  t.equals(
    url,
    'https://online.moysklad.ru/app/#customerorder?global_agentSourceFilter=,empty'
  )

  t.end()
})

test('MoyskladFilterUrl #2', t => {
  const { AgentSource: AgentSourceFilter } = FilterParameter

  const url1 = new URL(
    "https://online.moysklad.ru/app/#customerorder?global_agentSourceFilter=%5B69a1f634-69c0-11e3-6cd1-7054d21a8d1e%5C%5C,%5Bfoo%5D%20slash%5B%5C%5C%5C%5C%5C%5C%5C%5C%5C%5C%5C%5C%5C%5C%5C%5C%5D%20coma%5B%5C%5C%5C%5C%5C%5C%5C%5C%5C%5C,%5D%20semi%5B%5C%5C%5C%5C;%5D%20amp%5B%5C&%5D%20plus%5B+%5D%20sym%5B%C2%A7%C2%B1!@%23$%25%5E*()_-=%7C'%22:%7B%7D%3C%3E.%60~?/%5D%20%7C%20%5D%20%5B%5C%5C,3670%5C%5C,Company%5D,equals"
  ).href

  const filter = new MoyskladFilterUrl(url1)

  const param1 = filter.getFilter(AgentSourceFilter)!

  t.equals(
    param1.toString(),
    '[69a1f634-69c0-11e3-6cd1-7054d21a8d1e\\,[foo] slash[\\\\\\\\\\\\\\\\] coma[\\\\\\\\\\,] semi[\\\\;] amp[&] plus[+] sym[§±!@#$%^*()_-=|\'":{}<>.`~?/] | ] [\\,3670\\,Company],equals',
    'should decode param as string'
  )

  t.deepEquals(
    param1.getValue(),
    {
      mode: 'equals',
      entities: [
        {
          id: '69a1f634-69c0-11e3-6cd1-7054d21a8d1e',
          name:
            '[foo] slash[\\] coma[,] semi[;] amp[&] plus[+] sym[§±!@#$%^*()_-=|\'":{}<>.`~?/] | ] [',
          code: '3670',
          type: 'Company'
        }
      ]
    },
    'should decode params as object'
  )

  const url2 = filter.toString()

  t.equals(url2, url1, 'should encode filter to same url')

  t.end()
})

test('MoyskladFilterUrl (Opera url) #1', t => {
  const OPERA_URL =
    'https://online.moysklad.ru/app/#operation?global_agentFilter=%5Bba0bef8d-1687-11ea-0a80-065c0015b35d%5C%5C,(Орг.)%20РАСПРЕДЕЛЯЮЩАЯ%20ОРГАНИЗАЦИЯ%5C%5C,%5C%5C,MyCompany%5D,notequals&global_ownerGroupFilter=%5B0956718d-d318-11e5-7a69-97110000165f%5C%5C,Основной%5C%5C,%5C%5C,Group;e51060d6-577f-11e9-9109-f8fc00035ca3%5C%5C,Закупки%20и%20аудит%5C%5C,%5C%5C,Group%5D,equals'

  const filter = new MoyskladFilterUrl(OPERA_URL)

  const query = filter.getHashQuery()

  t.deepEquals(
    query,
    {
      global_agentFilter:
        '[ba0bef8d-1687-11ea-0a80-065c0015b35d\\,(Орг.) РАСПРЕДЕЛЯЮЩАЯ ОРГАНИЗАЦИЯ\\,\\,MyCompany],notequals',
      global_ownerGroupFilter:
        '[0956718d-d318-11e5-7a69-97110000165f\\,Основной\\,\\,Group;e51060d6-577f-11e9-9109-f8fc00035ca3\\,Закупки и аудит\\,\\,Group],equals'
    },
    'should decode query'
  )

  const url1 = filter.toString()

  const CHROME_URL =
    'https://online.moysklad.ru/app/#operation?global_agentFilter=%5Bba0bef8d-1687-11ea-0a80-065c0015b35d%5C%5C,(%D0%9E%D1%80%D0%B3.)%20%D0%A0%D0%90%D0%A1%D0%9F%D0%A0%D0%95%D0%94%D0%95%D0%9B%D0%AF%D0%AE%D0%A9%D0%90%D0%AF%20%D0%9E%D0%A0%D0%93%D0%90%D0%9D%D0%98%D0%97%D0%90%D0%A6%D0%98%D0%AF%5C%5C,%5C%5C,MyCompany%5D,notequals&global_ownerGroupFilter=%5B0956718d-d318-11e5-7a69-97110000165f%5C%5C,%D0%9E%D1%81%D0%BD%D0%BE%D0%B2%D0%BD%D0%BE%D0%B9%5C%5C,%5C%5C,Group;e51060d6-577f-11e9-9109-f8fc00035ca3%5C%5C,%D0%97%D0%B0%D0%BA%D1%83%D0%BF%D0%BA%D0%B8%20%D0%B8%20%D0%B0%D1%83%D0%B4%D0%B8%D1%82%5C%5C,%5C%5C,Group%5D,equals'

  t.equals(
    CHROME_URL,
    new URL(CHROME_URL).href,
    'should be same as url from URL'
  )

  t.equals(url1, CHROME_URL, 'should encode filter to same url')

  t.end()
})

test('MoyskladFilterUrl (Opera url) #2', t => {
  const OPERA_URL =
    'https://online.moysklad.ru/app/#customerorder?global_agentSourceFilter=%5B10b9b6e6-139d-11eb-0a80-02e9001de7ee%5C%5C,%5Bbaz%5D%20😁→➡️%EF%B8%8F©✗§1234567890-=qwertyuiop%5B%5Dasdfghjkl%5C%5C%5C%5C;\'%5C%5C%5C%5C%5C%5C%5C%5C%5C%5C%5C%5C%5C%5C%5C%5C%60zxcvbnm%5C%5C%5C%5C%5C%5C%5C%5C%5C%5C,./±!@%23$%25%5E%5C&*()_+QWERTYUIOP%7B%7DASDFGHJKL:"%7CZXCVBNM<>?>1234567890-=йцукенгшщзхъфывапролджэё%5Dячсмитьбю/<!"№%25:%5C%5C%5C%5C%5C%5C%5C%5C%5C%5C,.%5C%5C%5C%5C;()_+ЙЦУКЕНГШЩЗХЪФЫВАПРОЛДЖЭЁ%5BЯЧСМИТЬБЮ?%5C%5C,%5C%5C,Company%5D,equals'

  const filter = new MoyskladFilterUrl(OPERA_URL)

  const query = filter.getHashQuery()

  t.deepEquals(
    query,
    {
      global_agentSourceFilter:
        '[10b9b6e6-139d-11eb-0a80-02e9001de7ee\\,[baz] 😁→➡️️©✗§1234567890-=qwertyuiop[]asdfghjkl\\\\;\'\\\\\\\\\\\\\\\\`zxcvbnm\\\\\\\\\\,./±!@#$%^&*()_+QWERTYUIOP{}ASDFGHJKL:"|ZXCVBNM<>?>1234567890-=йцукенгшщзхъфывапролджэё]ячсмитьбю/<!"№%:\\\\\\\\\\,.\\\\;()_+ЙЦУКЕНГШЩЗХЪФЫВАПРОЛДЖЭЁ[ЯЧСМИТЬБЮ?\\,\\,Company],equals'
    },
    'should decode query'
  )

  const url1 = filter.toString()

  const CHROME_URL =
    "https://online.moysklad.ru/app/#customerorder?global_agentSourceFilter=%5B10b9b6e6-139d-11eb-0a80-02e9001de7ee%5C%5C,%5Bbaz%5D%20%F0%9F%98%81%E2%86%92%E2%9E%A1%EF%B8%8F%EF%B8%8F%C2%A9%E2%9C%97%C2%A71234567890-=qwertyuiop%5B%5Dasdfghjkl%5C%5C%5C%5C;'%5C%5C%5C%5C%5C%5C%5C%5C%5C%5C%5C%5C%5C%5C%5C%5C%60zxcvbnm%5C%5C%5C%5C%5C%5C%5C%5C%5C%5C,./%C2%B1!@%23$%25%5E%5C&*()_+QWERTYUIOP%7B%7DASDFGHJKL:%22%7CZXCVBNM%3C%3E?%3E1234567890-=%D0%B9%D1%86%D1%83%D0%BA%D0%B5%D0%BD%D0%B3%D1%88%D1%89%D0%B7%D1%85%D1%8A%D1%84%D1%8B%D0%B2%D0%B0%D0%BF%D1%80%D0%BE%D0%BB%D0%B4%D0%B6%D1%8D%D1%91%5D%D1%8F%D1%87%D1%81%D0%BC%D0%B8%D1%82%D1%8C%D0%B1%D1%8E/%3C!%22%E2%84%96%25:%5C%5C%5C%5C%5C%5C%5C%5C%5C%5C,.%5C%5C%5C%5C;()_+%D0%99%D0%A6%D0%A3%D0%9A%D0%95%D0%9D%D0%93%D0%A8%D0%A9%D0%97%D0%A5%D0%AA%D0%A4%D0%AB%D0%92%D0%90%D0%9F%D0%A0%D0%9E%D0%9B%D0%94%D0%96%D0%AD%D0%81%5B%D0%AF%D0%A7%D0%A1%D0%9C%D0%98%D0%A2%D0%AC%D0%91%D0%AE?%5C%5C,%5C%5C,Company%5D,equals"

  t.equals(
    CHROME_URL,
    new URL(CHROME_URL).href,
    'should be same as url from URL'
  )

  t.equals(url1, CHROME_URL, 'should encode filter to same url')

  t.end()
})

test('MoyskladFilterUrl (http error)', t => {
  const url = 'http://online.moysklad.ru/app/#demand'

  t.throws(
    () => {
      new MoyskladFilterUrl(url)
    },
    /должен быть указан https протокол/,
    'should throw if http protocol'
  )

  t.end()
})

test('MoyskladFilterUrl (cases)', t => {
  const urlsText = fs.readFileSync(
    path.join(process.cwd(), 'tests/cases/urls.txt'),
    'utf8'
  )

  const urls = urlsText.split('\n').filter(line => line)

  for (let i = 0; i < urls.length; i++) {
    try {
      const url = new URL(urls[i]).href

      const filter = new MoyskladFilterUrl(url)

      const rebuilded = filter.toString()

      if (rebuilded !== url) {
        console.log('[url]', url)
        console.log('[rebuilded]', rebuilded)
        t.fail(`case ${i + 1} failed: should build same url`)
      }
    } catch (err) {
      t.fail(`case ${i + 1} failed - ` + err.message)
    }
  }

  t.pass(`All ${urls.length} cases passed`)

  t.end()
})
