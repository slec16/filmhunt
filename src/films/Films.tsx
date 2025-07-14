import Header from "../components/Header"
import FilmFilter from "./FilmFilter"
import FilmListHeader from './FilmsListHeader'
import FilmSearch from "./FilmSearch"
import FilmAutocompleate from "./FilmAutocompleate"
import FilmPagination from "./FilmPagination"
import ApiService from "../services/api-service"

const Film = () => {

    const getFilms = async() => {
        console.log('btn clicked')
        const res = await ApiService.getFilms()
        console.log(res)
    }

    return(
        <div className="h-full">
            <Header />
            <div className="flex flex-row w-full ">
                <FilmFilter />
                <div className="flex flex-row h-fit w-full">
                    {/* <FilmSearch /> */}
                    <FilmAutocompleate />
                    <FilmPagination />
                </div>
                {/* <FilmListHeader  */}
            </div>  
            <button onClick={getFilms} className="bg-amber-500 px-4 py-2 rounded-lg hover:bg-amber-200">Get films</button>
        </div>
    )
}

export default Film