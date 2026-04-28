import { motion } from 'framer-motion'

const cardVariants = {
  hidden:  { opacity: 0, y: 16 },
  visible: (i) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.45, delay: (i ?? 0) * 0.1 + 0.25, ease: [0.22, 1, 0.36, 1] },
  }),
}

export default function ChartCard({ title, subtitle, children, index = 0, className = '', headerRight }) {
  return (
    <motion.div
      custom={index}
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      className={`rounded-2xl p-6 ${className}`}
      style={{
        background: 'rgba(255,255,255,0.025)',
        border: '1px solid rgba(255,255,255,0.07)',
      }}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-1">
        <div>
          <h3 className="font-bold text-white" style={{ fontSize: 15 }}>{title}</h3>
          {subtitle && (
            <p className="text-slate-500 mt-0.5" style={{ fontSize: 12 }}>{subtitle}</p>
          )}
        </div>
        {headerRight && <div>{headerRight}</div>}
      </div>

      {/* Content */}
      <div className="mt-4">{children}</div>
    </motion.div>
  )
}
