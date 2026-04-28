import { useState, useEffect } from 'react'

export function useDarkMode() {
  const [dark, setDark] = useState(true) // default dark

  useEffect(() => {
    const root = document.documentElement
    if (dark) {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }
  }, [dark])

  const toggle = () => setDark((d) => !d)

  return { dark, toggle }
}
