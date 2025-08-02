import { useState } from "react"
import { type IReview } from "../interfaces"
import StarIcon from '@mui/icons-material/Star'
import ThumbUpIcon from '@mui/icons-material/ThumbUp'
import ThumbDownIcon from '@mui/icons-material/ThumbDown'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';


interface ReviewCardProps {
    review: IReview
}

const ReviewCard = (props: ReviewCardProps) => {

    const review = props.review

    const formatDate = (dateString: string) => {
        const date = new Date(dateString)
        return date.toLocaleDateString('ru-RU', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        })
    }

    const [isExpanded, setIsExpanded] = useState(false)
    const shouldTruncate = review.review.length > 700
    const displayText = isExpanded
        ? review.review
        : shouldTruncate
            ? `${review.review.substring(0, 700)}...`
            : review.review

    const createMarkup = (html: string) => {
        return { __html: html };
    };

    return (
        <div className='bg-gray-800 w-full rounded-lg p-6 shadow-md border-l-4 border-orange-500 transition-colors'>
            <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold text-white group-hover:text-orange-300 transition-colors">
                    {review.title}
                </h3>
                {review.userRating && (
                    <div className="flex items-center bg-orange-500/10 px-3 py-1 rounded-full border border-orange-500/30">
                        <StarIcon className="text-orange-400 mr-1" />
                        <span className="font-medium text-orange-300">{review.userRating}</span>
                    </div>
                )}
            </div>

            <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-full bg-orange-500/20 flex items-center justify-center text-lg font-bold mr-3 text-orange-300 border border-orange-500/30">
                    {review.author.charAt(0).toUpperCase()}
                </div>
                <div>
                    <p className="font-medium text-white">{review.author}</p>
                    <p className="text-sm text-gray-400">{formatDate(review.createdAt)}</p>
                </div>
            </div>

            <div className="mb-2">
                {/* TODO доделать безопасность */}
                <div 
                    className="text-gray-300 whitespace-pre-line review-content"
                    dangerouslySetInnerHTML={createMarkup(displayText)} 
                />
                {shouldTruncate && (
                    <button
                        onClick={() => setIsExpanded(!isExpanded)}
                        className="text-orange-400 hover:text-orange-300 text-sm mt-2 flex items-center transition-colors"
                    >
                        {isExpanded ? (
                            <>
                                <ExpandLessIcon className="mr-1" />
                                Свернуть
                            </>
                        ) : (
                            <>
                                <ExpandMoreIcon className="mr-1" />
                                Читать полностью
                            </>
                        )}
                    </button>
                )}
            </div>

            <div className="flex justify-between items-center pt-3 border-t border-gray-700">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${review.type === 'Позитивный'
                    ? 'bg-green-900/50 text-green-300 border border-green-800'
                    : review.type === 'Негативный'
                        ? 'bg-red-900/50 text-red-300 border border-red-800'
                        : 'bg-gray-700 text-gray-300 border border-gray-600'
                    }`}>
                    {review.type}
                </span>

                <div className="flex space-x-4">
                    <button className="flex items-center text-gray-400 hover:text-orange-400 transition-colors group">
                        <ThumbUpIcon className="mr-1 group-hover:scale-110 transition-transform" />
                        <span className="group-hover:text-orange-300">{review.reviewLikes}</span>
                    </button>
                    <button className="flex items-center text-gray-400 hover:text-orange-400 transition-colors group">
                        <ThumbDownIcon className="mr-1 group-hover:scale-110 transition-transform" />
                        <span className="group-hover:text-orange-300">{review.reviewDislikes}</span>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ReviewCard