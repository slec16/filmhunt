import { useState, useEffect, useMemo, useCallback } from 'react'
// import { Link } from 'react-router';
import FilmFilterSection from './FilmFilterSection'
import FilmFilterRange from './FilmFilterRange'
import TuneIcon from '@mui/icons-material/Tune';
import CloseIcon from '@mui/icons-material/Close';
// import CasinoIcon from '@mui/icons-material/Casino';

type FilmFilterProps = {
    setFiltersParams: (params: Record<string, string[]>) => void
    currentParamsObj: Record<string, string[]>
}

const FilmFilter = (props: FilmFilterProps) => {

    const { setFiltersParams, currentParamsObj } = props

    console.log('render film filter')

    const [clearAllFilters, setClearAllFilters] = useState(false)

    // const [selectedFiltersObj, setSelectedFiltersObj] = useState<Record<string, string[]>>(currentParamsObj)

    const selectedFiltersObj = useMemo(() => ({ ...currentParamsObj }), [currentParamsObj])

    // const toggleFiltersItem = (key: string, value: string[]) => {
    //     setSelectedFiltersObj(prev => ({ ...prev, [key]: value }))
    // }
    const toggleFiltersItem = useCallback((key: string, value: string[]) => {
        // TODO - убрать мутацию
        selectedFiltersObj[key] = value
    }, [selectedFiltersObj])

    const clearFilters = () => {
        setClearAllFilters(true)
        Object.keys(selectedFiltersObj).forEach(key => {
            delete selectedFiltersObj[key]
        })
        setFiltersParams(selectedFiltersObj)
    }



    // const filtersObject: Record<string, string[]> = {
    //     'Год выпуска': ['2020-2024', '2010-2019', '2000-2009', '1990-1999', '1980-1989', 'До 1980'],
    //     'Страна': ['США', 'Россия', 'Корея', 'Великобритания', 'Франция', 'Япония'],
    //     'Продолжительность': ['<1ч', '1-2ч', '>2ч'],
    //     'Жанры': ['Фантастика', 'Драма', 'Комедия', 'Боевик', 'Триллер', 'Мелодрама', 'Фэнтези', 'Ужасы'],
    //     'Возрастной рейтинг': ['0+', '6+', '12+', '16+', '18+'],
    //     'Тип контента': ['Фильмы', 'Сериалы', 'Мультфильмы', 'Аниме'],
    //     // 'Рейтинг': ['0']
    // }

    const filtersObject = useMemo(() => ({
        'Год выпуска': ['2020-2024', '2010-2019', '2000-2009', '1990-1999', '1980-1989', 'До 1980'],
        'Страна': ['США', 'Россия', 'Корея', 'Великобритания', 'Франция', 'Япония'],
        'Продолжительность': ['<1ч', '1-2ч', '>2ч'],
        'Жанры': ['Фантастика', 'Драма', 'Комедия', 'Боевик', 'Триллер', 'Мелодрама', 'Фэнтези', 'Ужасы'],
        'Возрастной рейтинг': ['0+', '6+', '12+', '16+', '18+'],
        'Тип контента': ['Фильмы', 'Сериалы', 'Мультфильмы', 'Аниме']
    }), [])




    const [isMobile, setIsMobile] = useState(false)
    const [showDrawer, setShowDrawer] = useState(false)

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768)
        }

        checkMobile()
        window.addEventListener('resize', checkMobile)
        return () => window.removeEventListener('resize', checkMobile)
    }, [])


    const FilterContent = () => (
        <div className={`${isMobile ? 'w-full p-4' : 'w-1/3 min-w-[300px] py-3'} h-fit overflow-y-auto px-2 rounded-lg bg-gray-800 border-r border-gray-700`}>
            <div className="flex justify-between items-center sticky top-0 bg-gray-800 z-10">
                <h2 className="text-xl font-bold text-orange-400">Фильтры</h2>
                {isMobile && (
                    <button
                        onClick={() => setShowDrawer(false)}
                        className="text-gray-400 hover:text-white"
                    >
                        <CloseIcon />
                    </button>
                )}
            </div>

            <div className="space-y-4 mt-4">
                {[...Object.entries(filtersObject)].map(([key, value]) => (
                    <FilmFilterSection
                        key={key}
                        sectionName={key}
                        dataArray={value}
                        toggleFiltersItem={toggleFiltersItem}
                        clearAllFilters={clearAllFilters}
                        currentParams={selectedFiltersObj}
                        exclusive={key === 'Год выпуска' || key === 'Продолжительность' || key === 'Возрастной рейтинг'}
                    />
                ))}
                <FilmFilterRange
                    toggleFiltersItem={toggleFiltersItem}
                    clearAllFilters={clearAllFilters}
                    currentParams={selectedFiltersObj}
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
                        setClearAllFilters(false)
                        setFiltersParams(selectedFiltersObj)
                    }}
                >
                    Применить
                </button>
            </div>
            {/* <Link to={'/random'} className="w-full mt-3 px-4 py-2 text-xs bg-orange-500 text-white rounded hover:bg-orange-600 transition flex items-center justify-center space-x-2">
                <p>Случайный фильм</p>
                <CasinoIcon className='rotate-30'/>
            </Link> */}
        </div>
    )

    if (isMobile) {
        return (
            <>
                {/* Кнопка для открытия фильтров на мобильных */}
                <button
                    onClick={() => setShowDrawer(true)}
                    className="fixed bottom-10 right-6 z-50 bg-orange-500 text-white p-3 rounded-full shadow-lg hover:bg-orange-600 transition flex items-center justify-center"
                    aria-label="Открыть фильтры"
                >
                    <TuneIcon />
                </button>

                {/* Drawer для мобильных */}
                {showDrawer && (
                    <div className="fixed inset-0 z-40">
                        {/* Затемнение фона */}
                        <div
                            className="absolute inset-0 bg-transparent bg-opacity-50"
                            onClick={() => setShowDrawer(false)}
                        />

                        {/* Сам drawer */}
                        <div className="absolute right-0 top-0 h-full w-4/5 max-w-sm bg-gray-800 shadow-xl transform transition-transform">
                            <FilterContent />
                        </div>
                    </div>
                )}
            </>
        );
    }

    // Десктопная версия
    return <FilterContent />
}

export default FilmFilter