import { useState, useEffect } from 'react'
import FilmService from '../services/film-service'
import { type IReview } from '../interfaces'
import LoadingDots from '../components/LoadingDots'
import ReviewList from './ReviewList'
import ScrollToTopButton from '../components/ScrollToTopButton'
import Pagination from "../components/Pagination"
import { type IPaginationData } from '../interfaces'
import { useAbortController } from '../hooks/useAbortController'

const Review = ({ id }: { id: string }) => {

    const { createAbortController } = useAbortController()
    const controller = createAbortController()

    const [review, setReview] = useState<IReview[] | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [page, setPage] = useState(1)
    const [limit, setLimit] = useState(10)

    const [paginationData, setPaginationData] = useState<IPaginationData | null>(null)

    useEffect(() => {
        fetchFunc()

        return () => controller.abort()
    }, [id, page, limit])

    const fetchFunc = async () => {
        if (id) {
            setIsLoading(true)
            const response = await FilmService.getReviewByFilmId(id, page.toString(), limit.toString(),{signal: controller.signal})
            console.log(response)
            setReview(response.docs)
            setPaginationData({
                page: response.page,
                pages: response.pages,
                limit: response.limit,
                total: response.total
            })
            setIsLoading(false)
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
                            <div className='xl:px-15 py-2 h-full flex flex-col flex-1'>
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