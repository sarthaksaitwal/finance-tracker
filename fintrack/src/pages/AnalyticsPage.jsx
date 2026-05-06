import { motion } from 'framer-motion'
import ChartCard from '../components/dashboard/ChartCard'
import LineChartComponent from '../components/dashboard/LineChartComponent'
import PieChartComponent from '../components/dashboard/PieChartComponent'
import { useSummary } from '../hooks/useSummary'
import { formatCurrency } from '../services/transactionService'

export default function AnalyticsPage() {
  const { summary, chartData, breakdown, loading } = useSummary()

  return (
    <motion.div
      key="analytics"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.25 }}
      className="p-8"
      style={{ maxWidth: 1280, margin: '0 auto' }}
    >
      <div className="mb-6">
        <h2 className="text-white font-bold mb-1" style={{ fontSize: 22 }}>Analytics</h2>
        <p className="text-slate-500 text-sm">Deep dive into your financial patterns</p>
      </div>

      <div className="grid gap-4" style={{ gridTemplateColumns: '1fr 1fr' }}>
        <ChartCard title="6-Month Spending Trend" subtitle="Income vs Expenses" index={0}>
          {loading
            ? <div className="h-56 animate-pulse bg-white/5 rounded-xl" />
            : <LineChartComponent data={chartData} />
          }
        </ChartCard>

        <ChartCard title="Expense Breakdown" subtitle="Category distribution" index={1}>
          {loading
            ? <div className="h-56 animate-pulse bg-white/5 rounded-xl" />
            : <PieChartComponent data={breakdown} />
          }
        </ChartCard>
      </div>

      {/* Insight cards */}
      <div className="grid grid-cols-3 gap-4 mt-4">
        {[
          { label: 'Avg Monthly Income',  value: !loading && summary ? formatCurrency(summary.income.value) : '—', color: '#00d68f' },
          { label: 'Avg Monthly Expense', value: !loading && summary ? formatCurrency(summary.expense.value) : '—', color: '#ff4d6a' },
          { label: 'Avg Monthly Savings', value: !loading && summary ? formatCurrency(summary.balance.value) : '—', color: '#4d9fff' },
        ].map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 + 0.3 }}
            className="rounded-2xl p-5"
            style={{
              background: 'rgba(255,255,255,0.025)',
              border: '1px solid rgba(255,255,255,0.07)',
            }}
          >
            <p className="text-slate-400 text-xs font-medium mb-2">{item.label}</p>
            <p className="font-bold font-mono" style={{ fontSize: 24, color: item.color }}>
              {item.value}
            </p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
