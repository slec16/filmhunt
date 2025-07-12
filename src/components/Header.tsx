import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import { deepOrange } from '@mui/material/colors'


const Header = () => {


    return (
        <header className='py-7 border-b-2 border-amber-600 sm:px-7 mb-5'>
            <div className="flex justify-between items-center">
                <h1 className='text-5xl font-medium '>
                    FilmHunt
                </h1>
                <div className=''>
                    <AccountCircleIcon fontSize="large" sx={{ color: deepOrange[300] }}></AccountCircleIcon>
                </div>
            </div>
        </header>   
    )
}

export default Header