import test from 'blue-tape'
import {
  EnumSelectFilter,
  FilterParameter,
  MoyskladFilterUrl,
  PeriodFilter,
  PeriodFilterMode
} from '../src'

test('MoyskladFilterUrl (turnover) #1', t => {
  const msFilterUrl = new MoyskladFilterUrl({
    hash: { path: ['turnover'] }
  })

  // Добавление фильтра
  msFilterUrl
    .addFilter(
      FilterParameter.Period,
      new PeriodFilter({
        mode: PeriodFilterMode.INSIDE_PERIOD,
        from: new Date(2021, 3, 20),
        to: new Date(2021, 3, 21, 23, 59, 0)
      })
    )
    .addFilter(
      FilterParameter.TurnoverEntityType,
      new EnumSelectFilter('Demand')
    )

  const url = msFilterUrl.toString()

  t.equals(
    url,
    'https://online.moysklad.ru/app/#turnover?' +
      'periodFilter=20.04.2021%2000:00:00,21.04.2021%2023:59:00,inside_period&' +
      'global_entityTypeFilter=Demand'
  )

  t.end()
})
