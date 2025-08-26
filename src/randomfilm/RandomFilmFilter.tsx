import MultiSelect from './MultiSelect'

type RandomFilmFilterProps = {
    selectedGenres: string[]
    setSelectedGenres: React.Dispatch<React.SetStateAction<string[]>>
    selectedCountries: string[]
    setSelectedCountries: React.Dispatch<React.SetStateAction<string[]>>
}

const RandomFilmFilter = (props: RandomFilmFilterProps) => {
    const { selectedGenres, setSelectedGenres, selectedCountries, setSelectedCountries } = props

    const genresOptions = ['аниме', 'биография', 'боевик', 'детектив', 'комедия', 'приключения', 'спорт', 'триллер', 'ужасы', 'фантастика', 'фентези']
    const countryOptions = ['Россия', 'США', 'СССР', 'Великобритания', 'Германия', 'Италия', 'Япония', 'Китай', 'Франция', 'Южная Корея', 'Щвеция']

    return (
        <div className="flex flex-col w-full gap-y-4">
            <MultiSelect
                options={genresOptions}
                selected={selectedGenres}
                onChange={setSelectedGenres}
                placeholder="Выберите жанры"
            />
            <MultiSelect
                options={countryOptions}
                selected={selectedCountries}
                onChange={setSelectedCountries}
                placeholder="Выберите страны"
            />

        </div>
    )
}

export default RandomFilmFilter