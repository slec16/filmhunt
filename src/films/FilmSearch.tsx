import SearchIcon from '@mui/icons-material/Search'
import { useState } from 'react'


const FilmSearch = () => {

    const [searchQuery, setSearchQuery] = useState('')

    return (
        <div className="w-1/2 ">
            <form  className="relative">
                <div className="flex items-center">
                    <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Поиск фильмов..."
                    className="w-full bg-gray-800 text-white px-4 py-2 rounded-l-lg focus:outline-none  "
                    />
                    <button
                        disabled
                        type="submit"
                        className="bg-orange-500 text-white px-4 py-2 rounded-r-lg hover:bg-orange-600 transition"
                        >
                        <SearchIcon />
                    </button>
                </div>
            </form>
        </div>
    )
}

export default FilmSearch