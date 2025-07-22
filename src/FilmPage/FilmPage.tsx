import { useParams } from 'react-router'
import { useState, useEffect } from 'react'
import ApiService from "../services/api-service"
import FilmInfo from './FilmInfo'
import LoadingDots from '../components/LoadingDots'
import Tabs from '../components/Tabs'


const FilmPage = () => {

    const [filmInfo, setFilmInfo] = useState({})
    const [isLoading, setIsLoading] = useState(true)

    let { id } = useParams()
    const tabs = [
        {
            id: 'description',
            label: 'Описание',
            content: <FilmInfo filmInfo={filmInfo} /> 
        },
        {
            id: 'series',
            label: 'Серии и сезоны',
            content: <div>Список серий</div>,
        },
        {
            id: 'details',
            label: 'Детали',
            content: <div>Детали</div>,
        },
    ]

    useEffect(() => {
        fetchFunc()
    }, [])

    const fetchFunc = async () => {
        if (id) {
            setIsLoading(true)
            const response = await ApiService.getFilmById(id)
            console.log(response)
            setFilmInfo(response)
            setIsLoading(false)
        }
    }

    return (<div>

        {isLoading ?
            <LoadingDots />
            :
            <div>
                <div className='pt-2' />
                <Tabs tabs={tabs} defaultActiveId="description" />
                {/* tabs */}
                {/* back button */}
                {/* <FilmInfo
                    filmInfo={filmInfo}
                /> */}
                {/* similar films */}
            </div>
        }
    </div>

    )
}

export default FilmPage