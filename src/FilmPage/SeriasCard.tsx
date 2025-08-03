import { useState } from 'react'
import type { IEpisode } from "../interfaces"
import ImageIcon from '@mui/icons-material/Image'

type SeriasCardProps = {
    series: IEpisode,
    poster: {
        previewUrl: string,
        url: string
    }
}

const SeriasCard = (props: SeriasCardProps) => {

    const { series, poster } = props
    const { airDate, description, name, number, still } = series


    const [isFlipped, setIsFlipped] = useState(false)

    const handleFlip = () => {
        setIsFlipped(!isFlipped)
    }

    return (
        <div
            className={`w-80 h-96 perspective-1000 `} // h-96 - фиксированная высота
        >
            <div
                className={`relative w-full h-full transition-transform duration-500 transform-style-preserve-3d ${isFlipped ? 'rotate-y-180' : ''
                    }`}
            >
                <div className={`absolute w-full h-full backface-hidden ${isFlipped ? 'hidden' : ''}`}>
                    <div className="flex flex-col h-full bg-gray-800 rounded-lg overflow-hidden shadow-lg border border-gray-700">
                        <div className="relative aspect-video h-1/2">
                            {((still && still.previewUrl) || (still && still.url) || (poster && poster.url) || (poster && poster.previewUrl)) ?
                                <img
                                    src={(still && still?.url) ? still.url : poster.url}
                                    alt={`Кадр из серии ${number}: ${name}`}
                                    className="w-full h-full object-cover"
                                />
                                :
                                <div className='flex justify-center items-center h-full text-5xl'><ImageIcon fontSize='inherit'/></div>
                            }
                            <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white px-2 py-1 rounded text-sm">
                                Серия {number}
                            </div>
                            <div className="absolute bottom-2 left-2  bg-opacity-70 px-2 py-1 rounded text-sm">
                                <button
                                    onClick={handleFlip}
                                    className="mt-auto self-end text-orange-400 hover:text-orange-300 text-xs font-medium transition-colors"
                                >
                                    Подробнее →
                                </button>
                            </div>
                        </div>

                        <div className="p-4 flex flex-col flex-1">
                            <div className="mb-2">
                                <h3 className="text-lg font-bold text-white mb-1">
                                    {number}. {name}
                                </h3>
                            </div>

                            <p className="text-gray-400 text-xs mb-2">
                                {airDate && new Date(airDate).toLocaleDateString()}
                            </p>

                            <p className="text-gray-300 text-sm mb-2 line-clamp-3">
                                {description}
                            </p>


                        </div>
                    </div>
                </div>

                {/* Обратная сторона (полное описание) */}
                <div className={`absolute w-full h-full backface-hidden rotate-y-180 bg-gray-800 rounded-lg overflow-hidden shadow-lg border border-gray-700 p-4 ${isFlipped ? '' : 'hidden'
                    }`}>
                    <div className="flex flex-col h-full">
                        <div className="mb-4">
                            <h3 className="text-lg font-bold text-white">
                                {number}. {name}
                            </h3>
                            <button
                                onClick={handleFlip}
                                className="absolute top-2 right-2 text-orange-400 hover:text-orange-300 text-xs font-medium transition-colors"
                            >
                                ← Назад
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto">
                            <p className="text-gray-300 text-sm mb-3 px-3">
                                {description}
                            </p>
                        </div>

                        {airDate && <p className="text-gray-400 text-xs mt-2">Дата выхода: {new Date(airDate).toLocaleDateString()}</p>}
                    </div>
                </div>
            </div>
        </div>
    )
}


export default SeriasCard