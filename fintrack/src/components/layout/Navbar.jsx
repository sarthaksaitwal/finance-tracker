import { motion } from 'framer-motion'
import Icon from '../ui/Icon'
import Button from '../ui/Button'

export default function Navbar({ dark, onToggleDark, userEmail, onLogout }) {
  return (
    <motion.header
      initial={{ y: -16, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="flex items-center justify-between px-8"
      style={{
        height: 64,
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        background: '#0d0d1a',
        flexShrink: 0,
      }}
      role="banner"
    >
      {/* Left: Welcome text */}
      <div>
        <h1 className="font-bold text-white" style={{ fontSize: 18, letterSpacing: '-0.3px', lineHeight: 1.2 }}>
          Welcome back, {userEmail || 'Alex'}
        </h1>
        <p className="text-slate-400" style={{ fontSize: 12.5, marginTop: 1 }}>
          Here's your financial overview
        </p>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-2">
        {/* Theme toggle */}
        <Button
          variant="icon"
          onClick={onToggleDark}
          title={dark ? 'Switch to light mode' : 'Switch to dark mode'}
          aria-label="Toggle theme"
          className="w-9 h-9"
        >
          <Icon name={dark ? 'sun' : 'moon'} size={15} color="#94a3b8" />
        </Button>

        {/* Notifications */}
        <Button
          variant="icon"
          title="Notifications"
          aria-label="View notifications"
          className="w-9 h-9 relative"
        >
          <Icon name="bell" size={15} color="#94a3b8" />
          {/* Unread dot */}
          <span
            className="absolute rounded-full"
            style={{
              width: 7, height: 7,
              background: '#ff4d6a',
              top: 7, right: 7,
              border: '1.5px solid #0d0d1a',
            }}
          />
        </Button>

        {/* Logout */}
        <Button
          variant="icon"
          title="Logout"
          aria-label="Logout"
          onClick={() => onLogout && onLogout()}
          className="w-9 h-9"
        >
          <Icon name="logout" size={15} color="#94a3b8" />
        </Button>

        {/* Divider */}
        <div
          className="mx-1"
          style={{ width: 1, height: 22, background: 'rgba(255,255,255,0.08)' }}
        />

        {/* Profile */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          className="flex items-center gap-2.5 rounded-xl px-3 py-1.5 cursor-pointer"
          style={{
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.08)',
          }}
          aria-label="User menu"
        >
          {/* Avatar */}
          <div
            className="flex items-center justify-center rounded-full text-white font-bold"
            style={{
              width: 28, height: 28, fontSize: 11,
              background: 'linear-gradient(135deg, #f97316, #ef4444)',
              flexShrink: 0,
            }}
          >
            {userEmail ? userEmail.charAt(0).toUpperCase() : 'A'}
          </div>
          <span className="text-sm font-semibold text-slate-200">{userEmail || 'Alex'}</span>
          <Icon name="chevronDown" size={13} color="#64748b" />
        </motion.button>
      </div>
    </motion.header>
  )
}
