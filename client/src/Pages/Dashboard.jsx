import { useEffect, useState } from 'react'
import { transactionAPI } from '../services/api'

export default function Dashboard() {
  const [formData, setFormData] = useState({
    amount: '',
    type: 'expense',
    category: '',
    date: new Date().toISOString().split('T')[0]
  })
  const [message, setMessage] = useState('')
  const [transactions, setTransactions] = useState([])
  const [loading, setLoading] = useState(true)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleDelete = async (id) => {
    setMessage('')
    try {
      await transactionAPI.deleteById(id)
      setMessage('Transaction deleted successfully')
      setTransactions((prev) => prev.filter((t) => t._id !== id))
    } catch (error) {
      setMessage(error.response?.data?.message || 'Failed to delete transaction')
    }
  }

  const fetchTransactions = async () => {
    try {
      setLoading(true)
      const data = await transactionAPI.getAll()
      setTransactions(data.transactions || [])
    } catch (error) {
      setMessage(error.response?.data?.message || 'Failed to load transactions')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchTransactions()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setMessage('')

    try {
      await transactionAPI.create({
        amount: Number(formData.amount),
        type: formData.type,
        category: formData.category,
        date: formData.date
      })

      setMessage('Transaction added successfully')
      setFormData({
        amount: '',
        type: 'expense',
        category: '',
        date: new Date().toISOString().split('T')[0]
      })

      fetchTransactions()
    } catch (error) {
      setMessage(error.response?.data?.message || 'Failed to add transaction')
    }
  }

  const totalIncome = transactions
    .filter((transaction) => transaction.type === 'income')
    .reduce((sum, transaction) => sum + Number(transaction.amount), 0)

  const totalExpense = transactions
    .filter((transaction) => transaction.type === 'expense')
    .reduce((sum, transaction) => sum + Number(transaction.amount), 0)

  const balance = totalIncome - totalExpense

  return (
    <section>
      <h2>Dashboard</h2>

      <div style={{ marginBottom: '20px' }}>
        <h3>Financial Summary</h3>
        <p>Total Income: {totalIncome}</p>
        <p>Total Expense: {totalExpense}</p>
        <p>Balance: {balance}</p>
      </div>

      <p>Enter your financial transaction:</p>

      <form onSubmit={handleSubmit}>
        <input
          type='number'
          name='amount'
          placeholder='Amount'
          value={formData.amount}
          onChange={handleChange}
          required
          min='0'
          step='0.01'
        />

        <select
          name='type'
          value={formData.type}
          onChange={handleChange}
          required
        >
          <option value='income'>Income</option>
          <option value='expense'>Expense</option>
        </select>

        <input
          type='text'
          name='category'
          placeholder='Category (e.g. Salary, Food, Rent)'
          value={formData.category}
          onChange={handleChange}
          required
        />

        <input
          type='date'
          name='date'
          value={formData.date}
          onChange={handleChange}
          required
        />

        <button type='submit'>Add Transaction</button>
      </form>

      {message && <p>{message}</p>}

      <h3>Your Transactions</h3>
      {loading ? (
        <p>Loading transactions...</p>
      ) : transactions.length === 0 ? (
        <p>No transactions yet.</p>
      ) : (
        <ul>
          {transactions.map((t) => (
            <li key={t._id}>
              {t.type} | {t.category} | {t.amount} | {new Date(t.date).toLocaleDateString()}
              <button
                type='button'
                onClick={() => handleDelete(t._id)}
                style={{ marginLeft: '10px' }}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}