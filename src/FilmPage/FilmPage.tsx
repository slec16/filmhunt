import { useParams } from 'react-router'
import { useState, useEffect } from 'react'
import ApiService from "../services/api-service"
import FilmInfo from './FilmInfo'
import LoadingDots from '../components/LoadingDots'
import Tabs from '../components/Tabs'
import SimilarMovies from "./SimilarMovies"
import type { IFilmInfo, ISimilarMovies } from '../interfaces'


const FilmPage = () => {

    const [filmInfo, setFilmInfo] = useState<IFilmInfo | null>(null)
    const [similarMovies, setSimilarMovies] = useState<ISimilarMovies[] | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [isSeries, setIsSeries] = useState(false)


    let { id } = useParams()
   

    useEffect(() => {
        fetchFunc()
    }, [])

    const fetchFunc = async () => {
        if (id) {
            setIsLoading(true)
            const response = await ApiService.getFilmById(id)
            console.log(response)
            setIsSeries(response.isSeries)
            response.similarMovies && setSimilarMovies(response.similarMovies)
            setFilmInfo(response)
            setIsLoading(false)
        }
    }

    const tabs = [
        {
            id: 'description',
            label: 'Описание',
            content: filmInfo && <FilmInfo filmInfo={filmInfo} />
        },
        {
            id: 'series',
            label: 'Серии и сезоны',
            content: <div>Список серий</div>,
        },
        {
            id: 'details',
            label: 'Детали',
            content: similarMovies && <SimilarMovies similarMovies={similarMovies} />
        },
        {
            id: 'review',
            label: 'Отзывы',
            content: <div>Отзывы</div>,
        },
    ]

    return (
        <>
            {isLoading ?
                <LoadingDots />
                :
                <div className='px-10 py-2 h-full flex flex-col flex-1'>
                    <Tabs tabs={tabs} defaultActiveId="description" isSeries={isSeries} />
                    {/* tabs */}
                    {/* back button */}
                    {/* <FilmInfo
                        filmInfo={filmInfo}
                    /> */}
                    
                </div>
            }
        </>

    )
}

export default FilmPage