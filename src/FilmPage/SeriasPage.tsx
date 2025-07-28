// import { useParams } from 'react-router'
import { useState, useEffect } from 'react'
import ApiService from "../services/api-service"
import LoadingDots from '../components/LoadingDots'
import SeriasTab from './SeriasTab'
import type { ISeasons } from "../interfaces"

const SeriasPage = (props: any) => {

    const { id } = props
    // let { id } = useParams()

    const [isLoading, setIsLoading] = useState(true)
    const [seriasInfo, setSeriasInfo] = useState<ISeasons[] | null>(null)


    useEffect(() => {
        fetchFunc()
    }, [])

    const fetchFunc = async () => {
        // setIsLoading(true)
        if (id) {
            const response = await ApiService.getSeasonsById(id)
            console.log(response)
            setSeriasInfo(response.docs)
            setIsLoading(false)

        }
    }


    return (
        <>
            {isLoading ?
                <LoadingDots />
                :
                <div className='px-10 py-2 h-full flex flex-col flex-1'>
                    {seriasInfo && <SeriasTab seasons={seriasInfo}/>}
                </div>
            }
        </>

    )
}

export default SeriasPage