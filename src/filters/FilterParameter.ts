import { AgentFilter } from './AgentFilter'
import { AgentIdFilter } from './AgentIdFilter'
import { CustomerOrderShippingStatusFilter } from './CustomerOrderShippingStatusFilter'
import { EnumSelectFilter } from './EnumSelectFilter'
import { GoodFilter } from './GoodFilter'
import { PaymentStatusFilter } from './PaymentStatusFilter'
import { PeriodFilter } from './PeriodFilter'

/** Типы сущностей в фильтре 'global_entityTypeFilter' отчета turnover */
export type TurnoverEntityTypes =
  | 'Supply'
  | 'PurchaseReturn'
  | 'Demand'
  | 'SalesReturn'
  | 'Loss'
  | 'Enter'
  | 'Move'
  | 'Processing'
  | 'RetailDemand'
  | 'RetailSalesReturn'

export enum FilterParameter {
  /**
   * Временной период
   */
  GlobalPeriod = 'global_periodFilter',

  /**
   * Временной период
   */
  Period = 'periodFilter',

  /**
   * Оплата:
   * - Оплачено `paid,`
   * - Частично оплачено `partlyPaid,`
   * - Не оплачено `unpaid,`
   */
  PaymentStatus = 'global_paymentStatusFilter',

  /**
   * Отгружено:
   * - Отгружено `shipped,`
   * - Частично отгружено `partiallyshipped,`
   * - Не отгружено `unshipped,`
   * - Просрочено `overdue,`
   */
  CustomerOrderShippingStatus = 'global_customerOrderShippingStatusFilter',

  /**
   * План. дата отгрузки
   */
  DeliveryPeriod = 'global_deliveryPeriodFilter',

  /**
   * Товар или группа
   *
   * Type: `MultiselectFilter<`Good` | `Feature`>`
   */
  GoodFilter = 'global_goodIdFilter',

  /**
   * Тип возврата
   * - Частично возвращено `mixed`
   * - Без возвратов `noReturn`
   * - Полностью возвращено `return`
   */
  // ReturnSumReturnTypeFilter = 'global_returnSum_returnTypeFilter',

  /**
   * Склад
   *
   * Type: `MultiselectFilter<Warehouse>`
   */
  // StoreFilter = 'global_storeFilter',

  /**
   * Проект
   *
   * Type: `MultiselectFilter<Project>`
   */
  // ProjectFilter = 'global_projectFilter',

  /**
   * Контрагент
   *
   * Type: `MultiselectFilter<MyCompany | Company>`
   */
  AgentSource = 'global_agentSourceFilter',

  /**
   * Группа контрагента
   *
   * // TODO Мультиселект из строк
   * Type: `MultiselectStringFilter<MyCompany | Company>`
   */
  // AgentSourceFilterTag = 'global_agentSourceFilter_tag',

  /**
   * Счет контрагента
   *
   * // TODO SingleselectFilter
   * - Type: `SingleselectEntityFilter
   * `global_agentSourceFilter_account=36ae149e-e5dc-11e3-b3e3-002590a28eca,40802810595020000048,,AgentAccount`
   */
  // AgentSourceFilterAccount = 'global_agentSourceFilter_account',

  /**
   * Договор
   *
   * Type: `MultiselectStringFilter<Contract>`
   */
  // ContractFilter = 'global_contractFilter',

  /**
   * Владелец контрагента
   *
   * `Employee`
   *
   * // TODO Дополнительный идентификатор в конце
   * ```txt
   * global_agentSourceOwnerFilter=[99d99b1e-2c81-4ebf-93f8-bdd2c81c6d08\\,Горохов Д. В.\\,\\,Employee\\,500d3114-0e7b-11e2-5338-3c4a92f3a0a7;605323cb-83ac-11e6-7a31-d0fd002ef703\\,Игнатьева Т. М.\\,\\,Employee\\,604cdad6-83ac-11e6-7a31-d0fd002ef702],equals
   * ```
   */
  // AgentSourceOwnerFilter = 'global_agentSourceOwnerFilter',

  /**
   * Организация
   *
   * `MyCompany`
   */
  AgentTarget = 'global_agentTargetFilter',

  /**
   * Счет организации
   *
   * single `AgentAccount`
   */
  // AgentTargetFilterAccount = 'global_agentTargetFilter_account',

  /**
   * Статус
   *
   * `State`
   */
  // StateFilter = 'global_stateFilter',

  /**
   * Проведено
   *
   * // TODO BooleanFilter
   * - `0`
   * - `1`
   */
  // OperationApprovalState = 'global_operationApprovalState',

  /**
   * Напечатано
   *
   * `BooleanFilter`
   */
  // OperationPrintedFilter = 'global_operationPrintedFilter',

  /**
   * Отправлено
   *
   * `BooleanFilter`
   */
  // OperationPublishedFilter = 'global_operationPublishedFilter',

  /**
   * Владелец-сотрудник
   *
   * // TODO +id
   */
  // OwnerFilter = 'global_ownerFilter',

  /**
   * Владелец-отдел
   *
   * `Group`
   */
  // OwnerGroupFilter = 'global_ownerGroupFilter',

  /**
   * Общий доступ
   *
   * `Boolean`
   */
  // SharedFilter = 'global_sharedFilter',

  /**
   * Когда изменен
   *
   * `Period`
   */
  // UpdatedFilter = 'global_updatedFilter',

  /**
   * Кто изменил
   *
   * `Employee` // TODO +id
   */
  // UpdatedByFilter = 'global_updatedByFilter'

  // TODO StringFilter `65e3e755-c83d-458d-9997-879153708f94=123,equals`

  // --- cases

  /**
   * Контрагент (Движение денежных средств)
   */
  AgentId = 'agentIdFilter',

  /** Контрагент (Документы) */
  Agent = 'global_agentFilter',

  /** Контрагент (Платежи) */
  FinanceAgent = 'global_financeAgentFilter',

  /** Организация (Платежи) */
  FinanceSubCompany = 'global_financeSubcompanyFilter',

  /** Обороты (Тип документа) */
  TurnoverEntityType = 'global_entityTypeFilter'
}

// TODO Можно ли описать типы без дублирования сущностей?

export type FilterParameterType = {
  [FilterParameter.AgentSource]: AgentFilter
  [FilterParameter.AgentTarget]: AgentFilter
  [FilterParameter.GlobalPeriod]: PeriodFilter
  [FilterParameter.Period]: PeriodFilter
  [FilterParameter.PaymentStatus]: PaymentStatusFilter
  [FilterParameter.CustomerOrderShippingStatus]: CustomerOrderShippingStatusFilter
  [FilterParameter.DeliveryPeriod]: PeriodFilter
  [FilterParameter.GoodFilter]: GoodFilter
  [FilterParameter.AgentId]: AgentIdFilter
  [FilterParameter.Agent]: AgentFilter
  [FilterParameter.FinanceAgent]: AgentFilter
  [FilterParameter.FinanceSubCompany]: AgentFilter
  [FilterParameter.TurnoverEntityType]: EnumSelectFilter<TurnoverEntityTypes>
}

export const FilterParameterClass = {
  [FilterParameter.AgentSource]: AgentFilter,
  [FilterParameter.AgentTarget]: AgentFilter,
  [FilterParameter.GlobalPeriod]: PeriodFilter,
  [FilterParameter.Period]: PeriodFilter,
  [FilterParameter.PaymentStatus]: PaymentStatusFilter,
  [FilterParameter.CustomerOrderShippingStatus]: CustomerOrderShippingStatusFilter,
  [FilterParameter.DeliveryPeriod]: PeriodFilter,
  [FilterParameter.GoodFilter]: GoodFilter,
  [FilterParameter.AgentId]: AgentIdFilter,
  [FilterParameter.Agent]: AgentFilter,
  [FilterParameter.FinanceAgent]: AgentFilter,
  [FilterParameter.FinanceSubCompany]: AgentFilter,
  [FilterParameter.TurnoverEntityType]: EnumSelectFilter
}
