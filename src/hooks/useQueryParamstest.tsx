// hooks/useQueryParams.ts
import { useMemo, useCallback } from 'react'
import { useLocation, useNavigate } from 'react-router'

type QueryParams = {
    [key: string]: string | Map<string, string[]> | undefined;
};


export const useQueryParamsTest = () => {
    const location = useLocation()
    const navigate = useNavigate()

    // Получаем текущие параметры из URL
    const queryParams = useMemo(() => {
        return new URLSearchParams(location.search)
    }, [location.search])

    // Установка параметров с сохранением существующих
    const setQueryParams = useCallback((params: QueryParams) => {
        const newParams = new URLSearchParams(location.search);

        Object.entries(params).forEach(([key, value]) => {
            if (value instanceof Map) {
                // Обработка namespace параметров
                Array.from(newParams.keys())
                    .filter(k => k.startsWith(`${key}.`))
                    .forEach(k => newParams.delete(k));

                value.forEach((values, paramKey) => {
                    const fullKey = `${key}.${paramKey}`;
                    newParams.delete(fullKey);
                    values.forEach(v => {
                        if (v) newParams.append(fullKey, v);
                    });
                });
            } else if (value !== undefined) {
                // Обработка простых параметров
                if (!value) {
                    newParams.delete(key);
                } else {
                    newParams.set(key, value);
                }
            }
        });

        navigate({ search: newParams.toString() }, { replace: true });
    }, [location.search, navigate]);

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