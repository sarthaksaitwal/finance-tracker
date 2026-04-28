import { motion } from 'framer-motion'
import TransactionItem from './TransactionItem'
import Icon from '../ui/Icon'

// Loading skeleton
function TxSkeleton() {
  return (
    <div className="flex items-center gap-4 py-4 px-2 animate-pulse">
      <div className="rounded-xl bg-white/5 flex-shrink-0" style={{ width: 42, height: 42 }} />
      <div className="flex-1">
        <div className="h-3 bg-white/5 rounded w-40 mb-2" />
        <div className="h-2.5 bg-white/5 rounded w-24" />
      </div>
      <div className="h-4 bg-white/5 rounded w-16" />
    </div>
  )
}

export default function TransactionList({ transactions, loading, onViewAll }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="rounded-2xl p-6"
      style={{
        background: 'rgba(255,255,255,0.025)',
        border: '1px solid rgba(255,255,255,0.07)',
      }}
      role="region"
      aria-label="Recent Transactions"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="font-bold text-white" style={{ fontSize: 15 }}>
            Recent Transactions
          </h3>
          <p className="text-slate-500 mt-0.5" style={{ fontSize: 12 }}>
            Your latest financial activity
          </p>
        </div>

        {/* View all link */}
        <motion.button
          onClick={onViewAll}
          whileHover={{ x: 2 }}
          className="flex items-center gap-1.5 text-slate-400 hover:text-indigo-400 transition-colors duration-150"
          style={{ fontSize: 12.5, fontWeight: 500 }}
        >
          View all
          <Icon name="arrowRight" size={13} color="currentColor" />
        </motion.button>
      </div>

      {/* List */}
      <div role="list" aria-label="Transaction list">
        {loading
          ? Array.from({ length: 5 }).map((_, i) => <TxSkeleton key={i} />)
          : transactions.map((tx, i) => (
              <TransactionItem
                key={tx.id}
                tx={tx}
                index={i}
                showDivider={i < transactions.length - 1}
              />
            ))
        }

        {/* Empty state */}
        {!loading && transactions.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12 text-slate-500">
            <span style={{ fontSize: 36, marginBottom: 12 }}>💸</span>
            <p className="font-medium text-sm">No transactions yet</p>
            <p className="text-xs mt-1">Start tracking your finances</p>
          </div>
        )}
      </div>
    </motion.div>
  )
}
