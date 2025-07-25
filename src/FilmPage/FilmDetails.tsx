import SimilarMovies from "./SimilarMovies"
import type { ISimilarMovies, IFilmDetail } from "../interfaces"
import groupByProfession from "../helpers/personToMap"
import StarIcon from '@mui/icons-material/Star'

type FilmDetailsProps = {
    filmDetail: IFilmDetail,
    similarMovies: ISimilarMovies[]
}


const FilmDetails = (props: FilmDetailsProps) => {

    const similarMovies = props.similarMovies
    const { id,
        ageRating,
        countries,
        description,
        genres,
        logo,
        movieLength,
        name,
        persons,
        poster,
        rating,
        releaseYears,
        seasonsInfo,
        year
    } = props.filmDetail


    console.log(groupByProfession(persons))
    


    return (
        <>
            <div className="flex flex-row w-full pt-7">
                <section className="w-1/2 px-5">
                    {logo.previewUrl ?
                        <div className="mb-2">
                            <img src={logo.previewUrl} />
                        </div> :
                        <h1 className={`${name.length > 35 ? 'text-4xl' : 'text-7xl'} text-gray-300 font-bold mb-2`}>{name}</h1> 
                    }
                    <div className='flex flex-row gap-x-2 mb-5'>
                        <span>{year},</span>
                        {countries.map((item, index, array) => {
                            return (
                                <span key={item.name}>{index !== array.length - 1 ? <span>{item.name},</span> : <span>{item.name}</span>}</span>
                            )
                        })}
                        <span>{ageRating}+</span>
                    </div>
                    <span className={`flex items-center ${rating.imdb > 8 ? 'text-green-700' : 'text-yellow-400'}`}>
                        <StarIcon className="mr-1" />
                        {rating.imdb}
                    </span>
                    <div className='flex flex-row gap-x-2 mb-5'>
                        {genres.map((item, index, array) => {
                            return (
                                <span key={item.name}>{index !== array.length - 1 ? <span>{item.name},</span> : <span>{item.name}</span>}</span>
                            )
                        })}
                    </div>
                    <p className="text-2xl text-gray-300 mb-15">{description}</p>
                </section>
                <div className="w-1/2 px-10">
                    {/* pesrons */}
                    <div className="flex flex-row flex-wrap gap-x-7 gap-y-5">
                        {[...groupByProfession(persons)].map(([value, key]) => {
                            return(
                                <div className="flex flex-col space-y-1.5">
                                    <p className="font-extrabold">{value}</p>
                                    {key.slice(0,5).map(item => {
                                        return(
                                            <span>{item.name}</span>
                                        )
                                    })}
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
            <SimilarMovies similarMovies={similarMovies} />
        </>
    )
}

export default FilmDetails