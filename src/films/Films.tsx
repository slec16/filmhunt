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

const Film = () => {

    const { queryParams, setQueryParams, getParam, getNamespaceParams } = useQueryParams()

    const [films, setFilms] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        if (!queryParams.toString()) {
            setQueryParams({ page, limit })
        }
    }, [])

    const page = getParam('page') || '1'
    const limit = getParam('limit') || '10'
    const currentFilters = getNamespaceParams("params")
    const paginationData = {}
    
    // useEffect(() => {
    //    fetchFunc()
    // }, [])

    // const fetchFunc = async() => {
        // const response = await ApiService.getFilmsByFilter(Number(page), Number(limit))
        // console.log(response)
    // }

    
    

    const handleChangePage = ( newPage: number ) => {
        setQueryParams({ page: String(newPage) })
    }

    const handleChangeLimitPage = (limit: number) => {
        setQueryParams({ limit: String(limit), page: String(1) })
    }

    const setFilterParams = async(params: Map<string, string[]>) => {
        console.log(params)
        setQueryParams({ params })
        setIsLoading(true)
        const paramsPath = mapToPath(params)
        const response = await ApiService.getFilmsByFilter(Number(page), Number(limit), paramsPath)
        console.log(response)
        setFilms(response.docs)
        setIsLoading(false)
    }

    return(
        <div className="h-full flex flex-col">
            <Header />
            <div className="flex flex-row w-full ">
                <FilmFilter 
                    currentParams={currentFilters}
                    setFiltersParams={setFilterParams}
                />
                <div className="flex flex-col w-full">
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