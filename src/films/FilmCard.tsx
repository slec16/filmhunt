import { Link } from 'react-router'
import StarIcon from '@mui/icons-material/Star'
import { type IFilmCard } from '../interfaces'
import HideImageIcon from '@mui/icons-material/HideImage';

type FilmCardProps = {
    film: IFilmCard
}

const FilmCard = (props: FilmCardProps) => {

    const { id, name, poster, shortDescription, ageRating, genres, rating, year, countries, movieLength } = props.film

    return (
        // <div className="w-full flex-col xl:flex-row bg-gray-800 rounded-lg overflow-hidden shadow-lg flex border border-gray-700">

        //     <div className="w-full xl:w-64 h-64 xl:h-96 flex-shrink-0">
        //         {((poster && poster.previewUrl) || (poster && poster.url)) ?
        //             <img
        //                 src={poster.url || poster.previewUrl}
        //                 alt={`Постер ${name}`}
        //                 className="object-cover"
        //             />
        //             : 
        //             <div className='w-full h-full flex justify-center items-center text-6xl'>
        //                <HideImageIcon fontSize='inherit'/> 
        //             </div>
        //         }
        //     </div>

        //     <div className="p-6 flex flex-col flex-grow">
        //         <div className="mb-4">
        //             <h2 className="text-2xl font-bold text-white mb-2">{name}</h2>
        //             <div className="flex items-center space-x-4 text-gray-300">
        //                 <span>{year}</span>
        //                 <span className="flex items-center">
        //                     <StarIcon />
        //                     {rating.imdb.toFixed(1)}
        //                 </span>
        //                 {countries && <span>{countries[0]?.name}</span>}
        //                 <span>{ageRating}+</span>
        //                 {movieLength && <span>{movieLength} мин.</span>}
        //             </div>
        //         </div>


        //         <p className="text-gray-300 mb-6 line-clamp-3">{shortDescription}</p>

        //         <div className="mt-auto flex space-x-3" onClick={() => {
        //             const scrollY = window.scrollY
        //             sessionStorage.setItem('scrollPosition', scrollY.toString())
        //         }}>
        //             <Link to={`/film/${id}`} className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 transition">
        //                 Подробнее
        //             </Link>
        //         </div>
        //     </div>
        // </div>
        <div className="w-full flex flex-col lg:flex-row bg-gray-800 rounded-lg overflow-hidden shadow-lg border border-gray-700">
            <div className="w-full lg:w-64 h-64 lg:h-96 flex-shrink-0">
                {((poster && poster.previewUrl) || (poster && poster.url)) ? (
                    <img
                        src={poster.url || poster.previewUrl}
                        alt={`Постер ${name}`}
                        className="w-full h-full object-cover"
                    />
                ) : (
                    <div className='w-full h-full flex justify-center items-center text-6xl'>
                        <HideImageIcon fontSize='inherit' />
                    </div>
                )}
            </div>

            <div className="p-4 lg:p-6 flex flex-col flex-grow">
                <div className="mb-4">
                    <h2 className="text-xl lg:text-2xl font-bold text-white mb-2">{name}</h2>
                    <div className="flex flex-wrap items-center gap-2 text-sm lg:text-base text-gray-300">
                        <span>{year}</span>
                        <span className="flex items-center">
                            <StarIcon className="mr-1" />
                            {rating.imdb.toFixed(1)}
                        </span>
                        {countries && <span>{countries[0]?.name}</span>}
                        <span>{ageRating}+</span>
                        {movieLength && <span>{movieLength} мин.</span>}
                    </div>
                </div>

                <p className="text-gray-300 mb-4 line-clamp-3">{shortDescription}</p>

                <div className="mt-auto" onClick={() => {
                    const scrollY = window.scrollY;
                    sessionStorage.setItem('scrollPosition', scrollY.toString());
                }}>
                    <Link
                        to={`/film/${id}`}
                        className="inline-block px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 transition"
                    >
                        Подробнее
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default FilmCard