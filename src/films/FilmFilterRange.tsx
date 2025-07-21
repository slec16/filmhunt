import { useState, useEffect } from 'react'
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'

type FilmFilterRange = {
    toggleFiltersItem: (key: string, value: string[]) => void
    clearAllFilters: boolean,
    currentParams: Map<string, string[]>
}

const FilmFilterRange = (props: FilmFilterRange) => {

    const { toggleFiltersItem, clearAllFilters, currentParams } = props
    const [expandedSectionsState, setExpandedSectionsState] = useState(false)

    const range = currentParams.get('Рейтинг')?.[0] ?? '0';

    const [rangeValue, setRangeValue] = useState(0)


    useEffect(() => {
        setRangeValue(0)
    }, [clearAllFilters])

    useEffect(() => {
        setRangeValue(Number(range))
    }, [])

    return (
        <div className="border-b border-gray-700 pb-3">
            <button
                onClick={() => setExpandedSectionsState(!expandedSectionsState)}
                className="flex justify-between items-center w-full text-left group"
            >
                <div className="flex items-center">
                    <span className="font-medium text-sm group-hover:text-orange-400 transition">Рейтинг IMDB</span>
                    {rangeValue > 0 && (
                        <span className="ml-2 text-xs text-orange-400">
                            от {rangeValue}
                        </span>
                    )}
                </div>
                {expandedSectionsState ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
            </button>
            {expandedSectionsState && (
                <div className="mt-2">
                    <div className="flex items-center space-x-2">
                        <span className="text-xs text-orange-400">0</span>
                        <input
                            type="range"
                            min="0"
                            max="10"
                            step="0.1"
                            value={rangeValue}
                            onChange={(e) => {
                                setRangeValue(Number(e.target.value))
                                toggleFiltersItem('Рейтинг', [e.target.value])
                            }}
                            className="w-full h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-orange-500"
                        />
                        <span className="text-xs text-orange-400">10</span>
                    </div>
                    <div className="flex justify-between mt-1 text-xs text-gray-400">
                        <span>Любой</span>
                        <span>Высокий</span>
                    </div>
                </div>
            )}
        </div>
    )
}


export default FilmFilterRange