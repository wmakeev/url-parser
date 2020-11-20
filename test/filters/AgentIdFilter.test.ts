import test from 'blue-tape'
import { MoyskladFilterUrl } from '../../src/MoyskladFilterUrl'
import { FilterParameter } from '../../src/filters/FilterParameter'

import type { AgentIdFilter } from '../../src/filters/AgentIdFilter'
import type { AgentType, EntityValue } from '../../src/filters/Entity'

test('AgentIdFilter', t => {
  const url =
    'https://online.moysklad.ru/app/#cashflow?agentIdFilter=ba0bef8d-1687-11ea-0a80-065c0015b35d,(%D0%BE%D1%80%D0%B3.)%20%D0%A0%D0%90%D0%A1%D0%9F%D0%A0%D0%95%D0%94%D0%95%D0%9B%D0%AF%D0%AE%D0%A9%D0%90%D0%AF%20%D0%9E%D0%A0%D0%93%D0%90%D0%9D%D0%98%D0%97%D0%90%D0%A6%D0%98%D0%AF,,MyCompany'

  const filter = new MoyskladFilterUrl(url)

  const filterParam: AgentIdFilter | null = filter.getFilter(
    FilterParameter.AgentId
  )

  if (filterParam) {
    const filterValue: EntityValue<AgentType> = filterParam.getValue()

    t.deepEqual(
      filterValue,
      {
        id: 'ba0bef8d-1687-11ea-0a80-065c0015b35d',
        name: '(орг.) РАСПРЕДЕЛЯЮЩАЯ ОРГАНИЗАЦИЯ',
        code: '',
        type: 'MyCompany'
      },
      'should deserialize'
    )

    filter.addFilter(FilterParameter.AgentId, filterParam)

    const serialized = filter.toString()

    t.equals(serialized, url, 'should serialize')
  } else {
    t.fail('should return filter instance')
  }

  t.end()
})
