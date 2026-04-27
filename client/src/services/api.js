import axios from 'axios'

const API_URL = 'http://localhost:3000/api'

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

const getAuthHeaders = () => {
  const token = localStorage.getItem('token')
  return {
    Authorization: `Bearer ${token}`
  }
}

export const authAPI = {
  register: async (email, password) => {
    const response = await api.post('/auth/register', { email, password })
    return response.data
  },

  login: async (email, password) => {
    const response = await api.post('/auth/login', { email, password })
    return response.data
  }
}

export const transactionAPI = {
  create: async (transactionData) => {
    const response = await api.post('/transactions', transactionData, {
      headers: getAuthHeaders()
    })
    return response.data
  },

  getAll: async () => {
    const response = await api.get('/transactions', {
      headers: getAuthHeaders()
    })
    return response.data
  },

  deleteById: async (id) => {
    const response = await api.delete(`/transactions/${id}`, {
      headers: getAuthHeaders()
    })
    return response.data
  }
}

export default api