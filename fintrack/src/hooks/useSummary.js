import { useState, useEffect } from 'react'
import {
  fetchSummary,
  fetchChartData,
  fetchExpenseBreakdown,
} from '../services/transactionService'

export function useSummary() {
  const [summary, setSummary]     = useState(null)
  const [chartData, setChartData] = useState([])
  const [breakdown, setBreakdown] = useState([])
  const [loading, setLoading]     = useState(true)

  useEffect(() => {
    let cancelled = false

    Promise.all([fetchSummary(), fetchChartData(), fetchExpenseBreakdown()])
      .then(([sum, chart, pie]) => {
        if (!cancelled) {
          setSummary(sum)
          setChartData(chart)
          setBreakdown(pie)
          setLoading(false)
        }
      })
      .catch(() => { if (!cancelled) setLoading(false) })

    return () => { cancelled = true }
  }, [])

  return { summary, chartData, breakdown, loading }
}
