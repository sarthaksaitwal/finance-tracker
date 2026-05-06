import authService from './authService.js'

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:3000'

async function parseJson(res) {
  const json = await res.json().catch(() => null)
  if (!res.ok) throw new Error(json?.message || 'Request failed')
  return json
}

export const fetchTransactions = async () => {
  const res = await authService.fetchWithAuth(`${API_BASE}/api/transactions`, { method: 'GET' })
  const json = await parseJson(res)
  const txs = json?.transactions || []
  return txs.map((t) => {
    const amount = Number(t.amount) || 0
    let signedAmount = amount
    if (t.type === 'expense' && amount > 0) signedAmount = -Math.abs(amount)
    if (t.type === 'income' && amount < 0) signedAmount = Math.abs(amount)
    const isIncome = signedAmount > 0
    return {
      id: t._id || t.id,
      title: t.title || t.category || 'Transaction',
      category: t.category || 'General',
      // human-friendly date for display
      date: new Date(t.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      // raw ISO date for charting/aggregation
      rawDate: t.date,
      // new schema fields
      description: t.description || '',
      paymentMethod: t.paymentMethod || 'cash',
      amount: signedAmount,
      icon: isIncome ? '💰' : '🛍️',
      iconBg: isIncome ? '#00d68f22' : '#ff4d6a22',
      iconColor: isIncome ? '#00d68f' : '#ff4d6a',
    }
  })
}

export const fetchSummary = async () => {
  const txs = await fetchTransactions()
  const income = txs.filter(t => t.amount > 0).reduce((s, t) => s + t.amount, 0)
  const expense = txs.filter(t => t.amount < 0).reduce((s, t) => s + Math.abs(t.amount), 0)
  return {
    income: { label: 'Total Income', value: Math.round(income), change: 0, icon: '📈', type: 'income' },
    expense: { label: 'Total Expense', value: Math.round(expense), change: 0, icon: '📉', type: 'expense' },
    balance: { label: 'Balance', value: Math.round(income - expense), change: 0, icon: '💳', type: 'balance' },
  }
}

export const fetchChartData = async () => {
  const txs = await fetchTransactions()
  if (!txs.length) return []
  const map = {}
  txs.forEach(tx => {
    // use rawDate for reliable parsing
    const d = new Date(tx.rawDate || tx.date)
    const key = `${d.getFullYear()}-${d.getMonth()}`
    if (!map[key]) map[key] = { month: d.toLocaleString('en-US', { month: 'short' }), income: 0, expense: 0 }
    if (tx.amount > 0) map[key].income += tx.amount
    else map[key].expense += Math.abs(tx.amount)
  })
  const entries = Object.keys(map)
    .sort((a,b) => {
      const [ay, am] = a.split('-').map(Number)
      const [by, bm] = b.split('-').map(Number)
      return ay === by ? am - bm : ay - by
    })
    .slice(-6)
    .map(k => map[k])
  return entries
}

export const fetchExpenseBreakdown = async () => {
  const txs = await fetchTransactions()
  const totals = {}
  txs.forEach(tx => {
    const key = tx.category || 'Other'
    totals[key] = (totals[key] || 0) + (tx.amount < 0 ? Math.abs(tx.amount) : 0)
  })
  const totalExpense = Object.values(totals).reduce((s, v) => s + v, 0) || 1
  const colors = ['#4d9fff', '#00d68f', '#ff4d6a', '#ffd166', '#a78bfa']
  const breakdown = Object.keys(totals).map((k, idx) => ({
    name: k,
    value: Math.round((totals[k] / totalExpense) * 100),
    color: colors[idx % colors.length],
  }))
  return breakdown
}

// Formatters
export const formatCurrency = (value, compact = false) => {
  const num = Number(value) || 0
  // Compact formatting for large values (e.g. 1K, 1M)
  if (compact && Math.abs(num) >= 1000) {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      notation: 'compact',
      maximumFractionDigits: 1,
    }).format(num)
  }

  // Standard INR formatting (no fractional digits)
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(num)
}

export const formatChange = (value) => {
  const sign = value >= 0 ? '+' : ''
  return `${sign}${value}%`
}
