import axios from 'axios'

const API_URL = 'http://localhost:3000/api';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

export const authAPI = {
    register: async (email, password) => {
        const response = await api.post('/auth/register/', { email, password })
        return response.data
    },

    login: async (email, password) => {
        const response = await api.post('/auth/login/', { email, password })
        return response.data
    }
}

export default api;