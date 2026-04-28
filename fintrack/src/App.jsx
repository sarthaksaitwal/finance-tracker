import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import LayoutWrapper from './components/layout/LayoutWrapper'
import DashboardPage   from './pages/DashboardPage'
import TransactionsPage from './pages/TransactionsPage'
import AnalyticsPage   from './pages/AnalyticsPage'
import SettingsPage    from './pages/SettingsPage'
import { useDarkMode } from './hooks/useDarkMode'

export default function App() {
  const [activePage, setActivePage] = useState('dashboard')
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

  return (
    <LayoutWrapper
      activePage={activePage}
      onNavigate={setActivePage}
      dark={dark}
      onToggleDark={toggle}
    >
      <AnimatePresence mode="wait">
        {renderPage()}
      </AnimatePresence>
    </LayoutWrapper>
  )
}
