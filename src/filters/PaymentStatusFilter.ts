import { StatusFilter, StatusFilterValue } from './StatusFilter'

export enum PaymentStatus {
  Paid = 'paid',
  PartlyPaid = 'partlyPaid',
  Unpaid = 'unpaid'
}

export type PaymentStatusFilterValue = StatusFilterValue<PaymentStatus>

export class PaymentStatusFilter extends StatusFilter<PaymentStatus> {
  constructor(initial: string | PaymentStatusFilterValue) {
    super(initial, {
      statusName: 'PaymentStatus',
      statusEnum: PaymentStatus
    })
  }
}
