import { useState, useEffect } from "react"
import Header from "../components/Header"
import RandomFilmFilter from './RandomFilmFilter'
import RandomFilmYearRange from './RandomFilmYearRange'
import ApiService from "../services/api-service"
import { arrayToPath } from '../helpers/mapToPath'

import FilmCard from "../films/FilmCard"
import { type IFilmCard } from "../interfaces"

const RandomFilmPage = () => {

    const [selectedGenres, setSelectedGenres] = useState<string[]>([])
    const [selectedCountries, setSelectedCountries] = useState<string[]>([])
    const [startYear, setStartYear] = useState<number>(1920)
    const [endYear, setEndYear] = useState<number>(2025)

    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [hiddenFilm, setHiddenFilm] = useState(false)

    const [randomFilm, setRandomFilm] = useState<IFilmCard | null>(null)



    useEffect(() => {
        fetchFunc()
    }, [])

    const fetchFunc = async () => {
        const yearRange = `${startYear}-${endYear}`
        const countriesPath = arrayToPath(selectedCountries, 'countries.name')
        const genresPath = arrayToPath(selectedGenres, 'genres.name')

        const response = await ApiService.getRandomFilm(yearRange, genresPath, countriesPath)
        setRandomFilm(response)
        console.log(response)
    }

    const findRandomFilm = () => {
        setRandomFilm(null)
        fetchFunc()
    }

    return (
        <div className="h-full flex flex-col px-4 xl:px-7">
            <Header />
            <div className="w-full flex justify-center">
                <div className="w-3/5 flex flex-col items-center gap-y-4 overflow-visible">
                    <RandomFilmFilter
                        selectedGenres={selectedGenres}
                        setSelectedGenres={setSelectedGenres}
                        selectedCountries={selectedCountries}
                        setSelectedCountries={setSelectedCountries}
                    />
                    <RandomFilmYearRange
                        startYear={startYear}
                        setStartYear={setStartYear}
                        endYear={endYear}
                        setEndYear={setEndYear}
                    />
                    <button
                        className="w-1/3 text-xl py-4 bg-orange-500 text-white rounded hover:bg-orange-600 transition flex justify-center"
                        onClick={findRandomFilm}
                    >
                        <span>Найти фильм</span>
                    </button>

                    <div className="w-full overflow-visible relative">
                        <div className={`transform transition-all duration-700 ease-out ${randomFilm ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'} w-full`}>
                            {randomFilm && (
                                <FilmCard film={randomFilm} />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default RandomFilmPage