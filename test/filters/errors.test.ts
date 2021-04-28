import test from 'blue-tape'
import { MoyskladUrl } from '../../src/MoyskladUrl'

test('CustomerOrderShippingStatusFilter', t => {
  const wrongUrl =
    'https://online.moysklad.ru/app/#finance?global_expenseItemFilter=%5B24b7a16d-4770-11e7-7a6c-d2a90041d527%5C%5C,%D0%9F%D1%80%D0%B5%D0%BC%D0%B8%D0%B8%20(%D0%B2%D1%8B%D1%85%D0%BE%D0%B4%20%D0%B2%20%D0%BD%D0%B5%D1%80%D0%B0%D0%B1%D0%BE%D1%87%D0%B8%D0%B9%20%D0%B4%D0%B5%D0%BD%D1%8C%5C%5C%5C%5C%5C%5C%5C%5C%5C%5C,%20%D0%BF%D0%BE%D0%BA%D0%BB%D0%B5%D0%B9%D0%BA%D0%B0%20%D0%B4%D0%B8%D1%84%D1%84%D1%83%D0%B7%D0%BE%D1%80%D0%BE%D0%B2%5C%5C%5C%5C%5C%5C%5C%5C%5C%5C,%20%D0%BF%D0%B5%D1%80%D0%B5%D1%83%D1%87%D0%B5%D1%82%20%D0%B8%20%D0%B4%D1%80.)%5C%5C,%D0%9F%D1%80%D0%B5%D0%BC%D0%B8%D0%B8%20(%D0%B2%D1%8B%D1%85%D0%BE%D0%B4%20%D0%B2%20%D0%BD%D0%B5%D1%80%D0%B0%D0%B1%D0%BE%D1%87%D0%B8%D0%B9%20%D0%B4%D0%B5%D0%BD%D1%8C%5C%5C%5C%5C%5C%5C%5C%5C%5C%5C,%20%D0%BF%D0%BE%D0%BA%D0%BB%D0%B5%D0%B9%D0%BA%D0%B0%20%D0%B4%D0%B8%D1%84%D1%84%D1%83%D0%B7%D0%BE%D1%80%D0%BE%D0%B2%5C%5C%5C%5C%5C%5C%5C%5C%5C%5C,%20%D0%BF%D0%B5%D1%80%D0%B5%D1%83%D1%87%D0%B5%D1%82%20%D0%B8%20%D0%B4%D1%80.)%5C%5C'

  const filter = new MoyskladUrl(wrongUrl)

  t.ok(filter) // TODO Проверить битую ссылку

  t.end()
})
