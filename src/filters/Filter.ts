import type { FilterSerializer } from './FilterSerializer'

export class Filter<Value> {
  private filterValue: Value

  constructor(
    initial: string | Value,
    private serializer: FilterSerializer<Value>
  ) {
    if (typeof initial === 'string') {
      this.filterValue = serializer.deserialize(initial)
    } else {
      this.filterValue = initial
    }
  }

  /** Возвращает десериализованное значение фильтра */
  getValue() {
    return this.filterValue
  }

  /** Возвращает сериализованное значение фильтра */
  toString() {
    return this.serializer.serialize(this.filterValue)
  }
}
