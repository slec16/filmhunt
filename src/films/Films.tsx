import { useEffect, useState } from "react"
import Header from "../components/Header"
import FilmFilter from "./FilmFilter"
import FilmListHeader from './FilmsListHeader'
import FilmSearch from "./FilmSearch"
import FilmAutocompleate from "./FilmAutocompleate"
import FilmPagination from "./FilmPagination"
import ApiService from "../services/api-service"
import { useQueryParams } from "../hooks/useQueryParams"
import MovieCard from "./FilmCard"
import mapToPath from "../helpers/mapToPath"

const Film = () => {

    const { queryParams, setQueryParams, getParam } = useQueryParams()

    useEffect(() => {
        if (!queryParams.toString()) {
            setQueryParams({ page, limit })
        }
    }, [])

    const page = getParam('page') || '1'
    const limit = getParam('limit') || '10'

    const paginationData = {}
    
    useEffect(() => {
       fetchFunc()
    }, [])

    const fetchFunc = async() => {
        // const response = await ApiService.getFilmsByFilter(Number(page), Number(limit))
        // console.log(response)
    }

    
    

    const handleChangePage = ( newPage: number ) => {
        setQueryParams({ page: String(newPage) })
    }

    const handleChangeLimitPage = (limit: number) => {
        setQueryParams({ limit: String(limit), page: String(1) })
    }

    const setFilterParams = async(params: Map<string, string[]>) => {
        // console.log(params)
        const paramsPath =  mapToPath(params)
        const response = await ApiService.getFilmsByFilter(Number(page), Number(limit), paramsPath)
        console.log(response)
    }

    return(
        <div className="h-full flex flex-col">
            <Header />
            <div className="flex flex-row w-full ">
                <FilmFilter 
                    setFiltersParams={setFilterParams}
                />
                <div className="flex flex-row h-fit w-full">
                    <FilmAutocompleate /> 
                    <FilmPagination 
                        onPageChange={handleChangePage}
                        onLimitChange={handleChangeLimitPage}
                        page={Number(page)}
                        limit={Number(limit)}
                        paginationData={paginationData}
                    />
                </div>
            </div>  
            {/* <button onClick={getFilms} className="bg-amber-500 px-4 py-2 rounded-lg hover:bg-amber-200">Get films</button> */}
            {/* <FilmLst /> */}
        </div>
    )
}

export default Film