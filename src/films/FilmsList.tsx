import FilmCard from './FilmCard'

type FilmsListProps = {
    films: any[]
}

const FilmsList = (props: FilmsListProps) => {

    const {films} = props

    console.log(films)

    return(
        <div className='flex flex-col gap-2'>
            {films.map(item => {
                return(
                    <FilmCard
                        film={item}
                    />
                )
            })}
        </div>
    )
}

export default FilmsList