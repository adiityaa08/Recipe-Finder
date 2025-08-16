import React, { useEffect, useMemo, useState } from 'react'
import SearchBar from './components/SearchBar.jsx'
import RecipeCard from './components/RecipeCard.jsx'
import ToggleTheme from './components/ToggleTheme.jsx'
import Loader from './components/Loader.jsx'
import { fetchBySearch, fetchCategories, fetchByCategory } from './utils/api.js'
import useLocalStorage from './hooks/useLocalStorage.js'

export default function App() {
  const [query, setQuery] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [meals, setMeals] = useState([])
  const [categories, setCategories] = useState([])
  const [activeCat, setActiveCat] = useState('All')
  const [favorites, setFavorites] = useLocalStorage('favorites', [])

  const [page, setPage] = useState(1)
  const perPage = 12

  useEffect(() => {
    (async () => {
      const cats = await fetchCategories()
      setCategories(['All', ...cats.map(c => c.strCategory)])
    })()
  }, [])

  const debouncedQuery = useDebounce(query, 400)

  useEffect(() => {
    setError('')
    setIsLoading(true)
    const run = async () => {
      try {
        let data = []
        if (activeCat !== 'All') {
          data = await fetchByCategory(activeCat)
        } else if (debouncedQuery.trim()) {
          data = await fetchBySearch(debouncedQuery.trim())
        } else {
          // Default show some category (e.g., 'Beef') as starter
          data = await fetchByCategory('Beef')
        }
        setMeals(Array.isArray(data) ? data : [])
        setPage(1)
        if (!data || data.length === 0) setError('No recipes found. Try another search or pick a category.')
      } catch (e) {
        setError('Something went wrong. Please try again.')
      } finally {
        setIsLoading(false)
      }
    }
    run()
  }, [debouncedQuery, activeCat])

  const pagedMeals = useMemo(() => {
    const start = (page - 1) * perPage
    return meals.slice(start, start + perPage)
  }, [meals, page])

  const totalPages = Math.max(1, Math.ceil(meals.length / perPage))

  const toggleFavorite = (meal) => {
    setFavorites(prev => {
      const exists = prev.find(m => m.idMeal === meal.idMeal)
      return exists ? prev.filter(m => m.idMeal !== meal.idMeal) : [...prev, meal]
    })
  }

  return (
    <div className="min-h-screen text-neutral-900 dark:text-neutral-100">
      <header className="relative overflow-hidden">
        <div className="aurora"></div>
        <div className="max-w-6xl mx-auto px-4 pt-10 pb-16 relative">
          <nav className="flex items-center justify-between">
            <div className="text-2xl font-bold tracking-tight">Stackovate <span className="text-blue-500">Recipes</span></div>
            <ToggleTheme />
          </nav>
          <h1 className="mt-8 text-4xl md:text-5xl font-extrabold leading-tight">Find your next favorite recipe</h1>
          <p className="mt-3 text-neutral-600 dark:text-neutral-300">Search by ingredient or dish name. Filter by category. Save favorites.</p>
          <div className="mt-6 glass rounded-2xl p-4 shadow-soft">
            <SearchBar value={query} onChange={setQuery} placeholder="e.g., chicken, pasta, curry..." />
            <div className="mt-4 flex gap-2 overflow-x-auto pb-1">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCat(cat)}
                  className={`px-3 py-1.5 rounded-full border text-sm transition focus-ring ${
                    activeCat === cat
                      ? 'bg-blue-600 text-white border-blue-600'
                      : 'bg-white/70 dark:bg-neutral-800/70 border-neutral-200 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 pb-24 -mt-10 relative">
        <section className="glass rounded-3xl p-6 md:p-8 shadow-soft">
          {isLoading && <Loader count={12} />}
          {!isLoading && error && (
            <div className="text-center py-10">
              <p className="text-lg">{error}</p>
            </div>
          )}
          {!isLoading && !error && (
            <>
              <div className="grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
                {pagedMeals.map(meal => (
                  <RecipeCard
                    key={meal.idMeal}
                    meal={meal}
                    isFavorite={!!favorites.find(m => m.idMeal === meal.idMeal)}
                    onToggleFavorite={() => toggleFavorite(meal)}
                  />
                ))}
              </div>

              <div className="mt-8 flex items-center justify-center gap-2">
                <button
                  disabled={page === 1}
                  onClick={() => setPage(p => Math.max(1, p - 1))}
                  className="px-4 py-2 rounded-lg border bg-white/70 dark:bg-neutral-800/70 hover:bg-neutral-100 dark:hover:bg-neutral-800 disabled:opacity-40"
                >
                  Prev
                </button>
                <span className="text-sm opacity-80">Page {page} of {totalPages}</span>
                <button
                  disabled={page === totalPages}
                  onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                  className="px-4 py-2 rounded-lg border bg-white/70 dark:bg-neutral-800/70 hover:bg-neutral-100 dark:hover:bg-neutral-800 disabled:opacity-40"
                >
                  Next
                </button>
              </div>

              <section className="mt-12">
                <h2 className="text-2xl font-semibold mb-4">Favorites</h2>
                {favorites.length === 0 ? (
                  <p className="text-neutral-600 dark:text-neutral-300">No favorites yet. Click the heart on a recipe to save it.</p>
                ) : (
                  <div className="grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
                    {favorites.map(meal => (
                      <RecipeCard
                        key={meal.idMeal}
                        meal={meal}
                        isFavorite
                        onToggleFavorite={() => toggleFavorite(meal)}
                      />
                    ))}
                  </div>
                )}
              </section>
            </>
          )}
        </section>
      </main>

      <footer className="py-10 text-center text-sm opacity-60">
        Built for Stackovate — Simple Recipe Finder
      </footer>
    </div>
  )
}

function useDebounce(value, delay=400) {
  const [debounced, setDebounced] = useState(value)
  useEffect(() => {
    const t = setTimeout(() => setDebounced(value), delay)
    return () => clearTimeout(t)
  }, [value, delay])
  return debounced
}
