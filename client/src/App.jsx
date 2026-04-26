import { useState } from 'react'
import Login from './Pages/Login'
import Register from './Pages/Register'
import Dashboard from './Pages/Dashboard'

export default function App() {
  const [activePage, setActivePage] = useState(() => {
    const token = localStorage.getItem('token')
    return token ? 'dashboard' : 'login'
  })

  const handleLogout = () => {
    localStorage.removeItem('token')
    setActivePage('login')
  }

  return (
    <div className='app-shell'>
      <h1>Finance Tracker</h1>

      <nav className='nav-buttons'>
        <button onClick={() => setActivePage('login')}>Login</button>
        <button onClick={() => setActivePage('register')}>Register</button>
        <button onClick={() => setActivePage('dashboard')}>Dashboard</button>
        <button onClick={handleLogout}>Logout</button>
      </nav>

      <main className='page-card'>
        {activePage === 'login' && (
          <Login onLoginSuccess={() => setActivePage('dashboard')} />
        )}
        {activePage === 'register' && <Register />}
        {activePage === 'dashboard' && <Dashboard />}
      </main>
    </div>
  )
}