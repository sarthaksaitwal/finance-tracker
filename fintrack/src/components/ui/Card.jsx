import { motion } from 'framer-motion'
import clsx from 'clsx'

// Lightweight classname helper (no extra dep)
function clsx(...args) {
  return args.filter(Boolean).join(' ')
}

export default function Card({ children, className = '', hover = false, animate = true, style = {} }) {
  const base = 'rounded-2xl border border-white/[0.07] bg-white/[0.03]'

  if (!animate) {
    return (
      <div className={clsx(base, className)} style={style}>
        {children}
      </div>
    )
  }

  return (
    <motion.div
      className={clsx(base, hover && 'cursor-pointer', className)}
      whileHover={hover ? { borderColor: 'rgba(255,255,255,0.12)', backgroundColor: 'rgba(255,255,255,0.05)' } : undefined}
      transition={{ duration: 0.15 }}
      style={style}
    >
      {children}
    </motion.div>
  )
}
