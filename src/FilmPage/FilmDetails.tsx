import { useState, useEffect, memo } from "react"
import SimilarMovies from "./SimilarMovies"
import type { ISimilarMovies, IFilmDetail } from "../interfaces"
import groupByProfession from "../helpers/personToMap"
import StarIcon from '@mui/icons-material/Star'

type releaseYearsComponentProps = {
    releaseYears: {
        start: number | null,
        end: number | null
    }[] | undefined,
    year: number
}

const ReleaseYearsComponent = memo((props: releaseYearsComponentProps) => {
    const {releaseYears, year} = props
    if( releaseYears !== undefined && releaseYears[0] ){
        if(releaseYears[0].start &&  releaseYears[0].end && releaseYears[0].start !== releaseYears[0].end ) {
            return(
                <span>{releaseYears[0].start}-{releaseYears[0].end},</span>
            )
        } else if( (releaseYears[0] && releaseYears[0].start) ) {
            return(
                <span>С {releaseYears[0] && releaseYears[0].start},</span>
            )
        } 
    } else {
        return(
            <span>{year},</span>
        )
    }
})

type FilmDetailsProps = {
    filmDetail: IFilmDetail,
    similarMovies: ISimilarMovies[] | null
}

const FilmDetails = memo((props: FilmDetailsProps) => {

    const similarMovies = props.similarMovies
    const { 
        // id,
        ageRating,
        countries,
        description,
        genres,
        logo,
        movieLength,
        name,
        persons,
        rating,
        releaseYears,
        year
    } = props.filmDetail


    const [isMountedDetail, setIsMountedDetail] = useState(false)
    const [isMountedSimilar, setIsMountedSimilar] = useState(false)

    useEffect(() => {
        const timer1 = setTimeout(() => setIsMountedDetail(true), 200)
        const timer2 = setTimeout(() => setIsMountedSimilar(true), 400)

        return () => {
            clearTimeout(timer1)
            clearTimeout(timer2)
        }
    }, [])


    return (
        <>
            <div className={`flex flex-row w-full pt-7 mb-15 transform transition-all duration-500 ease-out ${isMountedDetail ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
                <section className="w-1/2 px-5 space-y-4">
                    {(logo && logo.previewUrl) || (logo && logo.url) ?
                        <div >
                            <img src={logo.previewUrl} className='mb-3 max-h-64'/>
                            <h1 className="text-sm text-gray-300 font-bold">{name}</h1> 
                        </div> :
                        <h1 className={`${name.length > 35 ? 'text-4xl' : 'text-7xl'} text-gray-300 font-bold`}>{name}</h1> 
                    }
                    <div className='flex flex-row gap-x-3 flex-wrap'>
                        {/* <span>{year},</span> */}
                        <ReleaseYearsComponent releaseYears={releaseYears} year={year}/>
                        {countries && countries.map((item, index, array) => {
                            return (
                                <span key={item.name}>{index !== array.length - 1 ? <span>{item.name},</span> : <span>{item.name}</span>}</span>
                            )
                        })}
                        {movieLength && <span>{movieLength}мин</span>}
                        <span>{ageRating}+</span>
                    </div>
                    <span className={`flex items-center ${rating.imdb > 8 ? 'text-green-700' : 'text-yellow-400'}`}>
                        <StarIcon className="mr-1" />
                        {rating.imdb}
                    </span>
                    <div className='flex flex-row gap-x-2'>
                        {genres.map((item, index, array) => {
                            return (
                                <span key={item.name}>{index !== array.length - 1 ? <span>{item.name},</span> : <span>{item.name}</span>}</span>
                            )
                        })}
                    </div>
                    <p className="text-2xl text-gray-300 ">{description}</p>
                </section>
                <div className="w-1/2 px-10">
                    {/* pesrons */}
                    <div className="flex flex-row flex-wrap gap-x-7 gap-y-5">
                        {persons && [...groupByProfession(persons)].map(([value, key]) => {
                            return(
                                <div className="flex flex-col space-y-1.5" key={value}>
                                    <p className="font-extrabold text-slate-300">{value}</p>
                                    {key.slice(0,5).map(item => {
                                        return(
                                            <span key={item.name}>{item.name}</span>
                                        )
                                    })}
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
            <div className={`transform transition-all duration-500 ease-out ${isMountedSimilar ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
                {(similarMovies && similarMovies.length !== 0) && <SimilarMovies similarMovies={similarMovies} />}
            </div>
        </>
    )
})

export default FilmDetails