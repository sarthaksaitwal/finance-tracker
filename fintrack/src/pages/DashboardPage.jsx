import { motion } from 'framer-motion'
import SummaryCard from '../components/dashboard/SummaryCard'
import ChartCard from '../components/dashboard/ChartCard'
import LineChartComponent from '../components/dashboard/LineChartComponent'
import PieChartComponent from '../components/dashboard/PieChartComponent'
import TransactionList from '../components/dashboard/TransactionList'
import { useSummary } from '../hooks/useSummary'
import { useTransactions } from '../hooks/useTransactions'

// Summary card skeleton row
function SummarySkeletons() {
  return (
    <>
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className="rounded-2xl p-5 animate-pulse"
          style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}
        >
          <div className="h-3 w-24 bg-white/10 rounded mb-4" />
          <div className="h-8 w-32 bg-white/10 rounded mb-3" />
          <div className="h-3 w-20 bg-white/10 rounded" />
        </div>
      ))}
    </>
  )
}

export default function DashboardPage({ onNavigate }) {
  const { summary, chartData, breakdown, loading: summaryLoading } = useSummary()
  const { transactions, loading: txLoading } = useTransactions(5)

  return (
    <motion.div
      key="dashboard"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      className="p-8"
      style={{ maxWidth: 1280, margin: '0 auto' }}
    >
      {/* ── Summary Cards ──────────────────────────────────────────────────── */}
      <div
        className="grid gap-4 mb-6"
        style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}
        role="region"
        aria-label="Financial summary"
      >
        {summaryLoading || !summary ? (
          <SummarySkeletons />
        ) : (
          <>
            <SummaryCard
              type="income"
              label={summary.income.label}
              value={summary.income.value}
              change={summary.income.change}
              index={0}
            />
            <SummaryCard
              type="expense"
              label={summary.expense.label}
              value={summary.expense.value}
              change={summary.expense.change}
              index={1}
            />
            <SummaryCard
              type="balance"
              label={summary.balance.label}
              value={summary.balance.value}
              change={summary.balance.change}
              index={2}
            />
          </>
        )}
      </div>

      {/* ── Charts Row ─────────────────────────────────────────────────────── */}
      <div
        className="grid gap-4 mb-6"
        style={{ gridTemplateColumns: '1fr 1fr' }}
        role="region"
        aria-label="Charts"
      >
        {/* Spending Overview */}
        <ChartCard
          title="Spending Overview"
          subtitle="Your income vs expenses over time"
          index={0}
        >
          <LineChartComponent data={chartData} />
        </ChartCard>

        {/* Expense Breakdown */}
        <ChartCard
          title="Expense Breakdown"
          subtitle="Where your money goes"
          index={1}
        >
          <PieChartComponent data={breakdown} />
        </ChartCard>
      </div>

      {/* ── Recent Transactions ────────────────────────────────────────────── */}
      <TransactionList
        transactions={transactions}
        loading={txLoading}
        onViewAll={() => onNavigate('transactions')}
      />
    </motion.div>
  )
}
