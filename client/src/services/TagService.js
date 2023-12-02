import axios from "axios"

export const getTags= (callback) => {
    axios.get("http://localhost:4000/api/tags/", {withCredentials: true})
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

export const getTag= (id, callback) => {
    axios.get(`http://localhost:4000/api/tags/${id}`, {withCredentials: true})
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

export const createTag = async (data) => {
    try {
        const response = await axios.post('http://localhost:4000/api/tags/', data, {withCredentials: true})
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

export const updateTag = async (id, data) => {
    try {
        const response = await axios.patch(`http://localhost:4000/api/tags/${id}`, data, {withCredentials: true});
        return response.data;
    } catch (error) {
       console.log(error.message)
       return error.message
    }
}

export const deleteTag = async (id) => {
    try {
        const response = await axios.delete(`http://localhost:4000/api/tags/${id}`, {withCredentials: true})
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