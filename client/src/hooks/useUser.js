import { useState, useEffect } from 'react';
import axios from 'axios';
import jwtDecode from 'jwt-decode'
import Cookies from 'js-cookie'
import { logout } from '../services/AuthServices'

const useUser = () => {
    const [user, setUser] = useState(null)
    const [error, setError] = useState(null)
    
    const accessToken = Cookies.get("accessToken")

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const decoded = jwtDecode(accessToken)
                let currentDate = new Date()
                if (decoded.exp * 1000 < currentDate.getTime()) {
                    return await logout()
                }
                const response = await axios.get("http://localhost:4000/api/me", {withCredentials: true});

                if (response.status === 200) {
                    setUser(response.data)
                    return response.data
                } else {
                    throw new Error('User ID not found');
                }
            } catch (err) {
                setError(err.message)
            }
        }

        fetchUser()
    }, [])

    return { user, error }
};

export default useUser;