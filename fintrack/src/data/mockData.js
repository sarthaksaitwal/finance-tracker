// ─── Transaction Data ───────────────────────────────────────────────────────

export const TRANSACTIONS = [
  {
    id: 1,
    title: 'New Headphones',
    category: 'Shopping',
    date: 'Jan 28',
    amount: -350,
    icon: '🛍️',
    iconBg: '#ff4d6a22',
    iconColor: '#ff4d6a',
  },
  {
    id: 2,
    title: 'Dividend Payment',
    category: 'Investments',
    date: 'Jan 25',
    amount: 500,
    icon: '📈',
    iconBg: '#00d68f22',
    iconColor: '#00d68f',
  },
  {
    id: 3,
    title: 'Concert Tickets',
    category: 'Entertainment',
    date: 'Jan 22',
    amount: -200,
    icon: '🎬',
    iconBg: '#ff4d6a22',
    iconColor: '#ff4d6a',
  },
  {
    id: 4,
    title: 'Web Development Project',
    category: 'Freelance',
    date: 'Jan 20',
    amount: 1200,
    icon: '💻',
    iconBg: '#00d68f22',
    iconColor: '#00d68f',
  },
  {
    id: 5,
    title: 'Grocery Shopping',
    category: 'Food & Dining',
    date: 'Jan 18',
    amount: -150,
    icon: '🍽️',
    iconBg: '#ff4d6a22',
    iconColor: '#ff4d6a',
  },
]

// ─── Chart Data ──────────────────────────────────────────────────────────────

export const SPENDING_CHART_DATA = [
  { month: 'Aug', income: 4200, expense: 2800 },
  { month: 'Sep', income: 5100, expense: 3100 },
  { month: 'Oct', income: 4700, expense: 2600 },
  { month: 'Nov', income: 5600, expense: 3400 },
  { month: 'Dec', income: 6300, expense: 4100 },
  { month: 'Jan', income: 6700, expense: 1620 },
]

// ─── Expense Breakdown ────────────────────────────────────────────────────────

export const EXPENSE_BREAKDOWN = [
  { name: 'Bills & Utilities', value: 49.4, color: '#4d9fff' },
  { name: 'Shopping',          value: 21.6, color: '#00d68f' },
  { name: 'Entertainment',     value: 12.3, color: '#ff4d6a' },
  { name: 'Food & Dining',     value: 9.3,  color: '#ffd166' },
  { name: 'Transportation',    value: 7.4,  color: '#a78bfa' },
]

// ─── Summary Stats ────────────────────────────────────────────────────────────

export const SUMMARY_STATS = {
  income: {
    label: 'Total Income',
    value: 6700,
    change: +12.5,
    icon: '📈',
    type: 'income',
  },
  expense: {
    label: 'Total Expense',
    value: 1620,
    change: -8.2,
    type: 'expense',
    icon: '📉',
  },
  balance: {
    label: 'Balance',
    value: 5080,
    change: +15.3,
    type: 'balance',
    icon: '💳',
  },
}

// ─── Navigation Items ─────────────────────────────────────────────────────────

export const NAV_ITEMS = [
  { id: 'dashboard',    label: 'Dashboard',    icon: 'dashboard' },
  { id: 'transactions', label: 'Transactions', icon: 'transactions' },
  { id: 'analytics',   label: 'Analytics',    icon: 'analytics' },
  { id: 'settings',    label: 'Settings',     icon: 'settings' },
]
