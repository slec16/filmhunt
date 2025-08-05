import { Routes, Route } from "react-router"
import Films from './films/Films'
import FilmPage from './filmPage/FilmPage'
import './App.css'
import { AuthProvider, useAuth } from "./contexts/auth-context"

function App() {

    return (
        <AuthProvider>
            <div className='min-h-screen flex flex-col bg-gray-900 text-slate-400'>
                <Routes>
                    <Route path='/' element={<Films />}/>
                    <Route path='/film/:id' element={<FilmPage />} />
                </Routes>
                <div className="mt-auto bg-gray-950 w-full flex justify-center px-2"><span>FilmHunt</span></div>
            </div>
        </AuthProvider>
    )
}

export default App
