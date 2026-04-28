import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import LayoutWrapper from './components/layout/LayoutWrapper'
import DashboardPage   from './pages/DashboardPage'
import TransactionsPage from './pages/TransactionsPage'
import AnalyticsPage   from './pages/AnalyticsPage'
import SettingsPage    from './pages/SettingsPage'
import AuthPages from './pages/LoginPage'
import authService from './services/authService'
import { useDarkMode } from './hooks/useDarkMode'

export default function App() {
  const [activePage, setActivePage] = useState('dashboard')
  const [token, setToken] = useState(() => authService.getToken() || null)
  const [user, setUser] = useState(() => authService.getUserFromToken(authService.getToken()) || null)
  const { dark, toggle } = useDarkMode()

  const renderPage = () => {
    switch (activePage) {
      case 'dashboard':    return <DashboardPage onNavigate={setActivePage} />
      case 'transactions': return <TransactionsPage />
      case 'analytics':    return <AnalyticsPage />
      case 'settings':     return <SettingsPage dark={dark} onToggleDark={toggle} />
      default:             return <DashboardPage onNavigate={setActivePage} />
    }
  }

  const handleAuthSuccess = (t) => {
    setToken(t)
    const u = authService.getUserFromToken(t)
    setUser(u)
  }

  const handleLogout = () => {
    authService.clearToken()
    setToken(null)
    setUser(null)
  }

  if (!token) {
    return <AuthPages onAuthSuccess={handleAuthSuccess} />
  }

  return (
    <LayoutWrapper
      activePage={activePage}
      onNavigate={setActivePage}
      dark={dark}
      onToggleDark={toggle}
      user={user}
      onLogout={handleLogout}
    >
      <AnimatePresence mode="wait">
        {renderPage()}
      </AnimatePresence>
    </LayoutWrapper>
  )
}
