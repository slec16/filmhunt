import { useState } from 'react'
import { useAuth }from '../contexts/auth-context'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import NoAccountsIcon from '@mui/icons-material/NoAccounts'
import Dialog from '@mui/material/Dialog'

const Header = () => {

    const { login } = useAuth()

    const [open, setOpen] = useState(false)
    const [tokenSting, setToken] = useState('')

    const handleClickOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    const handleClearToken = () => {
        setToken('')
    }

    const handleApplyToken = () => {
        login(tokenSting)
    }


    return (
        <header className='py-7 border-b-2 border-amber-600 sm:px-7 mb-5'>
            <div className="flex justify-between items-center">
                <h1 className='text-5xl font-medium '>
                    FilmHunt
                </h1>
                <div className='text-orange-400 hover:text-orange-700' onClick={handleClickOpen}>
                    {tokenSting ?
                        <AccountCircleIcon fontSize="large" color='inherit' />
                        :
                        <NoAccountsIcon fontSize="large" color='inherit' />
                    }
                </div>
            </div>

            <Dialog open={open} onClose={handleClose} >
                <div className="md:w-300 py-5 px-3 max-w-lg mx-auto bg-slate-200">
                    <label htmlFor="token-input" className="block text-sm font-medium text-gray-900 mb-3">
                        API Token
                        <span className="text-red-500 ml-1">*</span>
                    </label>

                    <div className="relative rounded-md shadow-sm mb-4">
                        <input
                            id="token-input"
                            className="block w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-gray-800  placeholder-gray-400 text-white transition-all"
                            placeholder="Введите ваш API токен"
                            value={tokenSting}
                            onChange={(e) => setToken(e.target.value)}
                            aria-describedby="token-help"
                        />
                    </div>

                    <button
                        type="button"
                        onClick={handleApplyToken}
                        disabled={!tokenSting.trim()}
                        className={`w-full px-4 py-3 rounded-lg font-medium transition-all duration-200 ease-in-out
                                        ${!tokenSting.trim()
                                        ? ' cursor-not-allowed  bg-gray-700 text-gray-400'
                                        : 'text-white shadow-md hover:shadow-orange-500/30 transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50 bg-orange-600 hover:bg-orange-700'
                                    }`}
                    >
                        Применить
                    </button>

                    <div className="mt-2 flex items-center justify-between">
                        <p id="token-help" className="text-xs text-gray-500">
                            Токен будет сохранен локально в вашем браузере
                        </p>

                        <button
                            type="button"
                            className="text-xs text-orange-500 hover:text-orange-700 "
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