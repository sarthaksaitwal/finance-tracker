import { TRANSACTIONS, SUMMARY_STATS, SPENDING_CHART_DATA, EXPENSE_BREAKDOWN } from '../data/mockData'

// Simulated async fetch — swap these for real API calls
export const fetchTransactions = () =>
  new Promise((resolve) => setTimeout(() => resolve([...TRANSACTIONS]), 600))

export const fetchSummary = () =>
  new Promise((resolve) => setTimeout(() => resolve({ ...SUMMARY_STATS }), 400))

export const fetchChartData = () =>
  new Promise((resolve) => setTimeout(() => resolve([...SPENDING_CHART_DATA]), 500))

export const fetchExpenseBreakdown = () =>
  new Promise((resolve) => setTimeout(() => resolve([...EXPENSE_BREAKDOWN]), 500))

// Formatters
export const formatCurrency = (value, compact = false) => {
  if (compact && Math.abs(value) >= 1000) {
    return `$${(value / 1000).toFixed(1)}k`
  }
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value)
}

export const formatChange = (value) => {
  const sign = value >= 0 ? '+' : ''
  return `${sign}${value}%`
}
