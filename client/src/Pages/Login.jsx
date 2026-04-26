import { useState } from 'react'
import { authAPI } from '../services/api'

export default function Login({ onLoginSuccess }) {
  const [formData, setFormData] = useState({ email: '', password: '' })
  const [message, setMessage] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const data = await authAPI.login(formData.email, formData.password)
      localStorage.setItem('token', data.token)
      setMessage('Login successful')
      setFormData({ email: '', password: '' })
      onLoginSuccess()
    } catch (error) {
      setMessage(error.response?.data?.message || 'Login failed')
    }
  }

  return (
    <section>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type='email'
          placeholder='Email'
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
        <input
          type='password'
          placeholder='Password'
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        />
        <button type='submit'>Sign In</button>
      </form>
      {message && <p>{message}</p>}
    </section>
  )
}