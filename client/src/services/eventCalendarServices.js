import axios from "axios"

export const getEventCalendars = (callback) => {
    axios.get("http://localhost:4000/api/events/", {withCredentials: true})
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

export const getEventCalendar= (id, callback) => {
    axios.get(`http://localhost:4000/api/events/${id}`, {withCredentials: true})
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

export const createEventCalendar = async (data) => {
    try {
        const response = await axios.post('http://localhost:4000/api/events/', data, {withCredentials: true})
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

export const updateEventCalendar = async (id, data) => {
    try {
        const response = await axios.patch(`http://localhost:4000/api/events/${id}`, data, {withCredentials: true});
        return response.data;
    } catch (error) {
       console.log(error.message)
       return error.message
    }
}

export const deleteEventCalendar = async (id) => {
    try {
        const response = await axios.delete(`http://localhost:4000/api/events/${id}`, {withCredentials: true})
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