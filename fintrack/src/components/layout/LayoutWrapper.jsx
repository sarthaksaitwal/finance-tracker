import Sidebar from './Sidebar'
import Navbar from './Navbar'

export default function LayoutWrapper({ activePage, onNavigate, dark, onToggleDark, children, user, onLogout }) {
  return (
    <div className="flex h-screen overflow-hidden" style={{ background: '#0f0f17' }}>
      {/* Sidebar */}
      <Sidebar activePage={activePage} onNavigate={onNavigate} />

      {/* Main panel */}
      <div className="flex flex-col flex-1 min-w-0">
        {/* Top navbar */}
        <Navbar dark={dark} onToggleDark={onToggleDark} userEmail={user?.email} onLogout={onLogout} />

        {/* Scrollable page content */}
        <main
          className="flex-1 overflow-y-auto"
          style={{ background: '#0f0f17' }}
          id="main-content"
          role="main"
          tabIndex={-1}
        >
          {children}
        </main>
      </div>
    </div>
  )
}
