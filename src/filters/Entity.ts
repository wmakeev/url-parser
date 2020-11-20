import { assertOk } from '../tools/assert'

export enum EntityType {
  // Контрагенты

  /** Контрагент */
  Company = 'Company',

  /** Организация */
  MyCompany = 'MyCompany',

  /** Сотрудник */
  Employee = 'Employee',

  // Товары
  /** Услуга */
  Service = 'Service',

  /** Комплект */
  Kit = 'Kit',

  /** Товар */
  Good = 'Good',

  // Прочее

  /** Состояние */
  State = 'State'
}

export type AgentType =
  | EntityType.Company
  | EntityType.MyCompany
  | EntityType.Employee

export type EntityTuple<T extends EntityType> =
  | [id: string, name: string, code: string, type: T]
  | [id: string, name: string, code: string, type: T, unknownId: string]

export type EntityValue<T extends EntityType> = {
  id: string
  name: string
  code: string
  type: T

  /**
   * Неизвестный идентификатор (для Employee)
   *
   * Не понятно к чему он относится (без него фильтр не срабатывает)
   * */
  unknownId?: string
}

export function getEntityTuple<T extends EntityType>(
  entityValue: EntityValue<T>
): EntityTuple<T> {
  const tuple: EntityTuple<T> = [
    entityValue.id,
    entityValue.name,
    entityValue.code,
    entityValue.type
  ]

  if (entityValue.unknownId) {
    tuple.push(entityValue.unknownId)
  }

  return tuple
}

export function getEntityValue<T extends EntityType>(
  entityTuple: EntityTuple<T>
): EntityValue<T> {
  assertOk(
    entityTuple.length === 4 || entityTuple.length === 5,
    `Unexpected EntityTuple length - ${entityTuple.length}`
  )

  const entityValue: EntityValue<T> = {
    id: entityTuple[0],
    name: entityTuple[1],
    code: entityTuple[2],
    type: entityTuple[3]
  }

  if (entityTuple.length === 5) {
    entityValue.unknownId = entityTuple[4]
  }

  return entityValue
}
