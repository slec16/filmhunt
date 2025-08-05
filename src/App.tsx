import { Routes, Route } from "react-router"
import Films from './films/Films'
import FilmPage from './filmPage/FilmPage'
import Header from "./components/Header"
import './App.css'
import { AuthProvider } from "./contexts/auth-context"
import PrivateRoute from "./components/PrivateRoute"

function App() {

    // const { token } = useAuth()

    return (
        <AuthProvider>
            <div className='min-h-screen flex flex-col bg-gray-900 text-slate-400'>
                <Routes>
                    {/* {token ?
                        (
                            <>
                                <Route path='/' element={<Films />}/>
                                <Route path='/film/:id' element={<FilmPage />} />
                            </>
                        )
                        : 
                        <Route path="/" element={<Header />}/>
                    } */}
                    <Route path='/' element={<PrivateRoute><Films /></PrivateRoute>} />
                    <Route path='/film/:id' element={<PrivateRoute><FilmPage /></PrivateRoute>} />
                    <Route path="/login" element={<Header />}/>
                </Routes>
                <div className="mt-auto bg-gray-950 w-full flex justify-center px-2"><span>FilmHunt</span></div>
            </div>
        </AuthProvider>
    )
}

export default App
