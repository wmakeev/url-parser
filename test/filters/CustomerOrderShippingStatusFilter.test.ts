import test from 'blue-tape'
import { MoyskladFilterUrl } from '../../src/MoyskladFilterUrl'
import { FilterParameter } from '../../src/filters/FilterParameter'

import {
  CustomerOrderShippingStatus,
  CustomerOrderShippingStatusFilterValue
} from '../../src/filters/CustomerOrderShippingStatusFilter'

test('CustomerOrderShippingStatusFilter', t => {
  const url =
    'https://online.moysklad.ru/app/#customerorder?global_customerOrderShippingStatusFilter=partiallyshipped,'

  const filter = new MoyskladFilterUrl(url)

  const filterParam = filter.getFilter(
    FilterParameter.CustomerOrderShippingStatus
  )

  if (filterParam) {
    const filterValue: CustomerOrderShippingStatusFilterValue = filterParam.getValue()

    t.deepEqual(
      filterValue,
      { status: CustomerOrderShippingStatus.PartiallyShipped },
      'should deserialize'
    )

    filter.addFilter(FilterParameter.CustomerOrderShippingStatus, filterParam)

    const serialized = filter.toString()

    t.equals(serialized, url, 'should serialize')
  } else {
    t.fail('should return filter instance')
  }

  t.end()
})
