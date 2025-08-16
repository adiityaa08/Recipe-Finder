import React from 'react'
import { Link } from 'react-router-dom'

export default function RecipeCard({ meal, isFavorite, onToggleFavorite }) {
  return (
    <div className="group rounded-2xl overflow-hidden border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 hover:-translate-y-1 hover:shadow-soft transition-transform duration-200 fade-in">
      <div className="relative">
        <img
          src={meal.strMealThumb}
          alt={meal.strMeal}
          className="h-44 w-full object-cover"
          loading="lazy"
        />
        <button
          onClick={onToggleFavorite}
          aria-label="toggle favorite"
          className={`absolute top-3 right-3 px-2.5 py-1.5 text-xs rounded-full backdrop-blur-md border ${
            isFavorite ? 'bg-rose-600 text-white border-rose-600' : 'bg-white/70 dark:bg-neutral-900/60 border-neutral-200 dark:border-neutral-700'
          }`}
        >
          {isFavorite ? '♥ Saved' : '♡ Save'}
        </button>
      </div>
      <div className="p-4">
        <h3 className="font-semibold line-clamp-2 min-h-[3rem]">{meal.strMeal}</h3>
        <div className="mt-3 flex items-center justify-between">
          <span className="text-xs opacity-60">{meal.strArea || '—'}</span>
          <Link
            to={`/meal/${meal.idMeal}`}
            className="text-sm px-3 py-1.5 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition focus-ring"
          >
            View
          </Link>
        </div>
      </div>
    </div>
  )
}
