import { useEffect, useState, useRef } from "react"
import Header from "../components/Header"
import FilmFilter from "./FilmFilter"
import FilmAutocompleate from "./FilmAutocompleate"
import Pagination  from "../components/Pagination"
import ApiService from "../services/api-service"
// import { useQueryParams } from "../hooks/useQueryParams"
import mapToPath from "../helpers/mapToPath"
import FilmsList from "./FilmsList"
import LoadingDots from "../components/LoadingDots"
import ScrollToTopButton from "../components/ScrollToTopButton"
import { useLocation } from 'react-router'
import { type IPaginationData } from "../interfaces"
import LoopIcon from '@mui/icons-material/Loop';

import { useQueryParamsTest } from '../hooks/useQueryParamstest'

type FilmAutocompleateRef = {
  clearSearchName: () => void;
};

const Film = () => {

    // const { queryParams, setQueryParams, getParam, getNamespaceParams } = useQueryParams()
    const { queryParams, setQueryParams, getParam, getNamespaceParams } = useQueryParamsTest()

    const location = useLocation()
    const [films, setFilms] = useState([])
    const [paginationData, setPaginationData] = useState<IPaginationData | null>(null)
    const [isLoading, setIsLoading] = useState(false)
    const [isLoadingMoreFilms, setIsLoadingMoreFilms] = useState(false)

    const filmAutocompleateRef = useRef<FilmAutocompleateRef | null>(null);

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
    const currentFilters = getNamespaceParams("filters")
    const searchName = getParam('name') || ''

    useEffect(() => {
        fetchFunc(Number(page), Number(limit), currentFilters, searchName)
    }, [])

    const fetchFunc = async(page: number, limit: number, params: Map<string, string[]>, searchName: string = '') => {
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
        setQueryParams({ 
            name: name, 
            page: '1',
            filters: new Map()
        })
        fetchFunc(1, Number(limit), currentFilters, name )
    }

    const handleChangePage = (newPage: number) => {
        setQueryParams({ page: String(newPage) })
        fetchFunc(newPage, Number(limit), currentFilters, searchName)
    }

    const handleChangeLimitPage = (limit: number) => {
        setQueryParams({ limit: String(limit), page: String(1) })
        fetchFunc(1, limit, currentFilters, searchName)
    }

    const setFilterParams = async (params: Map<string, string[]>) => {
        filmAutocompleateRef.current?.clearSearchName()
        setQueryParams({
            page: '1',
            filters: params,
            name: ''
        })
        fetchFunc(Number(1), Number(limit), params)
    }

    const handleLoadMore = async() => {
        setIsLoadingMoreFilms(true)
        setQueryParams({ page: String(Number(page)+1) })
        const response = searchName.length > 0 ? 
            await ApiService.getFilmsBySearch(searchName, Number(page)+1, Number(limit)) :
            await ApiService.getFilmsByFilter(Number(page)+1, Number(limit), mapToPath(getNamespaceParams('filters')))
        console.log(response)
        setFilms((prevFilms) => [...prevFilms, ...response.docs]) //TODO types
        setIsLoadingMoreFilms(false)
    }

    return (
        <div className="h-full flex flex-col px-4 xl:px-7">
            <Header />
            <div className="flex flex-row w-full ">
                <FilmFilter
                    currentParams={currentFilters}
                    setFiltersParams={setFilterParams}
                />
                <ScrollToTopButton />
                <div className="flex flex-col w-full mb-5">
                    <div className="flex flex-col xl:flex-row h-fit w-full mb-5 gap-y-2">
                        <FilmAutocompleate changeName={handleChangeName} currentName={searchName} ref={filmAutocompleateRef}/>
                        {paginationData && 
                            <div className="flex flex-row justify-start xl:justify-end min-w-1/2">
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
                        <>
                            <FilmsList
                                films={films}
                            />
                            <div onClick={handleLoadMore} className="w-full flex flex-row justify-center mt-3">
                                <button className="w-fit px-5 py-2 border border-orange-500 text-orange-500 rounded-md hover:bg-orange-500 hover:text-white transition-colors flex flex-row justify-center gap-x-1">
                                    Загрузить еще
                                    {isLoadingMoreFilms && 
                                       <LoopIcon className="animate-spin" />
                                    }
                                </button>
                            </div>
                        </>
                    }
                </div>
            </div>
        </div>
    )
}

export default Film