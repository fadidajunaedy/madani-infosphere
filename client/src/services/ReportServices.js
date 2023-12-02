import axios from "axios"

export const getReports = (callback) => {
    axios.get("http://localhost:4000/api/reports/", {withCredentials: true})
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

export const getReport= (_id, callback) => {
    axios.get(`http://localhost:4000/api/reports/${_id}`, {withCredentials: true})
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

export const createReport = async (data) => {
    try {
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }
        const response = await axios.post('http://localhost:4000/api/reports/', data, config, {withCredentials: true})
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

export const updateReport = async (_id, data) => {
    try {
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }
        const response = await axios.patch(`http://localhost:4000/api/reports/${_id}`, data, config, {withCredentials: true});
        return response.data;
    } catch (error) {
       console.log(error.message)
       return error.message
    }
}

export const deleteReport = async (_id) => {
    try {
        const response = await axios.delete(`http://localhost:4000/api/reports/${_id}`, {withCredentials: true})
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