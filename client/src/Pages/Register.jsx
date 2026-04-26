import { useState } from 'react'
import { authAPI } from '../services/api'

export default function Register() {
  const [formData, setFormData] = useState({ email: '', password: '' })
  const [message, setMessage] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await authAPI.register(formData.email, formData.password)
      setMessage('Registration successful!')
      setFormData({ email: '', password: '' })
    } catch (error) {
      setMessage(error.response?.data?.message || 'Registration failed')
    }
  }

  return (
    <section>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        />
        <button type="submit">Create Account</button>
      </form>
      {message && <p>{message}</p>}
    </section>
  )
}