import { createContext, useEffect, useState } from 'react';
import { getUserLogin } from '../services/AuthServices';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [userData, setUserData] = useState({})

    const navigate = useNavigate()

    const handleGetUserLogin = async () => {
        try {
            const response = await getUserLogin()
            setUserData(response)
        } catch (error) {
            navigate("/login", { state: { loginMessage: "Login terlebih dahulu" } })
        }
    }

    useEffect(() => {
        handleGetUserLogin()
    }, [])

    return (
        <AuthContext.Provider value={{ userData, setUserData }}>
            { children }
        </AuthContext.Provider>
    );
}
