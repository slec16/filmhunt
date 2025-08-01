import ReviewCard from "./ReviewCard"
import { type IReview } from "../interfaces"

type ReviewListProps = {
    reviewsList: IReview[] | null
}

const ReviewList = (props: ReviewListProps) => {

    const review = props.reviewsList

    return(
        <div className="flex flex-row flex-wrap gap-2">
            {review && review.map(el => {
                return(
                    <ReviewCard key={el.id} review={el}/>
                )
            })}
        </div>
    )
}

export default ReviewList   