import React from 'react'

export default function Loader({ count = 8 }) {
  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="rounded-2xl overflow-hidden border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900">
          <div className="h-44 w-full skeleton"></div>
          <div className="p-4 space-y-2">
            <div className="h-4 w-3/4 skeleton rounded"></div>
            <div className="h-4 w-1/2 skeleton rounded"></div>
          </div>
        </div>
      ))}
      
    </div>
  )
}
