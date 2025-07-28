import { useEffect, useState } from 'react'
import type { ISeasons } from "../interfaces"
import SeriasList from './SeriasList'

type SeriasTabProps = {
    seasons: ISeasons[]
}

const SeriasTab = (props: SeriasTabProps) => {
    const seasons = props.seasons
    
    const [activeTab, setActiveTab] = useState(1 || seasons[0]?.number)

    return (
        <div className={`w-full h-full flex flex-col flex-1`}>
            {/* Tab headers */}
            <div className="flex justify-start mb-10">
                {seasons.map(season => (
                    <button
                        key={season.number}
                        className={`px-4 py-2 text-sm font-medium relative
                            ${activeTab === season.number
                                ? 'text-orange-500 border-b-2 border-orange-500'
                                : 'text-gray-500 hover:text-gray-700'
                            }`}
                        onClick={() => setActiveTab(season.number)}
                    >
                        {season.name}
                        {activeTab === season.number && (
                            <span className="absolute inset-x-0 bottom-[-2px] h-0.5 bg-orange-500" />
                        )}
                    </button>
                ))}
            </div>

            <SeriasList season={seasons.find((season) => season.number === activeTab)}/>
        </div>
    )
}

export default SeriasTab