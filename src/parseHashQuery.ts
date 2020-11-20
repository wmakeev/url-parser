import 'ts-replace-all'

export function parseHashQuery(queryString: string) {
  const queryParams = {} as Record<string, string | null>

  if (queryString) {
    const parts = queryString.split(/(?<!%5C)&/g).map(it =>
      it
        // "%5C&" - экранированный "&"
        .replaceAll('%5C&', '&')
        // Дополнительно экранируем "+"
        .replaceAll('+', '%2B')
    )

    parts.forEach(queryPart => {
      // "=" не экранируется и не декодируется в значении
      const eqIndex = queryPart.indexOf('=')

      if (eqIndex === -1) {
        queryParams[queryPart] = null
      } else if (eqIndex > 0) {
        const key = queryPart.slice(0, eqIndex)
        const value = queryPart.slice(eqIndex + 1)

        const decodedValue =
          value !== ''
            ? decodeURIComponent(value) // TODO Почему не decodeURI?
                // изначальная строка в фильтре экранирована дважды
                .replaceAll(/\\\\/g, '\\')
            : null

        queryParams[key] = decodedValue
      } else {
        throw new Error(
          `Некорректное значение в строке запроса - "${queryPart}"`
        )
      }
    })
  }

  return queryParams
}
