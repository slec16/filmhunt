import AccountCircleIcon from '@mui/icons-material/AccountCircle'

const Header = () => {

    return (
        <header className='py-7 border-b-2 border-amber-600 mb-5'>
            <div className="flex justify-between items-center">
                <h1 className='text-5xl font-medium font-serif'>
                    FilmHunt
                </h1>
                <div className='text-orange-500'>
                    <AccountCircleIcon fontSize="large" color='inherit'></AccountCircleIcon>
                </div>
            </div>
        </header>   
    )
}

export default Header