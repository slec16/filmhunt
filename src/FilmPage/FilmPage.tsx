import { useParams } from 'react-router'
import { useState, useEffect } from 'react'
import ApiService from "../services/api-service"

const FilmPage = () => {
    let { id } = useParams()

    useEffect(() => {
        fetchFunc()
    }, [])
    
    const fetchFunc = async() => {
        if(id) {
            const response = await ApiService.getFilmById(id)
            console.log(response)
        }
    }
    
    return(
        <div>
            Film page
        </div>
    )
}

export default FilmPage