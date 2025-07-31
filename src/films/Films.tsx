import { useEffect, useState } from "react"
import Header from "../components/Header"
import FilmFilter from "./FilmFilter"
import FilmAutocompleate from "./FilmAutocompleate"
import FilmPagination from "./FilmPagination"
import ApiService from "../services/api-service"
import { useQueryParams } from "../hooks/useQueryParams"
import mapToPath from "../helpers/mapToPath"
import FilmsList from "./FilmsList"
import LoadingDots from "../components/LoadingDots"
import ScrollToTopButton from "../components/ScrollToTopButton"

const Film = () => {

    // const { queryParams, setQueryParams, getParam, getNamespaceParams, updateQueryParams, updateNestedParams } = useQueryParams()
    const { setQueryParams, getCurrentParams, getNamespaceParams } = useQueryParams()


    const [films, setFilms] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    // useEffect(() => {
    //     if (!queryParams.toString()) {
    //        updateQueryParams({ 
    //         limit: String(limit), 
    //         page: String(1) 
    //     });
    //     }
    // }, [])
    useEffect(() => {
        const { simple } = getCurrentParams()
        if (!simple.page || !simple.limit) {
            setQueryParams({
                simple: {
                    limit: String(limit), // Используйте ваше значение по умолчанию
                    page: String(1)
                }
            }, false) // merge: false только для инициализации
        }
    }, [])

    // const page = getParam('page') || '1'
    // const limit = getParam('limit') || '10'
    // const currentFilters = getNamespaceParams("params")
    const { simple, nested } = getCurrentParams()
    const page = simple.page || '1'
    const limit = simple.limit || '10'
    const currentFilters = getNamespaceParams("filters")
    // const currentFilters = nested.params || new Map<string, string[]>();
    const paginationData = {}

    useEffect(() => {
        fetchFunc(currentFilters)
    }, [page, limit])

    const fetchFunc = async (params: Map<string, string[]>) => {
        setIsLoading(true)
        const paramsPath = mapToPath(params)
        const response = await ApiService.getFilmsByFilter(Number(page), Number(limit), paramsPath)
        console.log(response)
        setFilms(response.docs)
        setIsLoading(false)
    }

    const handleChangePage = (newPage: number) => {
        // setQueryParams({ page: String(newPage) })
        setQueryParams({
            simple: { page: String(newPage) }
        }, true) // merge: true сохранит другие параметры
        fetchFunc
    }

    const handleChangeLimitPage = (limit: number) => {
        // setQueryParams({ limit: String(limit), page: String(1) })
        setQueryParams({
            simple: {
                limit: String(limit),
                page: String(1) // Сбрасываем на первую страницу
            }
        }, true)
    }

    const setFilterParams = async (params: Map<string, string[]>) => {
        // setQueryParams({ limit: String(limit), page: String(1) })
        // setQueryParams({ params })
        setQueryParams({
            simple: {
                limit: String(limit),
                page: String(1) // Сбрасываем на первую страницу
            },
            nested: {
                filters: params // Сохраняем фильтры
            }
        }, false) // Здесь merge: false чтобы полностью заменить фильтры
        fetchFunc(params)
        fetchFunc(params)
    }

    return (
        <div className="h-full flex flex-col px-2 sm:px-7">
            <Header />
            <div className="flex flex-row w-full ">
                <FilmFilter
                    currentParams={currentFilters}
                    setFiltersParams={setFilterParams}
                />
                <ScrollToTopButton />
                <div className="flex flex-col w-full mb-5">
                    <div className="flex flex-row h-fit w-full mb-5">
                        <FilmAutocompleate />
                        <FilmPagination
                            onPageChange={handleChangePage}
                            onLimitChange={handleChangeLimitPage}
                            page={Number(page)}
                            limit={Number(limit)}
                            paginationData={paginationData}
                        />
                    </div>
                    {isLoading ?
                        <LoadingDots />
                        :
                        <FilmsList
                            films={films}
                        />
                    }
                </div>
            </div>
        </div>
    )
}

export default Film