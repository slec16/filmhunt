import { useState, useEffect } from 'react'
import FilmService from '../services/film-service'
import LoadingDots from '../components/LoadingDots'
import SeriasTab from './SeriasTab'
import type { ISeasons } from "../interfaces"
import { useAbortController } from '../hooks/useAbortController'

type SeriasPageProps = {
    id: string,
    poster?: {
        previewUrl: string,
        url: string
    }
}

const SeriasPage = (props: SeriasPageProps) => {

    const { id, poster } = props

    const { createAbortController } = useAbortController()
    const controller = createAbortController()

    const [isLoading, setIsLoading] = useState(true)
    const [seriasInfo, setSeriasInfo] = useState<ISeasons[] | null>(null)


    useEffect(() => {
        fetchFunc()

        return () => controller.abort()
    }, [])

    const fetchFunc = async () => {
        if (id) {
            const response = await FilmService.getSeasonsById(id, {signal: controller.signal})
            setSeriasInfo(response.docs)
            setIsLoading(false)

        }
    }


    return (
        <>
            {isLoading ?
                <LoadingDots />
                :
                <div className='xl:px-10 py-2 h-full flex flex-col flex-1'>
                    {seriasInfo && <SeriasTab seasons={seriasInfo} poster={poster} />}
                </div>
            }
        </>

    )
}

export default SeriasPage