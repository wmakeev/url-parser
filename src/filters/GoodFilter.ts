import { MultiselectFilter } from './MultiselectFilter'
import type { EntityType } from './Entity'

export type GoodFilterEntityType =
  | EntityType.Good
  | EntityType.Kit
  | EntityType.Service

export class GoodFilter extends MultiselectFilter<GoodFilterEntityType> {}
