import Header from "../components/Header"
import FilmFilter from "./FilmFilter"
import FilmListHeader from './FilmsListHeader'
import FilmSearch from "./FilmSearch"
import FilmAutocompleate from "./FilmAutocompleate"
import FilmPagination from "./FilmPagination"

const Film = () => {


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
        </div>
    )
}

export default Film