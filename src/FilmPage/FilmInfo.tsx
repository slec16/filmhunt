import StarIcon from '@mui/icons-material/Star'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import { useEffect, useState } from 'react'

const FilmInfo = (props: any) => {
    // const {
    //     ageRating,
    //     backdrop,
    //     countries,
    //     genres,
    //     name,
    //     rating,
    //     year,
    //     shortDescription,
    // } = props.filmInfo

    const url = "https://image.openmoviedb.com/kinopoisk-ott-images/212840/2a00000186a8b7a1951185c6175ed0f07fd0/1344x756"
    const name = "Атака титанов"
    const rating = {
        imdb: 9
    }
    const shortDescription = "Люди сражаются с титанами, которые мечтают их съесть. Финал самого эпичного аниме современности"
    const ageRating = 18
    const year = 2013
    const countries = [{ name: 'Япония' }, { name: 'Россия' }]
    const genres = [{ name: 'аниме' },
        { name: 'мультфильм' },
        { name: 'фантастика' },
        { name: 'драма' },
        { name: 'боевик' },
        { name: 'фэнтези' }
    ]


    const [isMountedBackdrop, setIsMountedBackdrop] = useState(false)
    const [isMountedGradient, setIsMountedGradient] = useState(false)
    const [isMountedBlack, setIsMountedBlack] = useState(false)
    const [isMountedInfo, setIsMountedInfo] = useState(false)

    useEffect(() => {
        const timer1 = setTimeout(() => setIsMountedBackdrop(true), 200)
        const timer2 = setTimeout(() => setIsMountedGradient(true), 500)
        const timer3 = setTimeout(() => setIsMountedBlack(true), 800)
        const timer4 = setTimeout(() => setIsMountedInfo(true), 1100)

        return () => {
            clearTimeout(timer1)
            clearTimeout(timer2)
            clearTimeout(timer3)
            clearTimeout(timer4)
        }
    }, [])

    return (
        <div className=" bg-gray-900">
            <div className=" px-6 ">
                <div className={`absolute z-20 w-1/3 ml-20 mt-10 transform transition-all duration-700 ease-out ${isMountedInfo ? 'translate-y-0 opacity-100' : '-translate-y-8 opacity-0'}`}>
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

                <div className={`w-full mt-0 relative flex flex-row transform-gpu transition-all duration-300 ease-linear ${isMountedBackdrop ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>

                    <div className={`relative min-h-[600px] bg-black rounded-l-lg transition-all duration-250 ease-out ${isMountedBlack ? 'w-1/3 opacity-100' : 'w-0 opacity-0'}`}></div>

                    <div className="relative h-full min-h-[600px] rounded-r-lg overflow-hidden transition-all duration-300 ease-linear" style={{
                        width: isMountedBlack ? '66.666667%' : '100%'
                    }}>
                        <div className={`absolute inset-0 bg-gradient-to-r from-black via-black/10 to-transparent z-10 transition-opacity duration-500 ${isMountedGradient ? 'opacity-100' : 'opacity-0'}`} />
                        <img
                            src={url}
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