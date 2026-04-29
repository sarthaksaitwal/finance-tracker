import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import TransactionItem from '../components/dashboard/TransactionItem'
import { useTransactions } from '../hooks/useTransactions'
import Icon from '../components/ui/Icon'

const FILTERS = ['All', 'Income', 'Expense']

export default function TransactionsPage() {
  const { transactions, loading } = useTransactions()
  const [filter, setFilter] = useState('All')
  const [search, setSearch] = useState('')

  const filtered = transactions.filter((tx) => {
    const matchFilter =
      filter === 'All' ||
      (filter === 'Income' && tx.amount > 0) ||
      (filter === 'Expense' && tx.amount < 0)
    const matchSearch =
      tx.title.toLowerCase().includes(search.toLowerCase()) ||
      tx.category.toLowerCase().includes(search.toLowerCase()) ||
      (tx.description || '').toLowerCase().includes(search.toLowerCase())
    return matchFilter && matchSearch
  })

  return (
    <motion.div
      key="transactions"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.25 }}
      className="p-8"
      style={{ maxWidth: 900, margin: '0 auto' }}
    >
      {/* Page heading */}
      <div className="mb-6">
        <h2 className="text-white font-bold mb-1" style={{ fontSize: 22 }}>Transactions</h2>
        <p className="text-slate-500 text-sm">Your complete financial history</p>
      </div>

      {/* Toolbar */}
      <div className="flex items-center gap-3 mb-5">
        {/* Search */}
        <div
          className="flex items-center gap-2 flex-1 rounded-xl px-3.5 py-2.5"
          style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
        >
          <Icon name="analytics" size={14} color="#64748b" />
          <input
            type="text"
            placeholder="Search transactions…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 bg-transparent text-sm text-slate-200 placeholder-slate-500 outline-none"
          />
        </div>

        {/* Filter buttons */}
        <div className="flex items-center gap-1 rounded-xl p-1" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}>
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className="px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all duration-150"
              style={
                filter === f
                  ? { background: 'rgba(99,102,241,0.25)', color: '#818cf8' }
                  : { color: '#64748b' }
              }
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Transaction list */}
      <div
        className="rounded-2xl p-4"
        style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.07)' }}
        role="list"
      >
        {loading ? (
          Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="flex items-center gap-4 py-4 px-2 animate-pulse">
              <div className="rounded-xl bg-white/5 w-11 h-11 flex-shrink-0" />
              <div className="flex-1">
                <div className="h-3 bg-white/5 rounded w-36 mb-2" />
                <div className="h-2.5 bg-white/5 rounded w-20" />
              </div>
              <div className="h-4 bg-white/5 rounded w-16" />
            </div>
          ))
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center py-16 text-slate-500">
            <span style={{ fontSize: 40, marginBottom: 12 }}>🔍</span>
            <p className="font-medium text-sm">No results found</p>
          </div>
        ) : (
          <AnimatePresence>
            {filtered.map((tx, i) => (
              <TransactionItem
                key={tx.id}
                tx={tx}
                index={i}
                showDivider={i < filtered.length - 1}
              />
            ))}
          </AnimatePresence>
        )}
      </div>

      <p className="text-slate-600 text-xs mt-3 text-right">
        {filtered.length} transaction{filtered.length !== 1 ? 's' : ''}
      </p>
    </motion.div>
  )
}
