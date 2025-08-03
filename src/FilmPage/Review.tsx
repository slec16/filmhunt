import { useState, useEffect } from 'react'
import ApiService from "../services/api-service"
import { type IReview } from '../interfaces'
import LoadingDots from '../components/LoadingDots'
import ReviewList from './ReviewList'
import ScrollToTopButton from '../components/ScrollToTopButton'
import Pagination from "../components/Pagination"
import { type IPaginationData } from '../interfaces'

const Review = ({ id }: { id: string }) => {

    const [review, setReview] = useState<IReview[] | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [page, setPage] = useState(1)
    const [limit, setLimit] = useState(10)

    const [paginationData, setPaginationData] = useState<IPaginationData | null>(null)

    useEffect(() => {
        fetchFunc()
    }, [id, page, limit])

    const fetchFunc = async () => {
        if (id) {
            setIsLoading(true)
            const response = await ApiService.getReviewByFilmId(id, page.toString(), limit.toString())
            console.log(response)
            setReview(response.docs)
            setIsLoading(false)
            setPaginationData({
                page: response.page,
                pages: response.pages,
                limit: response.limit,
                total: response.total
            })
        }
    }

    const handleChangePage = (newPage: number) => {
        setPage(newPage)
    }

    const handleChangeLimitPage = (newLimit: number) => {
        setPage(1)
        setLimit(newLimit)
    }

    return (
        <>
            {isLoading ?
                <LoadingDots />
                :
                <>
                    {review?.length === 0 ?
                        <div className='flex w-full justify-center mt-10'><span className='text-3xl text-orange-400'>Отзывов нет</span></div>
                        :
                        <>
                            <ScrollToTopButton />
                            <div className='px-15 py-2 h-full flex flex-col flex-1'>
                                {paginationData && 
                                    <div className='flex flex-row w-full justify-start my-5'>
                                        <Pagination
                                            page={page}
                                            limit={limit}
                                            onPageChange={handleChangePage}
                                            onLimitChange={handleChangeLimitPage}
                                            paginationData={paginationData}
                                        />
                                    </div>}
                                <ReviewList reviewsList={review} />
                            </div>
                        </>
                    }
                </>
            }
        </>
    )
}

export default Review