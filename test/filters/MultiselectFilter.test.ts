import test from 'blue-tape'
import { EntityType } from '../../src/filters/Entity'
import {
  MultiselectFilterSerializer,
  MultiselectFilterMode,
  MultiselectFilter
} from '../../src/filters/MultiselectFilter'
import { parseUrl } from '../../src/parseUrl'

test('MultiselectFilterSerializer', t => {
  const url =
    "https://online.moysklad.ru/app/#customerorder?global_agentSourceFilter=%5B69a1f634-69c0-11e3-6cd1-7054d21a8d1e%5C%5C,%5Bfoo%5D%20slash%5B%5C%5C%5C%5C%5C%5C%5C%5C%5C%5C%5C%5C%5C%5C%5C%5C%5D%20coma%5B%5C%5C%5C%5C%5C%5C%5C%5C%5C%5C,%5D%20semi%5B%5C%5C%5C%5C;%5D%20amp%5B%5C&%5D%20plus%5B+%5D%20sym%5B%C2%A7%C2%B1!@%23$%25%5E*()_-=%7C'%22:%7B%7D%3C%3E.%60~?/%5D%20%7C%20%5D%20%5B%5C%5C,3670%5C%5C,Company;9a7116ad-ba84-11e2-a39e-001b21d91495%5C%5C,%5Bbar%5D%20%5B%5C%5C%5C%5C%5C%5C%5C%5C%5C%5C,%5D%20%5B%5C%5C%5C%5C;%5D%20%5B%5C%5C%5C%5C%5C%5C%5C%5C%5C%5C%5C%5C%5C%5C%5C%5C%5D%5C%5C,3192%5C%5C,Company%5D,equals"

  const result = parseUrl(url)

  const filterRaw = result.hash.query?.global_agentSourceFilter

  const serializer = new MultiselectFilterSerializer()

  const filter = serializer.deserialize(filterRaw!)

  t.equal(
    filter.mode,
    MultiselectFilterMode.EQUALS,
    'should deserialize to object'
  )

  if (filter.mode === MultiselectFilterMode.EQUALS) {
    t.equals(filter.entities.length, 2, 'should deserialize 2 agents')

    const testAgent = filter.entities[0]

    t.equals(
      testAgent.id,
      '69a1f634-69c0-11e3-6cd1-7054d21a8d1e',
      'should deserialize agent.id'
    )

    t.equals(
      testAgent.name,
      // FIXME После "_-" идет "+", но он не заэнкожен в строке запроса
      // .. поэтому, в итоге, преобразуется в пробел
      '[foo] slash[\\] coma[,] semi[;] amp[&] plus[+] sym[§±!@#$%^*()_-=|\'":{}<>.`~?/] | ] [',
      'should deserialize agent.name'
    )

    t.equals(testAgent.code, '3670', 'should deserialize agent.code')

    t.equals(
      testAgent.type,
      EntityType.Company,
      'should deserialize agent.type'
    )
  } else {
    t.fail('should serialize EQUALS mode')
  }

  const reSerialized = serializer.serialize(filter)

  t.equals(reSerialized, filterRaw, 'should serialize to same string')

  t.end()
})

test('MultiselectFilterSerializer (empty)', t => {
  const filterRaw = ',empty'

  const serializer = new MultiselectFilterSerializer()

  const filter = serializer.deserialize(filterRaw)

  t.equal(filter.mode, MultiselectFilterMode.EMPTY, 'should deserialize mode')

  const reSerialized = serializer.serialize(filter)

  t.equals(reSerialized, filterRaw, 'should serialize to same string')

  t.end()
})

test('MultiselectFilter', t => {
  const url =
    "https://online.moysklad.ru/app/#customerorder?global_agentSourceFilter=%5B69a1f634-69c0-11e3-6cd1-7054d21a8d1e%5C%5C,%5Bfoo%5D%20slash%5B%5C%5C%5C%5C%5C%5C%5C%5C%5C%5C%5C%5C%5C%5C%5C%5C%5D%20coma%5B%5C%5C%5C%5C%5C%5C%5C%5C%5C%5C,%5D%20semi%5B%5C%5C%5C%5C;%5D%20amp%5B%5C&%5D%20plus%5B+%5D%20sym%5B%C2%A7%C2%B1!@%23$%25%5E*()_-=%7C'%22:%7B%7D%3C%3E.%60~?/%5D%20%7C%20%5D%20%5B%5C%5C,3670%5C%5C,Company;9a7116ad-ba84-11e2-a39e-001b21d91495%5C%5C,%5Bbar%5D%20%5B%5C%5C%5C%5C%5C%5C%5C%5C%5C%5C,%5D%20%5B%5C%5C%5C%5C;%5D%20%5B%5C%5C%5C%5C%5C%5C%5C%5C%5C%5C%5C%5C%5C%5C%5C%5C%5D%5C%5C,3192%5C%5C,Company%5D,equals"

  const result = parseUrl(url)

  const filterRaw = result.hash.query?.global_agentSourceFilter

  const filter = new MultiselectFilter<EntityType.Company>(filterRaw!)

  const filterObj = filter.getValue()

  t.equal(filterObj.mode, MultiselectFilterMode.EQUALS, 'should have mode')

  if (filterObj.mode === MultiselectFilterMode.EQUALS) {
    const entity1 = filterObj.entities[0]

    const type: EntityType.Company = entity1.type

    t.equals(type, EntityType.Company, 'should have correct type')

    t.ok(entity1.id, 'should have id field')
  } else {
    /* eslint @typescript-eslint/ban-ts-comment:0 */
    // @ts-expect-error
    filterObj.entities
  }

  const filter2 = new MultiselectFilter<EntityType.Company>(filterObj)

  const filter2Str = filter2.toString()

  t.equals(filterRaw, filter2Str, 'should return reserialized')

  t.end()
})
