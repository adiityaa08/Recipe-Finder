import React, { useEffect, useState } from 'react'

export default function ToggleTheme() {
  const [dark, setDark] = useState(() => {
    const saved = localStorage.getItem('theme')
    if (saved) return saved === 'dark'
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
  })

  useEffect(() => {
    const root = document.documentElement
    if (dark) {
      root.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      root.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }, [dark])

  return (
    <button
      onClick={() => setDark(v => !v)}
      className="px-3 py-1.5 rounded-full border bg-white/70 dark:bg-neutral-800/70 hover:bg-neutral-100 dark:hover:bg-neutral-800 focus-ring"
      aria-label="toggle theme"
      title="Toggle dark mode"
    >
      {dark ? '🌙' : '☀️'}
    </button>
  )
}
