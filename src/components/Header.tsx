import { useState } from 'react'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import Dialog from '@mui/material/Dialog'
import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';


const Header = () => {
    const [open, setOpen] = useState(false)

    const handleClickOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    };

    const [token, setToken] = useState('')
    const [showToken, setShowToken] = useState(false)

    const handleClearToken = () => {
        setToken('')
    }

    const handleApplyToken = () => {

    }

    return (
        <header className='py-7 border-b-2 border-amber-600 sm:px-7 mb-5'>
            <div className="flex justify-between items-center">
                <h1 className='text-5xl font-medium '>
                    FilmHunt
                </h1>
                <div className='text-orange-500' onClick={handleClickOpen}>
                    <AccountCircleIcon fontSize="large" color='inherit'></AccountCircleIcon>
                </div>
            </div>
            <Dialog open={open} onClose={handleClose} >
                <div className="md:w-300 py-5 px-2 max-w-lg mx-auto ">
                    <label htmlFor="token-input" className="block text-sm font-medium text-gray-700 mb-1 dark:text-gray-300">
                        API Token
                        <span className="text-red-500 ml-1">*</span>
                    </label>

                    <div className="relative rounded-md shadow-sm">
                        <input
                            id="token-input"
                            className="block w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white transition-all"
                            placeholder="Введите ваш API токен"
                            value={token}
                            onChange={(e) => setToken(e.target.value)}
                            aria-describedby="token-help"
                        />

                        {/* Скрытие */}
                        {/* <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                            <button
                                type="button"
                                className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
                                onClick={() => setShowToken(!showToken)}
                                aria-label={showToken ? 'Скрыть токен' : 'Показать токен'}
                            >
                                {showToken ? (
                                    <VisibilityIcon className="h-5 w-5" />
                                ) : (
                                    <VisibilityOffIcon className="h-5 w-5" />
                                )}
                            </button>
                        </div> */}
                    </div>

                    <button
                        type="button"
                        onClick={handleApplyToken}
                        disabled={!token.trim()}
                        className={`mt-4 w-full px-4 py-3 rounded-lg font-medium transition-all duration-200 ease-in-out
                                ${!token.trim()
                                ? 'bg-gray-300 cursor-not-allowed text-gray-500 dark:bg-gray-700 dark:text-gray-400'
                                : 'bg-orange-500 hover:bg-orange-600 text-white shadow-md hover:shadow-orange-500/30 transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50 dark:bg-orange-600 dark:hover:bg-orange-700'
                            }`}
                    >
                        Применить
                    </button>

                    <div className="mt-2 flex items-center justify-between">
                        <p id="token-help" className="text-xs text-gray-500 dark:text-gray-400">
                            Токен будет сохранен локально в вашем браузере
                        </p>

                        <button
                            type="button"
                            className="text-xs text-orange-500 hover:text-orange-800 dark:text-blue-400 dark:hover:text-orange-300"
                            onClick={handleClearToken}
                        >
                            Очистить
                        </button>
                    </div>
                </div>
            </Dialog>
        </header>
    )
}

export default Header