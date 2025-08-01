import { useState, useEffect } from 'react'
import ApiService from "../services/api-service"
import { type IReview } from '../interfaces'
import LoadingDots from '../components/LoadingDots'
import ReviewList from './ReviewList'

const Review = ({ id }:{ id: string }) => {

    const [review, setReview] = useState<IReview[]| null>(null)
    const [isLoading, setIsLoading] = useState(true)


     useEffect(() => {
            fetchFunc()
        }, [id])
    
        const fetchFunc = async () => {
            if (id) {
                setIsLoading(true)
                const response = await ApiService.getReviewByFilmId(id)
                console.log(response)
                setReview(response.docs)
                setIsLoading(false)
            }
        }
    return(
         <>
            {isLoading ?
                <LoadingDots />
                :
                <div className='px-10 py-2 h-full flex flex-col flex-1'>
                    <ReviewList reviewsList={review}/>
                </div>
            }
        </>
    )
}

export default Review