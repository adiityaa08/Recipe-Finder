import React from 'react'

export default function SearchBar({ value, onChange, placeholder }) {
  return (
    <div className="flex items-center gap-2">
      <input
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-4 py-3 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 focus-ring"
      />
      <button
        onClick={() => onChange('')}
        className="px-3 py-2 text-sm rounded-lg border bg-white/70 dark:bg-neutral-800/70 hover:bg-neutral-100 dark:hover:bg-neutral-800"
      >
        Clear
      </button>
    </div>
  )
}
