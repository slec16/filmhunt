// hooks/useQueryParams.ts
import { useMemo } from 'react'
import { useLocation, useNavigate } from 'react-router'

export const useQueryParams = () => {
    const location = useLocation()
    const navigate = useNavigate()

    // Получаем текущие параметры из URL
    const queryParams = useMemo(() => {
        return new URLSearchParams(location.search)
    }, [location.search])

    // Установка параметров
    const setQueryParams = (params: Record<string, string> | Record<string, Map<string, string[]>>) => {

        const newParams = new URLSearchParams(location.search)

        const hasNestedMaps = Object.values(params).some(
            (value) => value instanceof Map
        )

        if (hasNestedMaps) {
            Object.entries(params as Record<string, Map<string, string[]>>).forEach(
                ([namespace, map]) => {
                    // Удаляем все существующие параметры этого namespace
                    Array.from(newParams.keys())
                        .filter(key => key.startsWith(`${namespace}.`))
                        .forEach(key => newParams.delete(key))

                    // Добавляем новые параметры
                    map?.forEach((values, paramKey) => {
                        const fullKey = `${namespace}.${paramKey}`
                        // Удаляем старые значения
                        newParams.delete(fullKey)
                        // Добавляем новые значения
                        values.forEach(value => {
                            if (value !== '' && value !== null && value !== undefined) {
                                newParams.append(fullKey, value)
                            }
                        })
                    })
                }
            )
        } else {
            Object.entries(params as Record<string, string>).forEach(([key, value]) => {
                if (value === '' || value === null || value === undefined) {
                    newParams.delete(key)
                } else {
                    newParams.set(key, value)
                }
            })
        }


        navigate({ search: newParams.toString() }, { replace: true })
    }


    const getNamespaceParams = (namespace: string) => {
        const result = new Map<string, string[]>()

        Array.from(queryParams.keys()).forEach(key => {
            if (key.startsWith(`${namespace}.`)) {
                const paramKey = key.substring(namespace.length + 1)
                const values = queryParams.getAll(key)
                result.set(paramKey, values)
            }
        })

        return result
    }

    const getAllParams = (key: string) => queryParams.getAll(key)

    return {
        queryParams,
        setQueryParams,
        getParam: (key: string) => queryParams.get(key),
        getAllParams,
        getNamespaceParams,
        currentParams: Object.fromEntries(queryParams.entries())
    }
}