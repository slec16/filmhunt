import { useEffect, useState, useRef, useMemo, useCallback } from "react"
import Header from "../components/Header"
import FilmFilter from "./FilmFilter"
import FilmAutocompleate from "./FilmAutocompleate"
import Pagination from "../components/Pagination"
import FilmService from "../services/film-service"
// import { useQueryParams } from "../hooks/useQueryParams"
import { objToPath } from "../utils/mapToPath"
import FilmsList from "./FilmsList"
import LoadingDots from "../components/LoadingDots"
import ScrollToTopButton from "../components/ScrollToTopButton"
import { useLocation, useNavigate } from 'react-router'
import { type IPaginationData } from "../interfaces"
// import AutorenewIcon from '@mui/icons-material/Autorenew'
import CasinoIcon from '@mui/icons-material/Casino'
import AnimatedButton from "../components/AnimatedButton"
import { useQueryParamsTest } from '../hooks/useQueryParamstest'
import { useAbortController } from '../hooks/useAbortController'
import { debounce } from "../utils/debounce"
import { useMediaQuery } from "@uidotdev/usehooks";

type FilmAutocompleateRef = {
    clearSearchName: () => void;
};

const Film = () => {

    const { queryParams, setQueryParams, getParam, getNamespaceParams } = useQueryParamsTest()
    const { createAbortController } = useAbortController()
    const controller = createAbortController()
    const location = useLocation()
    const navigate = useNavigate()

    const [films, setFilms] = useState([])
    const [paginationData, setPaginationData] = useState<IPaginationData | null>(null)
    const [isLoading, setIsLoading] = useState(false)
    // const [isLoadingMoreFilms, setIsLoadingMoreFilms] = useState(false)

    const isSmallDevise = useMediaQuery("only screen and (max-width : 768px)")

    const filmAutocompleateRef = useRef<FilmAutocompleateRef | null>(null);

    console.log('film main comp render')

    useEffect(() => {
        const page = getParam('page') || '1'
        const limit = getParam('limit') || '10'
        const currentFilters = getNamespaceParams("filters")
        const searchName = getParam('name') || ''
        fetchFunc(page, limit, currentFilters, searchName)

        return () => controller.abort()
    }, [location.search])


    const fetchFunc = async (page: string, limit: string, filters: Record<string, string[]>, searchName: string) => {
        setIsLoading(true)
        const paramsPath = objToPath(filters)
        const response = searchName.length > 0 ?
            await FilmService.getFilmBySearch(Number(page), Number(limit), searchName, { signal: controller.signal }) :
            await FilmService.getFilmsByFilter(Number(page), Number(limit), { signal: controller.signal }, paramsPath)
        console.log(response)
        setFilms(response.docs)
        setPaginationData({
            page: response.page,
            pages: response.pages,
            limit: response.limit,
            total: response.total
        })
        setIsLoading(false)
    }

    const page = getParam('page') || '1'
    const limit = getParam('limit') || '10'
    const currentFilters = getNamespaceParams("filters")
    const stableFilters = useMemo(() => currentFilters, [JSON.stringify(currentFilters)])
    const searchName = getParam('name') || ''


    const handleChangeName = debounce((name: string) => {
        setQueryParams({
            page: '1',
            filters: {},
            name: name
        })
    }, 500)

    const handleChangePage = (newPage: number) => {
        setQueryParams({ page: String(newPage) })
    }

    const handleChangeLimitPage = (limit: number) => {
        setQueryParams({ limit: String(limit), page: String(1) })
    }

    const setFilterParams = async (params: Record<string, string[]>) => {
        filmAutocompleateRef.current?.clearSearchName()
        setQueryParams({
            page: '1',
            filters: params,
            name: ''
        })
    }

    //TODO - доделать подгрузку, сохранив url-driven, надо redux
    // const handleLoadMore = async () => {
    // if (Number(page) == paginationData?.pages) return
    // setIsLoadingMoreFilms(true)
    // setQueryParams({ page: String(Number(page) + 1) })
    // const response = searchName.length > 0 ?
    //     await ApiService.getFilmsBySearch(Number(page) + 1, Number(limit), searchName) :
    //     await ApiService.getFilmsByFilter(Number(page) + 1, Number(limit), objToPath(getNamespaceParams('filters')))
    // console.log(response)
    // //@ts-ignore
    // setFilms((prevFilms) => [...prevFilms, ...response.docs]) //TODO types
    // setIsLoadingMoreFilms(false)
    /*
        const saveArr = films
    */
    // }

    return (
        <div className="h-full flex flex-col px-4 xl:px-7">
            <Header />
            <div className="flex flex-row w-full ">
                <div className="flex flex-col mr-5 space-y-5">
                    <FilmFilter
                        // currentParamsObj={currentFilters}
                        currentParamsObj={stableFilters}
                        setFiltersParams={setFilterParams}
                    />
                    {!isSmallDevise &&
                        <AnimatedButton
                            icon={<CasinoIcon className="w-6 h-6" />}
                            text="Случайный фильм"
                            onClick={() => navigate('/random')}
                        />
                    }
                </div>
                <ScrollToTopButton />
                <div className="flex flex-col w-full mb-5">
                    <div className="flex flex-col xl:flex-row h-fit w-full mb-5 gap-y-2">
                        <FilmAutocompleate changeName={handleChangeName} currentName={searchName} ref={filmAutocompleateRef} />
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

                        <FilmsList
                            films={films}
                        />
                        // <div className="w-full flex flex-row justify-center mt-3">
                        //     <button onClick={handleLoadMore} className={`${(paginationData && Number(page) >= paginationData?.pages) && 'hidden'} w-fit px-5 py-2 border border-orange-500 text-orange-500 rounded-md hover:bg-orange-500 hover:text-white transition-colors flex flex-row justify-center gap-x-1`}>
                        //         Загрузить еще
                        //         {isLoadingMoreFilms &&
                        //             <AutorenewIcon className="animate-spin" />
                        //         }
                        //     </button>
                        // </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default Film