import { useState } from 'react'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'

type FilmPaginationProps = {
    page: number;
    onPageChange: (newPage: number) => void;
    limit: number
    onLimitChange: (newLimit: number) => void;
    paginationData: any
}

const FilmPagination = (props: FilmPaginationProps) => {

    const { page, onPageChange, limit, onLimitChange, paginationData } = props


    // const [currentPage, setCurrentPage] = useState(1)
    // const [itemsPerPage, setItemsPerPage] = useState(10)
    // const totalPages = 20 // Пример общего количества страниц


    const nextPage = () => {
        onPageChange(page+1)
    }

    const prevPage = () => {
        onPageChange(page-1)
    }

    const handleItemsPerPageChange = (value: string) => {
        onLimitChange(Number(value))
    }
    
    return(
        <div className="flex flex-row items-center justify-between w-1/2">
            {/* Выбор количества элементов на странице */}
            <div className="flex items-center">
            <span className="text-gray-400 text-sm mr-2">Показывать:</span>
            <select
                value={limit}
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
                    onClick={() => prevPage()}
                    disabled={page === 1}
                    className={`p-2 rounded ${page === 1 ? 'text-gray-600 cursor-not-allowed' : 'text-white hover:bg-gray-700'}`}
                >
                    <ArrowBackIcon />
                </button>

                <button
                    key={page}
                    className='w-10 h-10 rounded bg-orange-500 text-white'
                >
                    {page}
                </button>

                <button
                    onClick={() => nextPage()}
                    disabled={page === 100}
                    className={`p-2 rounded ${page === 100 ? 'text-gray-600 cursor-not-allowed' : 'text-white hover:bg-gray-700'}`}
                >
                    <ArrowForwardIcon />
                </button>
            </div>
        </div>
    )
}

export default FilmPagination