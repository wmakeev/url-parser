import { StatusFilter, StatusFilterValue } from './StatusFilter'

export enum CustomerOrderShippingStatus {
  Shipped = 'shipped',
  PartiallyShipped = 'partiallyshipped',
  Unshipped = 'unshipped',
  Overdue = 'overdue'
}

export type CustomerOrderShippingStatusFilterValue = StatusFilterValue<
  CustomerOrderShippingStatus
>

export class CustomerOrderShippingStatusFilter extends StatusFilter<
  CustomerOrderShippingStatus
> {
  constructor(initial: string | CustomerOrderShippingStatusFilterValue) {
    super(initial, {
      statusName: 'CustomerOrderShippingStatus',
      statusEnum: CustomerOrderShippingStatus
    })
  }
}
