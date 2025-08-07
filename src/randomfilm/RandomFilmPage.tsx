import { useState, useEffect } from "react"
import Header from "../components/Header"
import RandomFilmFilter from  './RandomFilmFilter'
import RandomFilmCard from './RandomFilmCard'
import ApiService from "../services/api-service"

const RandomFilmPage = () => {
    
    useEffect(() => {
        fetchFunc()
    }, [])

    const fetchFunc = async() => {
        const response = await ApiService.getRandomFilm()
        console.log(response)
    }

    return(
        <div className="h-full flex flex-col px-4 xl:px-7">
            <Header />
            <div className="w-full flex justify-center">
                <div className="w-3/5">
                    <RandomFilmFilter />
                </div>
            </div>
        </div>
    )
}


export default RandomFilmPage