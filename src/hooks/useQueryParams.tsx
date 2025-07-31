// // hooks/useQueryParams.ts
// import { useMemo } from 'react'
// import { useLocation, useNavigate } from 'react-router'

// export const useQueryParams = () => {
//     const location = useLocation()
//     const navigate = useNavigate()

//     // Получаем текущие параметры из URL
//     const queryParams = useMemo(() => {
//         return new URLSearchParams(location.search)
//     }, [location.search])

//     // Установка параметров
//     const setQueryParams = (params: Record<string, string> | Record<string, Map<string, string[]>>, merge: boolean = false) => {

//         const newParams = merge ? new URLSearchParams(location.search) : new URLSearchParams();

//         const hasNestedMaps = Object.values(params).some(
//             (value) => value instanceof Map
//         )

//         if (hasNestedMaps) {
//             Object.entries(params as Record<string, Map<string, string[]>>).forEach(
//                 ([namespace, map]) => {
//                     // Удаляем все существующие параметры этого namespace
//                     Array.from(newParams.keys())
//                         .filter(key => key.startsWith(`${namespace}.`))
//                         .forEach(key => newParams.delete(key))

//                     // Добавляем новые параметры
//                     map?.forEach((values, paramKey) => {
//                         const fullKey = `${namespace}.${paramKey}`
//                         // Удаляем старые значения
//                         newParams.delete(fullKey)
//                         // Добавляем новые значения
//                         values.forEach(value => {
//                             if (value !== '' && value !== null && value !== undefined) {
//                                 newParams.append(fullKey, value)
//                             }
//                         })
//                     })
//                 }
//             )
//         } else {
//             Object.entries(params as Record<string, string>).forEach(([key, value]) => {
//                 if (value === '' || value === null || value === undefined) {
//                     newParams.delete(key)
//                 } else {
//                     newParams.set(key, value)
//                 }
//             })
//         }


//         navigate({ search: newParams.toString() }, { replace: true })
//     }


//     const getNamespaceParams = (namespace: string) => {
//         const result = new Map<string, string[]>()

//         Array.from(queryParams.keys()).forEach(key => {
//             if (key.startsWith(`${namespace}.`)) {
//                 const paramKey = key.substring(namespace.length + 1)
//                 const values = queryParams.getAll(key)
//                 result.set(paramKey, values)
//             }
//         })

//         return result
//     }

//     const getAllParams = (key: string) => queryParams.getAll(key)

//     const updateQueryParams = (updates: Record<string, string>, merge: boolean = true) => {
//         setQueryParams(updates, merge);
//     }

//     const updateNestedParams = (namespace: string, params: Map<string, string[]>, merge: boolean = true) => {
//         setQueryParams({ [namespace]: params }, merge);
//     }

//     return {
//         queryParams,
//         setQueryParams,
//         getParam: (key: string) => queryParams.get(key),
//         getAllParams,
//         getNamespaceParams,
//         updateQueryParams,
//         updateNestedParams,
//         currentParams: Object.fromEntries(queryParams.entries())
//     }
// }


// hooks/useQueryParams.ts
import { useMemo } from 'react'
import { useLocation, useNavigate } from 'react-router'

type QueryParams = {
  simple: Record<string, string>;
  nested: Record<string, Map<string, string[]>>;
};

export const useQueryParams = () => {
  const location = useLocation()
  const navigate = useNavigate()

  const queryParams = useMemo(() => new URLSearchParams(location.search), [location.search])

  // Получаем текущие параметры в структурированном виде
  const getCurrentParams = (): QueryParams => {
    const simple: Record<string, string> = {}
    const nested: Record<string, Map<string, string[]>> = {}

    Array.from(queryParams.keys()).forEach(key => {
      if (key.includes('.')) {
        const [namespace, param] = key.split('.')
        if( namespace && param ){

            if (!nested[namespace]) {
              nested[namespace] = new Map()
            }
            nested[namespace].set(param, queryParams.getAll(key))
        }
      } else {
        simple[key] = queryParams.get(key) || ''
      }
    })

    return { simple, nested }
  }

  // Основная функция установки параметров
  const setQueryParams = (
    updates: {
      simple?: Record<string, string>;
      nested?: Record<string, Map<string, string[]>>;
    },
    merge: boolean = true
  ) => {
    const current = merge ? getCurrentParams() : { simple: {}, nested: {} }
    const newParams = new URLSearchParams()

    // Объединяем простые параметры
    const mergedSimple = { ...current.simple, ...(updates.simple || {}) }
    Object.entries(mergedSimple).forEach(([key, value]) => {
      if (value) newParams.set(key, value)
    })

    // Объединяем вложенные параметры
    const mergedNested = { ...current.nested, ...(updates.nested || {}) }
    Object.entries(mergedNested).forEach(([namespace, map]) => {
      map.forEach((values, param) => {
        values.forEach(value => {
          if (value) newParams.append(`${namespace}.${param}`, value)
        })
      })
    })

    navigate({ search: newParams.toString() }, { replace: true })
  }

  return {
    queryParams,
    setQueryParams,
    getCurrentParams,
    getParam: (key: string) => queryParams.get(key),
    getAllParams: (key: string) => queryParams.getAll(key),
    getNamespaceParams: (namespace: string) => {
      const result = new Map<string, string[]>()
      Array.from(queryParams.keys())
        .filter(key => key.startsWith(`${namespace}.`))
        .forEach(key => {
          const param = key.substring(namespace.length + 1)
          result.set(param, queryParams.getAll(key))
        })
      return result
    }
  }
}