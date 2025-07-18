// import { FiStar } from 'react-icons/fi';
import StarIcon from '@mui/icons-material/Star'

interface IFilmCard {
    id: number,
    name: string,
    poster: {
        url: string,
        previewUrl: string
    },
    shortDescription: string,
    ageRating: number,
    genres: {name: string}[],
    year: number, 
    rating: {
        imdb: number
    },
    countries: {name: string}[]
}

interface FilmCardProps {
    film: IFilmCard
}

const FilmCard = (props: FilmCardProps) => {

    const {id, name, poster, shortDescription, ageRating, genres, rating, year, countries} = props.film


    // console.log(name)



    return (
        <div className="w-full bg-gray-800 rounded-lg overflow-hidden shadow-lg flex border border-gray-700">
            {/* Постер */}
            <div className="w-72 h-108 flex-shrink-0">
                <img
                    src={poster.url}
                    alt={`Постер ${name}`}
                    className="object-cover"
                />
            </div>

            {/* Контент */}
            <div className="p-6 flex flex-col flex-grow">
                {/* Заголовок и мета-информация */}
                <div className="mb-4">
                    <h2 className="text-2xl font-bold text-white mb-2">{name}</h2>
                    <div className="flex items-center space-x-4 text-gray-300">
                        <span>{year}</span>
                        <span className="flex items-center">
                            <StarIcon />
                            {rating.imdb.toFixed(1)}
                        </span>
                        <span>{countries[0]?.name}</span>
                    </div>
                </div>

                {/* Описание */}
                <p className="text-gray-300 mb-6 line-clamp-3">{shortDescription}</p>

                {/* Кнопки действий */}
                <div className="mt-auto flex space-x-3">
                    <button className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 transition">
                        Смотреть
                    </button>
                    <button className="px-4 py-2 border border-gray-600 text-gray-300 rounded hover:bg-gray-700 transition">
                        Подробнее
                    </button>
                </div>
            </div>
        </div>
    );
};

export default FilmCard;