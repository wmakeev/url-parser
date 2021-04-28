import { buildHashQuery } from './buildHashQuery'
import { MOYSKLAD_ENDPOINT } from './defaults'
import {
  FilterParameter,
  FilterParameterClass,
  FilterParameterClassOptions,
  FilterParameterType
} from './filters/FilterParameter'
import { MoyskladUrlObject, parseUrl } from './parseUrl'
import { ensureExist } from './tools/ensure'

export interface InitialFilter {
  endpoint?: string
  hash: MoyskladUrlObject['hash']
  path?: MoyskladUrlObject['path']
  query?: MoyskladUrlObject['query']
}

/**
 * Класс дает набор методов для формирования url МойСклад или получения частей
 * из уже сформированного url.
 */
export class MoyskladUrl {
  private urlObject: MoyskladUrlObject

  /**
   * Создание экземпляра описывающего фильтр МойСклад
   *
   * @param filter url строка или объект с описанием компонентов url
   */
  constructor(filter: string | InitialFilter) {
    if (typeof filter === 'string') {
      this.urlObject = parseUrl(filter)
    } else {
      this.urlObject = {
        endpoint: filter.endpoint ?? MOYSKLAD_ENDPOINT,
        hash: ensureExist(filter.hash, 'Не указано значение hash'),
        path: filter.path ?? ['app'],
        query: filter.query
      }
    }
  }

  getEndpoint() {
    return this.urlObject?.endpoint
  }

  getHashPath() {
    return this.urlObject?.hash.path
  }

  getHashQuery() {
    return this.urlObject?.hash.query
  }

  getPath() {
    return this.urlObject?.path
  }

  addFilter<T extends FilterParameter>(
    parameter: T,
    filter: FilterParameterType[T]
  ): this {
    if (!this.urlObject.hash.query) this.urlObject.hash.query = {}

    this.urlObject.hash.query[parameter] = filter.toString()

    return this
  }

  // FIXME Нужно расширить тип и убрать any ..
  // .. вероятно если нет класса, то возвращать строку (такое можно затипизировать?)
  getFilter<T extends FilterParameter>(
    parameter: T,
    options?: T extends keyof FilterParameterClassOptions
      ? FilterParameterClassOptions[T]
      : never
  ): FilterParameterType[T] | null {
    const filterString = this.getHashQuery()?.[parameter]

    // TODO Нужно расширить тип и убрать any
    /* eslint @typescript-eslint/no-explicit-any:0 */
    const FilterClass: any = FilterParameterClass[parameter] //

    if (filterString && FilterClass) {
      return new FilterClass(filterString as string, options)
    } else {
      return null
    }
  }

  toString() {
    let baseUrl = `https://${this.getEndpoint()}`

    const path = this.getPath().join('/')

    if (path) {
      baseUrl += `/${path}`
    }

    // TODO Добавить QueryString
    // const query = this.urlObject.query

    const hashPath = this.getHashPath()

    if (hashPath?.length) {
      baseUrl += `/#${hashPath.join('/')}`
    }

    const hashQuery = this.getHashQuery()

    if (hashQuery && Object.keys(hashQuery).length > 0) {
      baseUrl += `?${buildHashQuery(hashQuery)}`
    }

    // TODO Возможно, предварительно пропускать готовую ссылку через модуль URL
    return baseUrl
  }
}
