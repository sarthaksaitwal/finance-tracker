import { motion } from 'framer-motion'
import { formatCurrency, formatChange } from '../../services/transactionService'
import Icon from '../ui/Icon'

const CARD_CONFIG = {
  income: {
    gradient:    'linear-gradient(135deg, rgba(0,214,143,0.12), rgba(0,214,143,0.04))',
    border:      'rgba(0,214,143,0.2)',
    iconBg:      'rgba(0,214,143,0.15)',
    iconColor:   '#00d68f',
    changeColor: '#00d68f',
    glowColor:   'rgba(0,214,143,0.08)',
    icon:        'trendUp',
  },
  expense: {
    gradient:    'linear-gradient(135deg, rgba(255,77,106,0.12), rgba(255,77,106,0.04))',
    border:      'rgba(255,77,106,0.2)',
    iconBg:      'rgba(255,77,106,0.15)',
    iconColor:   '#ff4d6a',
    changeColor: '#ff4d6a',
    glowColor:   'rgba(255,77,106,0.08)',
    icon:        'trendDown',
  },
  balance: {
    gradient:    'linear-gradient(135deg, rgba(77,159,255,0.12), rgba(77,159,255,0.04))',
    border:      'rgba(77,159,255,0.2)',
    iconBg:      'rgba(77,159,255,0.15)',
    iconColor:   '#4d9fff',
    changeColor: '#00d68f',
    glowColor:   'rgba(77,159,255,0.08)',
    icon:        'wallet',
  },
}

const cardVariants = {
  hidden:  { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.4, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
  }),
}

export default function SummaryCard({ type = 'income', label, value, change, index = 0, loading = false }) {
  const cfg = CARD_CONFIG[type]

  if (loading) {
    return (
      <div
        className="rounded-2xl p-5 animate-pulse"
        style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}
      >
        <div className="h-3 w-24 bg-white/10 rounded mb-4" />
        <div className="h-8 w-32 bg-white/10 rounded mb-3" />
        <div className="h-3 w-20 bg-white/10 rounded" />
      </div>
    )
  }

  const changePositive = change >= 0

  return (
    <motion.div
      custom={index}
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      className="rounded-2xl p-5 relative overflow-hidden"
      style={{
        background: cfg.gradient,
        border: `1px solid ${cfg.border}`,
        boxShadow: `0 0 40px ${cfg.glowColor}`,
      }}
      role="region"
      aria-label={label}
    >
      {/* Subtle background glow blob */}
      <div
        className="absolute -top-6 -right-6 rounded-full pointer-events-none"
        style={{ width: 80, height: 80, background: cfg.glowColor, filter: 'blur(20px)' }}
      />

      {/* Header row */}
      <div className="flex items-start justify-between mb-3 relative z-10">
        <span className="text-slate-400 font-medium" style={{ fontSize: 13 }}>
          {label}
        </span>
        {/* Icon box */}
        <div
          className="flex items-center justify-center rounded-xl"
          style={{ width: 36, height: 36, background: cfg.iconBg }}
        >
          <Icon name={cfg.icon} size={16} color={cfg.iconColor} strokeWidth={2.2} />
        </div>
      </div>

      {/* Amount */}
      <div
        className="font-bold text-white relative z-10 mb-2"
        style={{ fontSize: 30, letterSpacing: '-0.8px', fontFamily: 'JetBrains Mono, monospace' }}
      >
        {formatCurrency(value)}
      </div>

      {/* % Change */}
      <div className="flex items-center gap-1.5 relative z-10">
        <span
          className="text-xs font-bold"
          style={{ color: changePositive ? '#00d68f' : '#ff4d6a' }}
        >
          {formatChange(change)}
        </span>
        <span className="text-xs text-slate-500">vs last month</span>
      </div>
    </motion.div>
  )
}
