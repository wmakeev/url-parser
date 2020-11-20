import { getTimeString } from '../tools/getTimeString'
import { parseTimeString } from '../tools/parseTimeString'
import { Filter } from './Filter'
import type { FilterSerializer } from './FilterSerializer'

export enum PeriodFilterMode {
  INSIDE_PERIOD = 'inside_period',
  EMPTY = 'empty',
  NOT_EMPTY = 'notempty'
}

export enum PeriodFilterPresets {
  MONTH = 'MONTH',
  WEEK = 'WEEK',
  TODAY = 'TODAY',
  YESTERDAY = 'YESTERDAY'
}

type PeriodFilterRaw =
  | [from: string | '', to: string | '', mode: PeriodFilterMode]
  | [
      from: string | '',
      to: string | '',
      mode: PeriodFilterMode,
      presetFlag: 'PRESETS',
      presetType: PeriodFilterPresets,
      presetOffset: string
    ]

export interface PeriodFilterPreset {
  type: PeriodFilterPresets
  offset: number
}

/** Фильтр по дате */
export type PeriodFilterObject =
  | {
      mode: PeriodFilterMode.INSIDE_PERIOD
      from: Date | null
      to: Date | null
      preset?: PeriodFilterPreset
    }
  | {
      mode: PeriodFilterMode.EMPTY | PeriodFilterMode.NOT_EMPTY
    }

export class PeriodFilterSerializer
  implements FilterSerializer<PeriodFilterObject> {
  serialize(filter: PeriodFilterObject): string {
    if (filter.mode === PeriodFilterMode.INSIDE_PERIOD) {
      let rawFilter: PeriodFilterRaw = [
        getTimeString(filter.from),
        getTimeString(filter.to),
        filter.mode
      ]

      if (filter.preset) {
        rawFilter = [
          ...rawFilter,
          'PRESETS',
          filter.preset.type,
          String(filter.preset.offset)
        ] as PeriodFilterRaw
      }

      const result = rawFilter.join()

      return result // FIXME Как экранируются запятые?
    } else {
      return ['', '', filter.mode].join()
    }
  }

  deserialize(serialized: string): PeriodFilterObject {
    // TODO Runtime validation
    const rawFilter = serialized.split(',') as PeriodFilterRaw

    const mode = rawFilter[2]

    if (
      mode === PeriodFilterMode.EMPTY ||
      mode === PeriodFilterMode.NOT_EMPTY
    ) {
      return { mode }
    } else {
      const periodFilter: PeriodFilterObject = {
        mode,
        from: parseTimeString(rawFilter[0]),
        to: parseTimeString(rawFilter[1])
      }

      if (rawFilter[3] === 'PRESETS') {
        periodFilter.preset = {
          type: rawFilter[4]!,
          offset: Number.parseInt(rawFilter[5]!)
        }
      }

      return periodFilter
    }
  }
}

export class PeriodFilter extends Filter<PeriodFilterObject> {
  constructor(initial: string | PeriodFilterObject) {
    super(initial, new PeriodFilterSerializer())
  }
}
