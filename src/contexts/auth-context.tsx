import { createContext, useState, useContext } from 'react'
import { useNavigate } from "react-router";

interface AuthContextType {
    token: string,
    isAuthorized: boolean,
    login: (newToken: string) => void
    logout: () => void
}

const AuthContext = createContext<AuthContextType>({
    token: '',
    isAuthorized: false,
    login: () => {},
    logout: () => {}
});

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    let navigate = useNavigate()
    const [token, setToken] = useState('')
    const [isAuthorized, setIsAuthorized] = useState(false)

    const login = (newToken: string) => {
        setToken(newToken)
        setIsAuthorized(true)
        navigate('/')
    }

    const logout = () => {
        setToken('')
        setIsAuthorized(false)
        navigate('/login')

    }

    return (
        <AuthContext.Provider value={{ token, isAuthorized, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}