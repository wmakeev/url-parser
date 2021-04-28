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

export class StatusFilterSerializer<Status extends string>
  implements FilterSerializer<StatusFilterValue<Status>> {
  constructor(private options: StatusFilterOptions) {}

  serialize(filter: StatusFilterValue<Status>): string {
    return encodeTuple([filter.status, ''])
  }

  deserialize(serialized: string) {
    // [value],
    const tuple = decodeTuple(serialized)

    assertOk(
      tuple.length === 2,
      `${this.options.statusName} tuple should contain 2 elements but got ${tuple.length}`
    )

    const [paymentStatus] = tuple as [string, '']

    const status = parseEnum<Status>(
      this.options.statusName,
      this.options.statusEnum,
      paymentStatus
    )

    return { status }
  }
}

export interface StatusFilterOptions {
  statusName: string

  // TODO Чем можно заменить any для энума?
  /* eslint @typescript-eslint/no-explicit-any:0 */
  statusEnum: any
}

export class StatusFilter<Status extends string> extends Filter<
  StatusFilterValue<Status>
> {
  constructor(
    initial: string | StatusFilterValue<Status>,
    options: StatusFilterOptions
  ) {
    super(initial, new StatusFilterSerializer(options))
  }
}
