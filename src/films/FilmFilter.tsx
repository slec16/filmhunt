import { useState, useEffect } from 'react'
import FilmFilterSection from './FilmFilterSection'
import FilmFilterRange from './FilmFilterRange'

type FilmFilterProps = {
    setFiltersParams: (params: Map<string, string[]>) => void
    currentParams: Map<string, string[]>
}

const FilmFilter = (props: FilmFilterProps) => {

    const {setFiltersParams, currentParams} = props

    const [clearAllFilters, setClearAllFilters] = useState(false)

    const selectedFitersMap: Map<string, string[]> = new Map(currentParams)

    const toggleFiltersItem = (key: string, value: string[]) => {
        console.log(key, value)
        selectedFitersMap.set(key, value)
    }

    const clearFilters = () => {
        setClearAllFilters(true)
        selectedFitersMap.clear()
        setFiltersParams(selectedFitersMap)
    }

    const filtersMap = new Map([
        ['Год выпуска', ['2020-2024', '2010-2019', '2000-2009', '1990-1999', '1980-1989', 'До 1980']],
        ['Страна', ['США', 'Россия', 'Корея', 'Великобритания', 'Франция', 'Япония']],
        ['Продолжительность', ['<1ч', '1-2ч', '>2ч']],
        ['Жанры', ['Фантастика', 'Драма', 'Комедия', 'Боевик', 'Триллер', 'Мелодрама', 'Фэнтези', 'Ужасы']],
        ['Возрастной рейтинг', ['0+','6+','12+','16+','18+']]
        // ['Тип контента', ['Фильмы', 'Сериалы', 'Мультфильмы', 'Аниме']]
    ])

    

    const [isMobile, setIsMobile] = useState(false)
    const [showDrawer, setShowDrawer] = useState(false)

    // useEffect(() => {
    //     const checkMobile = () => {
    //         setIsMobile(window.innerWidth < 768)
    //     }

    //     checkMobile()
    //     window.addEventListener('resize', checkMobile)
    //     return () => window.removeEventListener('resize', checkMobile)
    // }, [])


    const FilterContent = () => (
        <div className={`${isMobile ? 'w-full p-4' : 'w-1/3 min-w-[300px] mr-5'} h-fit overflow-y-auto px-2 rounded-lg scrollbar-thin bg-gray-800 border-r border-gray-700`}>
            <div className="flex justify-between items-center sticky top-0 bg-gray-800 py-2 z-10">
                <h2 className="text-xl font-bold text-orange-400">Фильтры</h2>
                {isMobile && (
                    <button
                        onClick={() => setShowDrawer(false)}
                        className="text-gray-400 hover:text-white"
                    >
                        <div>fix</div>
                    </button>
                )}
            </div>

            <div className="space-y-4 mt-4">
                {[...filtersMap].map(([key, value]) => (
                    <FilmFilterSection 
                        key={key}
                        sectionName={key}
                        dataArray={value}
                        toggleFiltersItem={toggleFiltersItem}
                        clearAllFilters={clearAllFilters}
                        currentParams={currentParams}
                        exclusive={key === 'Год выпуска' || key === 'Продолжительность' || key === 'Возрастной рейтинг'}
                    />
                ))}
                <FilmFilterRange 
                    toggleFiltersItem={toggleFiltersItem}
                    clearAllFilters={clearAllFilters}
                    currentParams={currentParams}
                />
            </div>

            {/* Кнопки действий */}
            <div className="flex justify-between space-x-3 mt-6 sticky bottom-0 bg-gray-800 py-3">
                <button
                    onClick={clearFilters}
                    className="px-4 py-1 text-xs border border-orange-500 text-orange-500 rounded hover:bg-orange-500 hover:text-white transition"
                >
                    Сбросить
                </button>
                <button
                    className="px-4 py-1 text-xs bg-orange-500 text-white rounded hover:bg-orange-600 transition flex items-center"
                    onClick={() => {
                        // if (isMobile) setShowDrawer(false)
                        setFiltersParams(selectedFitersMap)
                    }}
                >
                    Применить
                </button>
            </div>
        </div>
    )

    // if (isMobile) {
    //     return (
    //         <>
    //             {/* Кнопка для открытия фильтров на мобильных */}
    //             <button
    //                 onClick={() => setShowDrawer(true)}
    //                 className="fixed bottom-6 right-6 z-50 bg-orange-500 text-white p-3 rounded-full shadow-lg hover:bg-orange-600 transition flex items-center justify-center"
    //                 aria-label="Открыть фильтры"
    //             >
    //                 <div>filter</div>
    //                 {Object.values(activeFilters).some(filter =>
    //                     Array.isArray(filter) ? filter.length > 0 :
    //                         typeof filter === 'object' ? Object.values(filter).some(Boolean) :
    //                             filter > 0
    //                 ) && (
    //                         <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
    //                             {[
    //                                 ...activeFilters.years,
    //                                 ...activeFilters.countries,
    //                                 ...activeFilters.durations,
    //                                 ...activeFilters.genres,
    //                                 activeFilters.rating > 0 ? 1 : 0,
    //                                 ...getSelectedTypes()
    //                             ].length}
    //                         </span>
    //                     )}
    //             </button>

    //             {/* Drawer для мобильных */}
    //             {showDrawer && (
    //                 <div className="fixed inset-0 z-40">
    //                     {/* Затемнение фона */}
    //                     <div
    //                         className="absolute inset-0 bg-black bg-opacity-50"
    //                         onClick={() => setShowDrawer(false)}
    //                     />

    //                     {/* Сам drawer */}
    //                     <div className="absolute right-0 top-0 h-full w-4/5 max-w-sm bg-gray-800 shadow-xl transform transition-transform">
    //                         <FilterContent />
    //                     </div>
    //                 </div>
    //             )}
    //         </>
    //     );
    // }

    // Десктопная версия
    return <FilterContent />
}

export default FilmFilter