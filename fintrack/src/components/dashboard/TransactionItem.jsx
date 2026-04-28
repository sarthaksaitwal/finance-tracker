import { motion } from 'framer-motion'
import IconWrapper from '../ui/IconWrapper'
import { formatCurrency } from '../../services/transactionService'

const rowVariants = {
  hidden:  { opacity: 0, x: -10 },
  visible: (i) => ({
    opacity: 1, x: 0,
    transition: { duration: 0.3, delay: i * 0.07, ease: 'easeOut' },
  }),
}

export default function TransactionItem({ tx, index = 0, showDivider = true }) {
  const isIncome = tx.amount > 0

  return (
    <>
      <motion.div
        custom={index}
        variants={rowVariants}
        initial="hidden"
        animate="visible"
        className="tx-row"
        role="listitem"
      >
        {/* Icon */}
        <IconWrapper bg={tx.iconBg} size={42} radius={12} fontSize={18}>
          {tx.icon}
        </IconWrapper>

        {/* Title + meta */}
        <div className="flex-1 min-w-0">
          <p
            className="font-semibold text-slate-100 truncate"
            style={{ fontSize: 13.5 }}
          >
            {tx.title}
          </p>
          <p className="text-slate-500 mt-0.5" style={{ fontSize: 12 }}>
            {tx.category}
            <span className="mx-1.5 text-slate-600">•</span>
            {tx.date}
          </p>
        </div>

        {/* Amount */}
        <span
          className="font-bold font-mono flex-shrink-0"
          style={{
            fontSize: 14.5,
            color: isIncome ? '#00d68f' : '#ff4d6a',
            letterSpacing: '-0.3px',
          }}
          aria-label={`${isIncome ? 'Income' : 'Expense'} ${formatCurrency(Math.abs(tx.amount))}`}
        >
          {isIncome ? '+' : '-'}
          {formatCurrency(Math.abs(tx.amount))}
        </span>
      </motion.div>

      {/* Divider */}
      {showDivider && (
        <div
          className="mx-2"
          style={{ height: 1, background: 'rgba(255,255,255,0.04)' }}
        />
      )}
    </>
  )
}
