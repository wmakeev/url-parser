import test from 'blue-tape'
import { MoyskladUrl } from '../../src/MoyskladUrl'
import { FilterParameter } from '../../src/filters/FilterParameter'

import {
  CustomerOrderShippingStatus,
  CustomerOrderShippingStatusFilterValue
} from '../../src/filters/CustomerOrderShippingStatusFilter'

test('CustomerOrderShippingStatusFilter', t => {
  const url =
    'https://online.moysklad.ru/app/#customerorder?global_customerOrderShippingStatusFilter=partiallyshipped,'

  const filter = new MoyskladUrl(url)

  const filterParam = filter.getFilter(
    FilterParameter.GlobalCustomerOrderShippingStatusFilter
  )

  if (filterParam) {
    const filterValue: CustomerOrderShippingStatusFilterValue = filterParam.getValue()

    t.deepEqual(
      filterValue,
      { status: CustomerOrderShippingStatus.PartiallyShipped },
      'should deserialize'
    )

    filter.addFilter(
      FilterParameter.GlobalCustomerOrderShippingStatusFilter,
      filterParam
    )

    const serialized = filter.toString()

    t.equals(serialized, url, 'should serialize')
  } else {
    t.fail('should return filter instance')
  }

  t.end()
})
