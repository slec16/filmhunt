// import { FiStar } from 'react-icons/fi';
import StarIcon from '@mui/icons-material/Star';
interface MovieCardProps {
  title: string;
  posterUrl: string;
  year: number;
  description: string;
  rating: number;
  country: string;
}

const MovieCard = ({
  title,
  posterUrl,
  year,
  description,
  rating,
  country,
}: MovieCardProps) => {
  return (
    <div className="w-2/3 bg-gray-800 rounded-lg overflow-hidden shadow-lg flex border border-gray-700">
      {/* Постер */}
      <div className="w-1/3 flex-shrink-0">
        <img
          src={posterUrl}
          alt={`Постер ${title}`}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Контент */}
      <div className="p-6 flex flex-col flex-grow">
        {/* Заголовок и мета-информация */}
        <div className="mb-4">
          <h2 className="text-2xl font-bold text-white mb-2">{title}</h2>
          <div className="flex items-center space-x-4 text-gray-300">
            <span>{year}</span>
            <span className="flex items-center">
              <StarIcon />
              {rating.toFixed(1)}
            </span>
            <span>{country}</span>
          </div>
        </div>

        {/* Описание */}
        <p className="text-gray-300 mb-6 line-clamp-3">{description}</p>

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

export default MovieCard;