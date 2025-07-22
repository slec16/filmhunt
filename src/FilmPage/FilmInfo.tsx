import StarIcon from '@mui/icons-material/Star'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'

const FilmInfo = (props: any) => {
    const {
        ageRating,
        backdrop,
        countries,
        genres,
        name,
        rating,
        year,
        shortDescription,
    } = props.filmInfo

    // const url = "https://image.openmoviedb.com/kinopoisk-ott-images/212840/2a00000186a8b7a1951185c6175ed0f07fd0/1344x756"
    // const name = "Атака титанов"
    // const rating = 6
    // const shortDescription = "Люди сражаются с титанами, которые мечтают их съесть. Финал самого эпичного аниме современности"
    // const ageRating = 18
    // const year = 2013
    // const countries = [{name: 'Япония'}, {name: 'Россия'}]
    // const genres = [{name: 'аниме'},
    //                 {name: 'мультфильм'},
    //                 {name: 'фантастика'},
    //                 {name: 'драма'},
    //                 {name: 'боевик'},
    //                 {name: 'фэнтези'}
    //             ]

    return (
        <div className=" bg-gray-900">
            <div className=" px-6 ">
                <div className='absolute z-20 w-1/3 ml-20 mt-10'>
                    <h1 className="text-5xl text-gray-300 font-bold mb-5">{name}</h1>
                    <div className='flex flex-row gap-x-2 mb-2'>
                        <span className={`flex items-center  ${rating.imdb > 8 ? 'text-green-700': 'text-yellow-400'}`}>
                            <StarIcon className="mr-1" />
                            {rating.imdb}
                        </span>
                        <span>{year},</span>
                        {countries.map((item, index, array) => {
                            return(
                                <span>{index !== array.length-1 ? <span>{item.name},</span> : <span>{item.name}</span>}</span>
                            )
                        })}
                        <span>{ageRating}+</span>
                    </div>
                    <div className='flex flex-row gap-x-2 mb-5'>
                        {genres.map((item, index, array) => {
                            return(
                                <span>{index !== array.length-1 ? <span>{item.name},</span> : <span>{item.name}</span>}</span>
                            )
                        })}
                    </div>
                    <p className="text-2xl text-gray-300 mb-15">{shortDescription}</p>
                    <button className='px-4 py-2 text-white rounded-3xl flex items-center transition 
                        bg-gradient-to-r from-orange-500 to-amber-500
                        hover:from-orange-600 hover:to-amber-600
                        active:from-orange-700 active:to-amber-700'
                    >
                        <PlayArrowIcon />
                        <span className='ml-0.5'>Смотреть</span>
                    </button>
                </div>
                <div className="w-full mt-0 relative flex flex-row">
                    <div className='w-1/3 relative min-h-[600px] bg-black rounded-l-lg'></div>
                    <div className="relative h-full w-2/3 min-h-[600px] rounded-r-lg overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/10 to-transparent z-10" />
                        <img
                            src={backdrop.url}
                            // src={url}
                            alt={`${name}`}
                            className="w-full h-full object-cover absolute inset-0"
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FilmInfo