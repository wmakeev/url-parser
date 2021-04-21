import { Filter } from './Filter'
import type { FilterSerializer } from './FilterSerializer'

export class EnumSelectFilterSerializer<T extends string>
  implements FilterSerializer<T> {
  serialize(filter: T): string {
    return filter
  }

  deserialize(serialized: string) {
    return serialized as T
  }
}

/**
 * Список определенных значений
 *
 * `global_entityTypeFilter=Move`
 */
export class EnumSelectFilter<T extends string> extends Filter<T> {
  constructor(initial: T) {
    super(initial, new EnumSelectFilterSerializer())
  }
}
