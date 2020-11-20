import fs from 'fs'
import path from 'path'
import { URL } from 'url'
import _ from 'lodash'
import { MoyskladFilterUrl } from '../../src/MoyskladFilterUrl'

const urlsText = fs.readFileSync(
  path.join(process.cwd(), 'tests/cases/urls.txt'),
  'utf8'
)

const urls = urlsText.split('\n').filter(line => line)

const params = new Set(
  _(urls)
    .flatMap(url => {
      const href = new URL(url).href

      const filter = new MoyskladFilterUrl(href)

      const path = filter.getHashPath()?.join('/') ?? '(no)'

      const query = filter.getHashQuery()

      return query
        ? Object.keys(query).map(key => ({ path, param: key, url }))
        : []
    })
    .orderBy(it => it.path)
    .orderBy(it => it.param)
    .groupBy(it => it.param)
    .mapValues(items =>
      _(items)
        .map(it => it.path)
        .orderBy()
        .uniq()
        .join(',')
    )
    .entries()
    .map(ent => `${ent[0]} (${ent[1]})`)
    .value()
)

fs.writeFileSync(
  path.join(process.cwd(), '__temp/cases-params.txt'),
  Array.from(params.values()).join('\n'),
  'utf8'
)
