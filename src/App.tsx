import { Routes, Route } from "react-router"
import Films from './films/Films'
import FilmPage from './FilmPage/FilmPage'
import './App.css'

function App() {

    return (
        <div className='min-h-screen flex flex-col px-2 sm:px-7 bg-gray-900 text-slate-400'>
            <Routes>
                <Route path='/' element={<Films />}/>
                <Route path='/film/:id' element={<FilmPage />} />
            </Routes>
        </div>
    )
}

export default App
