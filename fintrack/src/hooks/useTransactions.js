import { useState, useEffect } from 'react'
import { fetchTransactions } from '../services/transactionService'

export function useTransactions(limit = null) {
  const [transactions, setTransactions] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let cancelled = false
    setLoading(true)

    fetchTransactions()
      .then((data) => {
        if (!cancelled) {
          setTransactions(limit ? data.slice(0, limit) : data)
          setLoading(false)
        }
      })
      .catch((err) => {
        if (!cancelled) {
          setError(err.message)
          setLoading(false)
        }
      })

    return () => { cancelled = true }
  }, [limit])

  return { transactions, loading, error }
}
