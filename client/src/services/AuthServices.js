import axios from "axios"
import Cookies from "js-cookie"

export const checkToken = async () => {
    try {
        const response = await axios.get('http://localhost:4000/api/checkToken', {withCredentials: true})
        return response.data
    } catch (error) {
        if (error.response && error.response.data) {
            throw new Error(error.response.data.message)
        } else {
            throw new Error('An error occurred while trying to log in')
        }
    }
}

export const register = async (data) => {
    try {
        const response = await axios.post('http://localhost:4000/api/register', data, {withCredentials: true})
        console.log(response.data)
        return response.data
    } catch (error) {
        if (error.response && error.response.data) {
            throw new Error(error.response.data.message)
        } else {
            throw new Error('An error occurred while trying to log in')
        }
    }
}

export const login = async (data) => {
    try {
        const response = await axios.post('http://localhost:4000/api/login', data, {withCredentials: true})
        // Cookies.set('accessToken', response.data.accessToken)
        // Cookies.set('refreshToken', response.data.refreshToken)
        return response.data
    } catch (error) {
        if (error.response && error.response.data) {
            throw new Error(error.response.data.message)
        } else {
            throw new Error('An error occurred while trying to log in')
        }
    }
}

export const getUserLogin = async () => {
    try {
        const response = await axios.get('http://localhost:4000/api/me', {withCredentials: true})
        return response.data
    } catch (error) {
        if (error.response && error.response.data) {
            throw new Error(error.response.data.message)
        } else {
            throw new Error('An error occurred while trying to log in')
        }
    }
}

export const updateProfile = async (data) => {
    try {
        const response = await axios.patch(`http://localhost:4000/api/me/update`, data, {withCredentials: true})
        return response.data
    } catch (error) {
       console.log(error.message)
       return error.message
    }
}

export const changePassword = async (data) => {
    try {
        const response = await axios.post(`http://localhost:4000/api/me/change-password`, data, {withCredentials: true});
        return response.data
    } catch (error) {
        if (error.response && error.response.data) {
            throw new Error(error.response.data.message)
        } else {
            throw new Error('An error occurred while trying to log in')
        }
    }
}

export const getRefreshToken = async () => {
    try {
        const response = await axios.post('http://localhost:4000//api/refreshToken', {withCredentials: true})
        console.log(response)
        return response.message
    } catch (error) {
        console.error(error);
        if (error.response && error.response.data) {
            throw new Error(error.response.data.message)
        } else {
            throw new Error('An error occurred while trying to log in')
        }
    }
}

export const logout = async () => {
    try {
        const response = await axios.post('http://localhost:4000/api/logout', {}, {withCredentials: true})
        Cookies.remove('accessToken')
        Cookies.remove('refreshToken')
        return response.message
    } catch (error) {
        console.error(error);
        if (error.response && error.response.data) {
            throw new Error(error.response.data.message)
        } else {
            throw new Error('An error occurred while trying to log in')
        }
    }
}

export const emailVerification = async (_id, verificationToken) => {
    try {
        const response = await axios.get(`http://localhost:4000/api/${_id}/verify/${verificationToken}`, {withCredentials: true})
        console.log(response.data)
        return response.data
    } catch (error) {
        if (error.response && error.response.data) {
            throw new Error(error.response.data.message)
        } else {
            throw new Error('An error occurred while trying to log in')
        }
    }
}

export const forgotPassword = async (password) => {
    try {
        const response = await axios.post('http://localhost:4000/api/forgot-password', password, {withCredentials: true})
        console.log(response.data)
        return response.data
    } catch (error) {
        if (error.response && error.response.data) {
            throw new Error(error.response.data.message)
        } else {
            throw new Error('An error occurred while trying to log in')
        }
    }
}

export const checkIdAndTokenResetPassword = async (data) => {
    try {
        const response = await axios.post('http://localhost:4000/api/check-token-reset-password/', data, {withCredentials: true})
        return response.data
    } catch (error) {
        if (error.response && error.response.data) {
            throw new Error(error.response.data.message)
        } else {
            throw new Error('An error occurred while trying to log in')
        }
    }
}

export const resetPassword = async (_id, token, password) => {
    try {
        const response = await axios.post(`http://localhost:4000/api/reset-password/${_id}/${token}`, password, {withCredentials: true})
        console.log(response.data)
        return response.data
    } catch (error) {
        if (error.response && error.response.data) {
            throw new Error(error.response.data.message)
        } else {
            throw new Error('An error occurred while trying to log in')
        }
    }
}
