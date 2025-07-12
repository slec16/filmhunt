import { useState, useEffect } from 'react'
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'


type FilmFilterSectionProps = {
    dataArray: string[],
    sectionName: string,
    toggleFiltersItem: (key: string, value: string[]) => void
    clearAllFilters: boolean
}


const FilmFilterSection = (props: FilmFilterSectionProps) => {

    const { dataArray, sectionName, toggleFiltersItem, clearAllFilters } = props

    const [expandedSectionsState, setExpandedSectionsState] = useState(false)
    const [filtersArrays, setFiltersArrays] = useState<string[]>([])

    useEffect(() => {
        if(clearAllFilters) setFiltersArrays([])
    }, [clearAllFilters])

    const renderSelectedFilters = (filters: string[], maxVisible = 2) => {
        if (filters.length === 0) return null
        
        const visibleFilters = filters.slice(0, maxVisible)
        const hiddenCount = filters.length - maxVisible
        
        return (
        <span className="ml-2 text-xs text-orange-400">
            {visibleFilters.join(', ')}
            {hiddenCount > 0 && ` +${hiddenCount}`}
        </span>
        )
    }

    const toggleFilters = (value: string) => {

        const currentArray = filtersArrays

        const newArray = currentArray.includes(value) ? 
            currentArray.filter(item => item !== value) :
            [...currentArray, value]

        setFiltersArrays(newArray)
        toggleFiltersItem(sectionName, newArray)
    }


    return(
        <div className="border-b border-gray-700 pb-3">
            <button 
                onClick={() => setExpandedSectionsState(!expandedSectionsState)}
                className="flex justify-between items-center w-full text-left group"
            >
                <div className="flex items-center">
                <span className="font-medium text-sm group-hover:text-orange-400 transition">{sectionName}</span>
                {renderSelectedFilters(filtersArrays)}
                </div>
                {expandedSectionsState ? <ArrowDropUpIcon /> : <ArrowDropDownIcon /> }
            </button>
            {expandedSectionsState && (
                <div className="mt-2 grid grid-cols-2 gap-2">
                {dataArray.map(year => (
                    <button
                        key={year}
                        onClick={() => toggleFilters(year)}
                        className={`px-2 py-1 text-xs rounded transition ${
                            filtersArrays.includes(year) 
                            ? 'bg-orange-500 text-white' 
                            : 'bg-gray-700 hover:bg-orange-500 hover:text-white'
                        }`}
                        >
                            {year}
                    </button>
                ))}
                </div>
            )}
        </div>
    )
}

export default FilmFilterSection
