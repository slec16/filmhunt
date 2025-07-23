import { type ISimilarMovies } from "../interfaces"
import StarIcon from '@mui/icons-material/Star'


type SimilarMovieCardProps = {
    similarMovieInfo: ISimilarMovies
}

const SimilarMovieCard = (props: SimilarMovieCardProps) => {
    const { id, name, poster, rating, year, type } = props.similarMovieInfo

    return(
       <div className={`flex flex-col w-40 hover:scale-105 transition-transform duration-200 cursor-pointer`}>
            {/* Poster image */}
            <div className="relative aspect-[2/3] rounded-lg overflow-hidden shadow-md mb-2">
                <img 
                    src={poster.previewUrl || poster.url} 
                    alt={name}
                    className="w-full h-full object-cover"
                />
                
                {/* Rating badge */}
                <div className="absolute bottom-2 left-2 bg-black/80 text-white text-xs px-2 py-1 rounded flex items-center">
                    <StarIcon className="text-yellow-400 mr-1" style={{ fontSize: '1rem' }} />
                    <span>{rating?.imdb?.toFixed(1) || rating?.kp?.toFixed(1)}</span>
                </div>
            </div>
            
            {/* info */}
            <div className="px-1">
                <h3 className="font-medium text-sm truncate" title={name}>{name}</h3>
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>{year}</span>
                    <span className="capitalize">{type === 'movie' ? 'фильм' : 'сериал'}</span>
                </div>
            </div>
        </div>
    )
}

export default SimilarMovieCard