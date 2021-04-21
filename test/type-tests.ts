/* eslint @typescript-eslint/no-unused-vars:0,
          @typescript-eslint/ban-ts-comment:0 */

import type { AgentFilter } from '../src/filters/AgentFilter'
import { FilterParameter } from '../src/filters/FilterParameter'
import type {
  PaymentStatusFilter,
  PaymentStatusFilterValue
} from '../src/filters/PaymentStatusFilter'
import { MoyskladFilterUrl } from '../src/MoyskladFilterUrl'

const url =
  'https://online.moysklad.ru/app/#customerorder?global_customerOrderShippingStatusFilter=partiallyshipped,'

const filter = new MoyskladFilterUrl(url)

const path: string[] = filter.getPath()

const endpoint: string = filter.getEndpoint()

const hashPath: string[] | null = filter.getHashPath()

const hashQuery:
  | Record<string, string | null>
  | undefined = filter.getHashQuery()

const filterParam1: AgentFilter | null = filter.getFilter(
  FilterParameter.AgentSource
)

const filterParam2: PaymentStatusFilter | null = filter.getFilter(
  FilterParameter.PaymentStatus
)

const param2Value: PaymentStatusFilterValue = filterParam2!.getValue()

const param2Str: string = filterParam2!.toString()

// @ts-expect-error
filter.addFilter(FilterParameter.GlobalPeriod, filterParam2!)

const instance: MoyskladFilterUrl = filter.addFilter(
  FilterParameter.PaymentStatus,
  filterParam2!
)

// Fix unused var error
console.log(
  path,
  endpoint,
  hashPath,
  hashQuery,
  filterParam1,
  param2Value,
  param2Str,
  instance
)
