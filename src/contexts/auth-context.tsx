import { createContext, useState, useContext } from 'react'

interface AuthContextType {
    token: string,
    login: (newToken: string) => void
}

const AuthContext = createContext<AuthContextType>({
    token: '',
    login: () => {}
});

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }: {children: React.ReactNode}) => {
    const [token, setToken] = useState('')

    const login = (newToken: string) => setToken(newToken)


    return (
        <AuthContext.Provider value={{ token, login }}>
            {children}
        </AuthContext.Provider>
    )
}