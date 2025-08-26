import { useState, useEffect } from "react"
import Header from "../components/Header"
import RandomFilmFilter from  './RandomFilmFilter'
import RandomFilmCard from './RandomFilmCard'
import RandomFilmYearRange from './RandomFilmYearRange'
import ApiService from "../services/api-service"
import { arrayToPath } from '../helpers/mapToPath'

const RandomFilmPage = () => {
    
    const [selectedGenres, setSelectedGenres] = useState<string[]>([])
    const [selectedCountries, setSelectedCountries] = useState<string[]>([])
    const [startYear, setStartYear] = useState<number>(1920)
    const [endYear, setEndYear] = useState<number>(2025)
 

    useEffect(() => {
        fetchFunc()
    }, [])

    const fetchFunc = async() => {
        const yearRange = `${startYear}-${endYear}`
        const countriesPath = arrayToPath(selectedCountries, 'countries.name')
        const genresPath = arrayToPath(selectedGenres, 'genres.name')

        const response = await ApiService.getRandomFilm(yearRange, genresPath, countriesPath)
        console.log(response)
    }

    return(
        <div className="h-full flex flex-col px-4 xl:px-7">
            <Header />
            <div className="w-full flex justify-center">
                <div className="w-3/5 flex flex-col items-center gap-y-4">
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
                        onClick={fetchFunc}
                    >
                        <span>Найти фильм</span>
                    </button>
                </div>
            </div>
        </div>
    )
}


export default RandomFilmPage