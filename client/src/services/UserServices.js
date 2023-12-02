import axios from "axios"

export const getUsers = (callback) => {
    axios.get("http://localhost:4000/api/users/", {withCredentials: true})
        .then(response => {
            callback(response.data)
        })
        .catch(error => {
            if (error.response && error.response.data) {
                throw new Error(error.response.data.message)
            } else {
                throw new Error('An error occurred while trying to log in')
            }
        })
}

export const getUser= (id, callback) => {
    axios.get(`http://localhost:4000/api/users/${id}`, {withCredentials: true})
        .then(response => {
            callback(response.data)
        })
        .catch(error => {
            if (error.response && error.response.data) {
                throw new Error(error.response.data.message)
            } else {
                throw new Error('An error occurred while trying to log in')
            }
        })
}

export const updateUser = async (id, data) => {
    try {
        const response = await axios.patch(`http://localhost:4000/api/users/${id}`, data, {withCredentials: true});
        return response.data;
    } catch (error) {
       console.log(error.message)
       return error.message
    }
}

export const deleteUser = async (id) => {
    try {
        const response = await axios.delete(`http://localhost:4000/api/users/${id}`, {withCredentials: true})
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