import { useParams } from 'react-router'
import { useState, useEffect } from 'react'
import ApiService from "../services/api-service"
import FilmInfo from './FilmInfo'
import LoadingDots from '../components/LoadingDots'
import Tabs from '../components/Tabs'
import FilmDetails from './FilmDetails'
import SeriasPage from './SeriasPage'
import type { IFilmInfo, ISimilarMovies, IFilmDetail } from '../interfaces'
import Review from './Review'


const FilmPage = () => {

    const [filmInfo, setFilmInfo] = useState<IFilmInfo | null>(null)
    const [filmmDetail, setFilmDetail] = useState<IFilmDetail| null>(null)
    const [similarMovies, setSimilarMovies] = useState<ISimilarMovies[] | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [isSeries, setIsSeries] = useState(false)


    let { id } = useParams()
   

    useEffect(() => {
        fetchFunc()
    }, [id])

    const fetchFunc = async () => {
        if (id) {
            setIsLoading(true)
            const response = await ApiService.getFilmById(id)
            console.log(response)
            setIsSeries(response.isSeries)
            response.similarMovies && setSimilarMovies(response.similarMovies)
            setFilmInfo(response)
            setFilmDetail(response)
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
            content: id && <SeriasPage id={id} poster={filmInfo?.backdrop}/>
        },
        {
            id: 'details',
            label: 'Детали',
            content: filmmDetail && <FilmDetails filmDetail={filmmDetail} similarMovies={similarMovies}/>
        },
        {
            id: 'review',
            label: 'Отзывы',
            content: id && <Review id={id}/>,
        },
    ]

    return (
        <>
            {isLoading ?
                <LoadingDots />
                :
                <div className='px-10 py-2 h-full flex flex-col flex-1'>
                    <Tabs tabs={tabs} defaultActiveId="description" isSeries={isSeries} />
                </div>
            }
        </>

    )
}

export default FilmPage