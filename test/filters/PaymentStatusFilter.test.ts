import test from 'blue-tape'
import { MoyskladUrl } from '../../src/MoyskladUrl'
import { FilterParameter } from '../../src/filters/FilterParameter'

import {
  PaymentStatus,
  PaymentStatusFilterValue
} from '../../src/filters/PaymentStatusFilter'

test('PaymentStatusFilter', t => {
  const url =
    'https://online.moysklad.ru/app/#customerorder?global_paymentStatusFilter=paid,'

  const filter = new MoyskladUrl(url)

  const paymentStatusFilter = filter.getFilter(
    FilterParameter.GlobalPaymentStatusFilter
  )

  if (paymentStatusFilter) {
    const paymentStatus: PaymentStatusFilterValue = paymentStatusFilter.getValue()

    t.deepEqual(
      paymentStatus,
      { status: PaymentStatus.Paid },
      'should deserialize'
    )

    filter.addFilter(
      FilterParameter.GlobalPaymentStatusFilter,
      paymentStatusFilter
    )

    const serialized = filter.toString()

    t.equals(serialized, url, 'should serialize')
  } else {
    t.fail('should return filter instance')
  }

  t.end()
})
