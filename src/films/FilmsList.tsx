import FilmCard from './FilmCard'
import { type IFilmCard } from '../interfaces'

type FilmsListProps = {
    films: IFilmCard[]
}

const FilmsList = (props: FilmsListProps) => {

    const {films} = props

    let filmsList

    films.length !== 0 ? filmsList = films.map(item => {
        return(
            <FilmCard
                key={item.id}
                film={item}
            />
        )
    }) :
    filmsList = <div className='flex w-full justify-center'><span className='text-3xl text-orange-400'>Ничего не найдено</span></div>

    return(
        <div className='flex flex-col gap-4'>
            {filmsList}
        </div>
    )
}

export default FilmsList