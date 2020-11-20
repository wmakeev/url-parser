import test from 'blue-tape'

import {
  PeriodFilterSerializer,
  PeriodFilterMode,
  PeriodFilterPresets
} from '../../src/filters/PeriodFilter'

test('PeriodFilterSerializer (INSIDE_PERIOD + PRESET)', t => {
  const filterRaw =
    '05.10.2020 00:00:00,11.10.2020 23:59:59,inside_period,PRESETS,WEEK,0'

  const serializer = new PeriodFilterSerializer()

  const filter = serializer.deserialize(filterRaw)

  t.equal(
    filter.mode,
    PeriodFilterMode.INSIDE_PERIOD,
    'should deserialize INSIDE_PERIOD mode'
  )

  if (filter.mode === PeriodFilterMode.INSIDE_PERIOD) {
    t.equals(+filter.from!, +new Date(2020, 9, 5), 'should parse from')

    t.equals(+filter.to!, +new Date(2020, 9, 11, 23, 59, 59), 'should parse to')

    t.equals(
      filter.preset?.type,
      PeriodFilterPresets.WEEK,
      'should have correct preset.type'
    )

    t.equals(filter.preset?.offset, 0, 'should have correct preset.offset')
  } else {
    t.fail('should serialize INSIDE_PERIOD mode')
  }

  const reSerialized = serializer.serialize(filter)

  t.equals(reSerialized, filterRaw, 'should serialize to same string')

  t.end()
})

test('PeriodFilterSerializer (INSIDE_PERIOD) #1', t => {
  const filterRaw = '06.10.2020 03:10:00,12.11.2020 23:59:00,inside_period'

  const serializer = new PeriodFilterSerializer()

  const filter = serializer.deserialize(filterRaw)

  t.equal(
    filter.mode,
    PeriodFilterMode.INSIDE_PERIOD,
    'should deserialize INSIDE_PERIOD mode'
  )

  if (filter.mode === PeriodFilterMode.INSIDE_PERIOD) {
    t.equals(
      +filter.from!,
      +new Date(2020, 9, 6, 3, 10, 0),
      'should parse from'
    )

    t.equals(+filter.to!, +new Date(2020, 10, 12, 23, 59), 'should parse to')

    t.equals(filter.preset, undefined, 'should not have preset')
  } else {
    t.fail('should serialize INSIDE_PERIOD mode')
  }

  const reSerialized = serializer.serialize(filter)

  t.equals(reSerialized, filterRaw, 'should serialize to same string')

  t.end()
})

test('PeriodFilterSerializer (INSIDE_PERIOD) #2', t => {
  const filterRaw = '06.10.2020 03:10:01,,inside_period'

  const serializer = new PeriodFilterSerializer()

  const filter = serializer.deserialize(filterRaw)

  t.equal(
    filter.mode,
    PeriodFilterMode.INSIDE_PERIOD,
    'should deserialize INSIDE_PERIOD mode'
  )

  if (filter.mode === PeriodFilterMode.INSIDE_PERIOD) {
    t.equals(
      +filter.from!,
      +new Date(2020, 9, 6, 3, 10, 1),
      'should parse from'
    )

    t.equals(filter.to, null, 'should parse empty to')

    t.equals(filter.preset, undefined, 'should not have preset')
  } else {
    t.fail('should serialize INSIDE_PERIOD mode')
  }

  const reSerialized = serializer.serialize(filter)

  t.equals(reSerialized, filterRaw, 'should serialize to same string')

  t.end()
})

test('PeriodFilterSerializer (INSIDE_PERIOD) #3', t => {
  const filterRaw = ',20.10.2020 23:59:00,inside_period'

  const serializer = new PeriodFilterSerializer()

  const filter = serializer.deserialize(filterRaw)

  t.equal(
    filter.mode,
    PeriodFilterMode.INSIDE_PERIOD,
    'should deserialize INSIDE_PERIOD mode'
  )

  if (filter.mode === PeriodFilterMode.INSIDE_PERIOD) {
    t.equals(filter.from, null, 'should parse empty from')

    t.equals(+filter.to!, +new Date(2020, 9, 20, 23, 59), 'should parse to')

    t.equals(filter.preset, undefined, 'should not have preset')
  } else {
    t.fail('should serialize INSIDE_PERIOD mode')
  }

  const reSerialized = serializer.serialize(filter)

  t.equals(reSerialized, filterRaw, 'should serialize to same string')

  t.end()
})

test('PeriodFilterSerializer (EMPTY)', t => {
  const filterRaw = ',,empty'

  const serializer = new PeriodFilterSerializer()

  const filter = serializer.deserialize(filterRaw)

  t.equal(filter.mode, PeriodFilterMode.EMPTY, 'should deserialize EMPTY mode')

  const reSerialized = serializer.serialize(filter)

  t.equals(reSerialized, filterRaw, 'should serialize to same string')

  t.end()
})

test('PeriodFilterSerializer (NOT_EMPTY)', t => {
  const filterRaw = ',,notempty'

  const serializer = new PeriodFilterSerializer()

  const filter = serializer.deserialize(filterRaw)

  t.equal(
    filter.mode,
    PeriodFilterMode.NOT_EMPTY,
    'should deserialize EMPTY mode'
  )

  const reSerialized = serializer.serialize(filter)

  t.equals(reSerialized, filterRaw, 'should serialize to same string')

  t.end()
})
