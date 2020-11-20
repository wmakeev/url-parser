import 'ts-replace-all'

import { decodeTuple, decodeArray } from '../decodeFilterString'
import { encodeTuple, encodeArray } from '../encodeFilterString'
import { Filter } from './Filter'
import type { FilterSerializer } from './FilterSerializer'
import {
  EntityType,
  EntityTuple,
  EntityValue,
  getEntityTuple,
  getEntityValue
} from './Entity'

export enum MultiselectFilterMode {
  EQUALS = 'equals',
  NOT_EQUALS = 'notequals',
  EMPTY = 'empty',
  NOT_EMPTY = 'notempty'
}

export type MultiselectFilterObject<T extends EntityType> =
  | {
      entities: EntityValue<T>[]
      mode: MultiselectFilterMode.NOT_EQUALS | MultiselectFilterMode.EQUALS
    }
  | {
      mode: MultiselectFilterMode.EMPTY | MultiselectFilterMode.NOT_EMPTY
    }

export class MultiselectFilterSerializer<T extends EntityType>
  implements FilterSerializer<MultiselectFilterObject<T>> {
  serialize(filter: MultiselectFilterObject<T>): string {
    if (
      filter.mode === MultiselectFilterMode.EMPTY ||
      filter.mode === MultiselectFilterMode.NOT_EMPTY
    ) {
      return `,${filter.mode}`
    } else if (
      filter.mode === MultiselectFilterMode.EQUALS ||
      filter.mode === MultiselectFilterMode.NOT_EQUALS
    ) {
      if (!filter.entities?.length) {
        throw new Error('Список контрагентов пуст')
      }

      const encodedEntitiesArr = encodeArray(
        filter.entities.map(entity => encodeTuple(getEntityTuple(entity)))
      )

      return encodeTuple([encodedEntitiesArr, filter.mode])
    } else {
      throw new Error('Неизвестный режим фильтра - ${filter.mode}')
    }
  }

  deserialize(serialized: string) {
    // [69a1f634-69c0-11e3-6cd1-7054d21a8d1e\\,[foo]\\\\\\\\\\,test\\\\\\\\\\,1\\\\\\\\\\,\\\\\\\\\\,2\\\\\\\\\\,\\\\\\\\\\,\\\\\\\\\\,3\\,3670\\,Company;f3eb7413-f31c-11e3-73b8-002590a28eca\\,Test (2)\\,4027\\,Company],equals
    const [encodedEntitiesArr, mode] = decodeTuple(serialized) as [
      string | '',
      MultiselectFilterMode
    ]

    if (
      mode === MultiselectFilterMode.EMPTY ||
      mode === MultiselectFilterMode.NOT_EMPTY
    ) {
      return {
        mode,
        entities: null
      }
    } else {
      if (!encodedEntitiesArr) {
        throw new Error('Нет контрагентов в фильтре')
      }

      const tmp1 = decodeArray(encodedEntitiesArr)

      const entitiesArray = tmp1.map(it => {
        return decodeTuple(it) as EntityTuple<T>
      })

      const entities = entitiesArray.map(it => getEntityValue(it))

      return {
        mode,
        entities: entities
      }
    }
  }
}

export class MultiselectFilter<T extends EntityType> extends Filter<
  MultiselectFilterObject<T>
> {
  constructor(initial: string | MultiselectFilterObject<T>) {
    super(initial, new MultiselectFilterSerializer<T>())
  }
}
