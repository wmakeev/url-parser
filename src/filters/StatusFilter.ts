import 'ts-replace-all'

import { decodeTuple } from '../decodeFilterString'
import { encodeTuple } from '../encodeFilterString'
import { assertOk } from '../tools/assert'
import { parseEnum } from '../tools/parseEnum'
import { Filter } from './Filter'
import type { FilterSerializer } from './FilterSerializer'

export interface StatusFilterValue<T> {
  status: T
}

// TODO Чем можно заменить any для энума?
/* eslint @typescript-eslint/no-explicit-any:0 */
export class StatusFilterSerializer<Status extends string>
  implements FilterSerializer<StatusFilterValue<Status>> {
  constructor(private statusName: string, private StatusEnum: any) {}

  serialize(filter: StatusFilterValue<Status>): string {
    return encodeTuple([filter.status, ''])
  }

  deserialize(serialized: string) {
    // [value],
    const tuple = decodeTuple(serialized)

    assertOk(
      tuple.length === 2,
      `${this.statusName} tuple should contain 2 elements but got ${tuple.length}`
    )

    const [paymentStatus] = tuple as [string, '']

    const status = parseEnum<Status>(
      this.statusName,
      this.StatusEnum,
      paymentStatus
    )

    return { status }
  }
}

export class StatusFilter<Status extends string> extends Filter<
  StatusFilterValue<Status>
> {
  constructor(
    initial: string | StatusFilterValue<Status>,
    statusName: string,
    StatusEnum: any
  ) {
    super(initial, new StatusFilterSerializer(statusName, StatusEnum))
  }
}
