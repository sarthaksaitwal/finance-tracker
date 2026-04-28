import { motion } from 'framer-motion'
import Icon from '../ui/Icon'
import { NAV_ITEMS } from '../../data/mockData'

const sidebarVariants = {
  hidden:  { x: -24, opacity: 0 },
  visible: {
    x: 0, opacity: 1,
    transition: { duration: 0.35, ease: 'easeOut', staggerChildren: 0.07 },
  },
}

const itemVariants = {
  hidden:  { x: -12, opacity: 0 },
  visible: { x: 0,   opacity: 1, transition: { duration: 0.25 } },
}

export default function Sidebar({ activePage, onNavigate }) {
  return (
    <motion.aside
      variants={sidebarVariants}
      initial="hidden"
      animate="visible"
      className="flex flex-col h-full"
      style={{
        width: 200,
        minWidth: 200,
        background: '#0d0d1a',
        borderRight: '1px solid rgba(255,255,255,0.06)',
        padding: '24px 12px',
      }}
      role="navigation"
      aria-label="Main navigation"
    >
      {/* Logo */}
      <motion.div variants={itemVariants} className="flex items-center gap-2.5 px-3 mb-8">
        <div
          className="flex items-center justify-center rounded-xl"
          style={{
            width: 34, height: 34,
            background: 'linear-gradient(135deg, #6366f1, #4f46e5)',
            boxShadow: '0 4px 12px rgba(99,102,241,0.4)',
          }}
        >
          <span style={{ fontSize: 16 }}>💹</span>
        </div>
        <span
          className="font-bold text-white"
          style={{ fontSize: 17, letterSpacing: '-0.3px' }}
        >
          FinTrack
        </span>
      </motion.div>

      {/* Nav items */}
      <nav className="flex flex-col gap-1 flex-1">
        {NAV_ITEMS.map((item) => {
          const active = activePage === item.id
          return (
            <motion.button
              key={item.id}
              variants={itemVariants}
              onClick={() => onNavigate(item.id)}
              aria-current={active ? 'page' : undefined}
              whileTap={{ scale: 0.97 }}
              className="nav-item w-full text-left"
              style={
                active
                  ? {
                      background: 'rgba(99,102,241,0.15)',
                      color: '#818cf8',
                      border: '1px solid rgba(99,102,241,0.25)',
                    }
                  : {}
              }
            >
              <Icon
                name={item.icon}
                size={16}
                color={active ? '#818cf8' : '#64748b'}
                strokeWidth={active ? 2.2 : 1.8}
              />
              <span className={active ? 'text-indigo-300 font-semibold' : ''}>
                {item.label}
              </span>
            </motion.button>
          )
        })}
      </nav>

      {/* Pro Tip card at bottom */}
      <motion.div
        variants={itemVariants}
        className="mt-auto rounded-xl p-3.5"
        style={{
          background: 'rgba(99,102,241,0.08)',
          border: '1px solid rgba(99,102,241,0.15)',
        }}
      >
        <p className="text-xs font-semibold text-indigo-400 mb-1">Pro Tip</p>
        <p className="text-xs text-slate-400 leading-relaxed">
          Track your expenses daily for better financial insights.
        </p>
      </motion.div>
    </motion.aside>
  )
}
