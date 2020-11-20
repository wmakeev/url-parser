import { decodeTuple } from '../decodeFilterString'
import { encodeTuple } from '../encodeFilterString'
import { Filter } from './Filter'
import type { FilterSerializer } from './FilterSerializer'
import {
  EntityTuple,
  EntityType,
  EntityValue,
  getEntityTuple,
  getEntityValue
} from './Entity'

export class EntityIdFilterSerializer<T extends EntityType>
  implements FilterSerializer<EntityValue<T>> {
  serialize(filter: EntityValue<T>): string {
    const encodedTuple = encodeTuple(getEntityTuple(filter))

    return encodedTuple
  }

  deserialize(serialized: string) {
    const entityTuple = decodeTuple(serialized) as EntityTuple<T>

    const entityValue = getEntityValue(entityTuple)

    return entityValue
  }
}

export class EntityIdFilter<T extends EntityType> extends Filter<
  EntityValue<T>
> {
  constructor(initial: string | EntityValue<T>) {
    super(initial, new EntityIdFilterSerializer())
  }
}
