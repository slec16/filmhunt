import { useState, useEffect, useRef, useImperativeHandle, forwardRef } from 'react'
import SearchIcon from '@mui/icons-material/Search'
import DeleteIcon from '@mui/icons-material/Delete'
import ClearIcon from '@mui/icons-material/Clear';

type FilmAutocompleateProps = {
    changeName: (name: string) => void,
    currentName: string
}

const FilmAutocompleate = forwardRef((props: FilmAutocompleateProps, ref) => {

    const { currentName, changeName } = props

    const [searchQuery, setSearchQuery] = useState(currentName)
    const [searchHistory, setSearchHistory] = useState<string[]>([])
    const [showSuggestions, setShowSuggestions] = useState(false)
    const searchRef = useRef<HTMLDivElement>(null)

    // Очищение строки поиска при смене фильтров в родителе
    useImperativeHandle(ref, () => ({
        clearSearchName() {
            setSearchQuery('')
        },
    }));

    // Загрузка истории поиска из localStorage при монтировании
    useEffect(() => {
        const savedHistory = localStorage.getItem('filmSearchHistory')
        if (savedHistory) {
            setSearchHistory(JSON.parse(savedHistory))
        }
    }, [])

    // Сохранение истории поиска в localStorage при изменении
    useEffect(() => {
        if (searchHistory.length > 0) {
            localStorage.setItem('filmSearchHistory', JSON.stringify(searchHistory))
        }
    }, [searchHistory])

    // Закрытие подсказок при клике вне компонента
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
                setShowSuggestions(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [])

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault()
        if (searchQuery.trim()) {
            setSearchHistory(prev => {
                const newHistory = [searchQuery, ...prev.filter(item => item !== searchQuery)]
                return newHistory.slice(0, 10)
            })
            setShowSuggestions(false)
        }
    }

    const deleteSearch = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, item: string) => {
        e.stopPropagation()
        setSearchHistory(prev => {
            const newHistory = [...prev.filter(elemnt => elemnt !== item)]
            return newHistory
        })
    }

    const handleSuggestionClick = (suggestion: string) => {
        setSearchQuery(suggestion)
        setShowSuggestions(false)
    }

    const highlightMatch = (text: string, query: string) => {
        if (!query) return text

        const regex = new RegExp(`(${query})`, 'gi')
        return text.split(regex).map((part, i) =>
            part.toLowerCase() === query.toLowerCase()
                ? <span key={i} className="text-orange-400 font-semibold">{part}</span>
                : part
        )
    }

    //Фильтрация
    const filteredSuggestions = searchQuery
        ? searchHistory
            .filter(item =>
                item.toLowerCase().includes(searchQuery.toLowerCase())
            )
            .map(item => ({
                original: item,
                highlighted: highlightMatch(item, searchQuery)
            }))
        : searchHistory.map(item => ({
            original: item,
            highlighted: item
        }))



    return (
        <div className="w-full relative " ref={searchRef}>
            <form onSubmit={handleSearch} className="relative">
                <div className="flex items-center">
                    <div className="relative w-full">
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => {
                                setSearchQuery(e.target.value)
                                setShowSuggestions(true)
                            }}
                            onFocus={() => setShowSuggestions(true)}
                            placeholder="Поиск фильмов..."
                            className="w-full bg-gray-800 text-white px-4 py-2 pr-10 rounded-l-lg focus:outline-none focus:ring-1 focus:ring-orange-500"
                        />
                        {searchQuery && <button
                            type='button'
                            onClick={() => setSearchQuery('')}
                            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-red-500 focus:text-red-500 focus:outline-0"
                        >
                            <ClearIcon />
                        </button>}
                    </div>
                    <button
                        type="submit"
                        className="bg-orange-500 text-white px-4 py-2 rounded-r-lg hover:bg-orange-600 transition"
                        onClick={() => changeName(searchQuery)}
                    >
                        <SearchIcon />
                    </button>
                </div>
            </form>

            {/* popup */}
            {showSuggestions && searchHistory.length > 0 && (
                <div className="absolute z-10 w-full mt-1 bg-gray-800 rounded-lg border-1 border-gray-700 max-h-60 overflow-y-auto shadow-2xl">
                    {filteredSuggestions.length > 0 ? (
                        <ul>
                            {filteredSuggestions.map(({ original, highlighted }, index) => (
                                <li
                                    key={index}
                                    className="px-4 py-2 hover:bg-gray-700 cursor-pointer text-white flex justify-between items-center"
                                    onClick={() => handleSuggestionClick(original)}
                                >
                                    <span className='truncate'>{highlighted}</span>
                                    <button
                                        onClick={(e) => deleteSearch(e, original)}
                                        className="text-gray-400 hover:text-red-500 p-1 ml-2"
                                        aria-label="Удалить из истории"
                                    >
                                        <DeleteIcon fontSize="small" />
                                    </button>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <div className="px-4 py-2 text-gray-400">Совпадений не найдено</div>
                    )}
                </div>
            )}
        </div>
    )
})

export default FilmAutocompleate