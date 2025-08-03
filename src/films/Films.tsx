import { useEffect, useState } from "react"
import Header from "../components/Header"
import FilmFilter from "./FilmFilter"
import FilmAutocompleate from "./FilmAutocompleate"
import Pagination  from "../components/Pagination"
import ApiService from "../services/api-service"
import { useQueryParams } from "../hooks/useQueryParams"
import mapToPath from "../helpers/mapToPath"
import FilmsList from "./FilmsList"
import LoadingDots from "../components/LoadingDots"
import ScrollToTopButton from "../components/ScrollToTopButton"
import { useLocation } from 'react-router'
import { type IPaginationData } from '../interfaces'

const Film = () => {

    const { queryParams, setQueryParams, getParam, getNamespaceParams } = useQueryParams()
    const location = useLocation()
    const [films, setFilms] = useState([])
    const [paginationData, setPaginationData] = useState<IPaginationData | null>(null)
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        if (!queryParams.toString()) {
            setQueryParams({ page, limit })
        }
    }, [])

    useEffect(() => {
        sessionStorage.setItem('previousParams', location.search)
    }, [location.search])

    // я не знаю почему это работает только когда нужно а не всегда скролит
    const scrollToSavedPosition = () => {
        const savedPosition = sessionStorage.getItem('scrollPosition')
        if (savedPosition) {
            window.scrollTo({
                top: Number(savedPosition),
                behavior: 'smooth'
            })
        }
    }

    const page = getParam('page') || '1'
    const limit = getParam('limit') || '10'
    const currentFilters = getNamespaceParams("params")
    const searchName = getParam('name') || ''

    useEffect(() => {
        fetchFunc(currentFilters, searchName)
    }, [page, limit, searchName])

    const fetchFunc = async (params: Map<string, string[]>, searchName: string = '') => {
        setIsLoading(true)
        const paramsPath = mapToPath(params)
        const response = searchName.length > 0 ? await ApiService.getFilmsBySearch(searchName, Number(page), Number(limit)) : await ApiService.getFilmsByFilter(Number(page), Number(limit), paramsPath)
        console.log(response)
        setFilms(response.docs)
        setPaginationData({
            page: response.page,
            pages: response.pages,
            limit: response.limit,
            total: response.total
        })
        setIsLoading(false)
        scrollToSavedPosition()
    }

    const handleChangeName = (name: string) => {
        // fetchFunc(currentFilters, name)
        setQueryParams({ name: name })
    }

    const handleChangePage = (newPage: number) => {
        setQueryParams({ page: String(newPage) })
    }

    const handleChangeLimitPage = (limit: number) => {
        setQueryParams({ limit: String(limit), page: String(1) })
    }

    const setFilterParams = async (params: Map<string, string[]>) => {
        setQueryParams({ params })
        fetchFunc(params, '')
        setQueryParams({ name: '' })
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
                        <FilmAutocompleate changeName={handleChangeName} currentName={searchName}/>
                        {paginationData && 
                            <div className="flex flex-row justify-end min-w-1/2">
                                <Pagination
                                    onPageChange={handleChangePage}
                                    onLimitChange={handleChangeLimitPage}
                                    page={Number(page)}
                                    limit={Number(limit)}
                                    paginationData={paginationData}
                                />
                            </div>
                        }
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