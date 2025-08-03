import PageInput from './PageInput'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import { type IPaginationData } from '../interfaces'

type FilmPaginationProps = {
    page: number;
    onPageChange: (newPage: number) => void;
    limit: number
    onLimitChange: (newLimit: number) => void;
    paginationData: IPaginationData
}

const Pagination = (props: FilmPaginationProps) => {

    const { page, onPageChange, limit, onLimitChange, paginationData } = props

    const nextPage = (newPage?: number) => {
        onPageChange(newPage ? newPage : page+1)
    }

    const prevPage = () => {
        onPageChange(page-1)
    }

    const handleItemsPerPageChange = (value: string) => {
        onLimitChange(Number(value))
    }
    
    return(
        <div className="flex flex-row items-center w-fit">
            <div className="flex items-center mr-2.5">
                <span className="text-gray-400 text-sm mr-2">Показывать:</span>
                <select
                    value={limit}
                    onChange={(e) => handleItemsPerPageChange(e.target.value)}
                    className="bg-gray-800 text-white text-sm rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-orange-500 last:rounded-b-md"
                >
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="20">20</option>
                    <option value="50">50</option>
                </select>
                <span className="text-gray-400 text-sm ml-2">на странице</span>
            </div>

            <div className="flex items-center space-x-1 mr-1">
                <button
                    onClick={() => prevPage()}
                    disabled={page === 1}
                    className={`p-2 rounded ${page === 1 ? 'text-gray-600 cursor-not-allowed' : 'text-white hover:bg-gray-700'}`}
                >
                    <ArrowBackIcon />
                </button>

                <PageInput page={page} onPageChange={(newPage) => nextPage(newPage)} maxPage={paginationData.pages}/>

                <button
                    onClick={() => nextPage()}
                    disabled={page === paginationData.pages}
                    className={`p-2 rounded ${page === paginationData.pages ? 'text-gray-600 cursor-not-allowed' : 'text-white hover:bg-gray-700'}`}
                >
                    <ArrowForwardIcon />
                </button>
            </div>
            <span>Всего: {paginationData.total}</span>
        </div>
    )
}

export default Pagination