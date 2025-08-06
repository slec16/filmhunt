import StarIcon from '@mui/icons-material/Star'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import { useEffect, useState, memo } from 'react'
import { type IFilmInfo } from '../interfaces'
import FilmName from './FilmName'

type FilmInfoProps = {
    filmInfo: IFilmInfo
}

const FilmInfo = memo((props: FilmInfoProps) => {
    const {
        ageRating,
        backdrop,
        countries,
        genres,
        name,
        rating,
        year,
        shortDescription,
        logo
    } = props.filmInfo

    const [isMountedBackdrop, setIsMountedBackdrop] = useState(false)
    const [isMountedGradient, setIsMountedGradient] = useState(false)
    const [isMountedBlack, setIsMountedBlack] = useState(false)
    const [isMountedInfo, setIsMountedInfo] = useState(false)

    const [backdropHasError, setBackdropHasError] = useState(false)

    useEffect(() => {
        const timer1 = setTimeout(() => setIsMountedBackdrop(true), 200)
        const timer2 = setTimeout(() => setIsMountedGradient(true), 700)
        const timer3 = setTimeout(() => setIsMountedBlack(true), 800)
        const timer4 = setTimeout(() => setIsMountedInfo(true), 1300)

        return () => {
            clearTimeout(timer1)
            clearTimeout(timer2)
            clearTimeout(timer3)
            clearTimeout(timer4)
        }
    }, [])

    const [isMobile, setIsMobile] = useState(false)

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 1024)
        }

        checkMobile()
        window.addEventListener('resize', checkMobile)
        return () => window.removeEventListener('resize', checkMobile)
    }, [])

    return (
        <>
            {isMobile ?
                <div className='flex flex-col flex-1'>
                    <div
                        className={`relative w-full h-56 sm:h-80 transition-all duration-400 ease-linear ${isMountedBackdrop ? 'opacity-100' : 'opacity-0'}`}
                    >
                        {((backdrop && backdrop.previewUrl) || (backdrop && backdrop.url)) && (
                            <img
                                src={backdrop.url || backdrop.previewUrl}
                                alt={`${name}`}
                                className="w-full h-full object-cover rounded-xl"
                                onError={() => setBackdropHasError(true)}
                            />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/30 z-10" />
                    </div>

                    <div
                        className={`px-4 py-4 flex flex-col items-center transform transition-all duration-500 ease-out ${isMountedInfo ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}
                    >
                        <FilmName logo={logo} name={name} />

                        <div className='flex flex-row gap-x-2 mb-3 flex-wrap items-center'>
                            <span className={`flex items-center ${rating.imdb > 8 ? 'text-green-700' : 'text-yellow-400'}`}>
                                <StarIcon className="mr-1" />
                                {rating.imdb}
                            </span>
                            {year && <span>{year},</span>}
                            {countries.map((item, index, array) => (
                                <span key={item.name}>
                                    {index !== array.length - 1 ? `${item.name},` : item.name}
                                </span>
                            ))}
                            {ageRating && <span>{ageRating}+</span>}
                        </div>

                        <div className='flex flex-row justify-center gap-x-2 mb-4 flex-wrap'>
                            {genres.map((item, index, array) => (
                                <span key={item.name}>
                                    {index !== array.length - 1 ? `${item.name},` : item.name}
                                </span>
                            ))}
                        </div>

                        <p className="text-sm text-center text-gray-300 mb-5">{shortDescription}</p>

                        <button className='px-4 py-2 text-white rounded-3xl flex items-center transition 
                                            bg-gradient-to-r from-orange-500 to-amber-500
                                            hover:from-orange-600 hover:to-amber-600
                                            active:from-orange-700 active:to-amber-700'
                        >
                            <PlayArrowIcon />
                            <span className='ml-1'>Смотреть</span>
                        </button>
                    </div>
                </div> :
                <div className='flex flex-col justify-center flex-1 '>
                    <div
                        className={`relative flex flex-row transform-gpu transition-all duration-400 ease-linear ${isMountedBackdrop ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}
                        style={{
                            width: '100%',
                            height: '80vh',
                        }}
                    >
                        <div className={`absolute z-20 w-1/3 ml-[5%] mt-[5%] transform transition-all duration-900 ease-out ${isMountedInfo ? 'translate-y-0 opacity-100' : '-translate-y-20 opacity-0'}`}>

                            <FilmName logo={logo} name={name} />

                            <div className='flex flex-row gap-x-2 mb-2 flex-wrap'>
                                <span className={`flex items-center  ${rating.imdb > 8 ? 'text-green-700' : 'text-yellow-400'}`}>
                                    <StarIcon className="mr-1" />
                                    {rating.imdb}
                                </span>
                                {year && <span>{year},</span>}
                                {countries.map((item, index, array) => {
                                    return (
                                        <span key={item.name}>{index !== array.length - 1 ? <span>{item.name},</span> : <span>{item.name}</span>}</span>
                                    )
                                })}
                                {ageRating && <span>{ageRating}+</span>}
                            </div>
                            <div className='flex flex-row gap-x-2 mb-5'>
                                {genres.map((item, index, array) => {
                                    return (
                                        <span key={item.name}>{index !== array.length - 1 ? <span>{item.name},</span> : <span>{item.name}</span>}</span>
                                    )
                                })}
                            </div>
                            <p className="text-2xl text-gray-300 mb-5">{shortDescription}</p>
                            <button className='px-4 py-2 text-white rounded-3xl flex items-center transition 
                        bg-gradient-to-r from-orange-500 to-amber-500
                        hover:from-orange-600 hover:to-amber-600
                        active:from-orange-700 active:to-amber-700'
                            >
                                <PlayArrowIcon />
                                <span className='ml-0.5'>Смотреть</span>
                            </button>
                        </div>
                        <div
                            className={`relative h-full bg-black rounded-l-lg transition-all duration-1000 ease-out ${isMountedBlack ? 'w-1/3' : 'w-0'}`}
                        ></div>
                        <div
                            className={`relative h-full rounded-r-lg overflow-hidden transition-all duration-1000 ease-linear ${isMountedBlack ? 'w-2/3' : 'w-full'}`}
                        >
                            <div
                                className={` absolute inset-0 bg-gradient-to-r from-black via-black/10 to-transparent z-10 transition-opacity duration-300 ${isMountedGradient ? 'opacity-100' : 'opacity-0'}`}
                            />
                            {((backdrop && backdrop.previewUrl) || (backdrop && backdrop.url)) &&
                                <img
                                    src={backdrop.url || backdrop.previewUrl}
                                    alt={`${name}`}
                                    className={`w-full h-full object-cover absolute inset-0 ${backdropHasError ? 'hidden' : 'block'}`}
                                    onError={() => setBackdropHasError(true)}
                                />
                            }
                        </div>
                    </div>
                </div>
            }
        </>


    )
})

export default FilmInfo