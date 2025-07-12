import { useState } from 'react'
// import { FiSearch, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import SearchIcon from '@mui/icons-material/Search'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'

const SearchWithPagination = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const totalPages = 20 // Пример общего количества страниц

  const handleSearch = (e) => {
    e.preventDefault()
    // Логика поиска
    console.log('Searching for:', searchQuery)
    setCurrentPage(1) // Сброс на первую страницу при новом поиске
  }

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page)
    }
  }

  const handleItemsPerPageChange = (value) => {
    setItemsPerPage(Number(value))
    setCurrentPage(1) // Сброс на первую страницу при изменении количества элементов
  }

  // Генерация номеров страниц для отображения
  const getPageNumbers = () => {
    const pages = []
    const maxVisiblePages = 1
    
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      const half = Math.floor(maxVisiblePages / 2)
      let start = currentPage - half
      let end = currentPage + half

      if (start < 1) {
        start = 1
        end = maxVisiblePages
      }

      if (end > totalPages) {
        end = totalPages
        start = totalPages - maxVisiblePages + 1
      }

      for (let i = start; i <= end; i++) {
        pages.push(i)
      }
    }

    return pages
  }

  return (
    <div className="bg-gray-900 flex flex-row rounded-lg">
      {/* Область поиска */}
      <div className="">
        <form onSubmit={handleSearch} className="relative">
          <div className="flex items-center">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Поиск фильмов..."
              className="w-2/3 bg-gray-800 text-white px-4 py-2 rounded-l-lg focus:outline-none  "
            />
            <button
              type="submit"
              className="bg-orange-500 text-white px-4 py-2 rounded-r-lg hover:bg-orange-600 transition"
            >
             <SearchIcon />
            </button>
          </div>
        </form>
      </div>

      {/* Пагинация */}
      <div className="flex flex-row items-center justify-between w-full">
        {/* Выбор количества элементов на странице */}
        <div className="flex items-center">
          <span className="text-gray-400 text-sm mr-2">Показывать:</span>
          <select
            value={itemsPerPage}
            onChange={(e) => handleItemsPerPageChange(e.target.value)}
            className="bg-gray-800 text-white text-sm rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-orange-500"
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="50">50</option>
          </select>
          <span className="text-gray-400 text-sm ml-2">на странице</span>
        </div>

        {/* Навигация по страницам */}
        <div className="flex items-center gap-1">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`p-2 rounded ${currentPage === 1 ? 'text-gray-600 cursor-not-allowed' : 'text-white hover:bg-gray-700'}`}
          >
            <ArrowBackIcon />
          </button>

          {getPageNumbers().map((page) => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`w-10 h-10 rounded ${currentPage === page ? 'bg-orange-500 text-white' : 'bg-gray-800 text-white hover:bg-gray-700'}`}
            >
              {page}
            </button>
          ))}

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`p-2 rounded ${currentPage === totalPages ? 'text-gray-600 cursor-not-allowed' : 'text-white hover:bg-gray-700'}`}
          >
            <ArrowForwardIcon />
          </button>
        </div>

        {/* Информация о текущей позиции */}
        <div className="text-gray-400 text-sm">
          Страница {currentPage} из {totalPages}
        </div>
      </div>
    </div>
  )
}

export default SearchWithPagination