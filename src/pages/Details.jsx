import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { fetchById } from '../utils/api.js'

export default function Details() {
  const { id } = useParams()
  const [meal, setMeal] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    (async () => {
      setLoading(true)
      const data = await fetchById(id)
      setMeal(data)
      setLoading(false)
    })()
  }, [id])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-64 h-64 skeleton rounded-2xl"></div>
      </div>
    )
  }

  if (!meal) {
    return (
      <div className="min-h-screen flex items-center justify-center text-center">
        <div>
          <p className="mb-4">Recipe not found.</p>
          <Link to="/" className="text-blue-600 hover:underline">Go back</Link>
        </div>
      </div>
    )
  }

  const ingredients = []
  for (let i = 1; i <= 20; i++) {
    const ing = meal[`strIngredient${i}`]
    const measure = meal[`strMeasure${i}`]
    if (ing && ing.trim() !== '') ingredients.push(`${ing}${measure ? ' - ' + measure : ''}`)
  }

  return (
    <div className="min-h-screen text-neutral-900 dark:text-neutral-100">
      <header className="max-w-5xl mx-auto px-4 py-6 flex items-center justify-between">
        <Link to="/" className="px-3 py-1.5 rounded-lg border hover:bg-neutral-100 dark:hover:bg-neutral-800">← Back</Link>
        <h1 className="text-xl font-semibold">{meal.strMeal}</h1>
        <div></div>
      </header>
      <main className="max-w-5xl mx-auto px-4 pb-20">
        <div className="grid md:grid-cols-2 gap-8 glass rounded-3xl p-6 shadow-soft">
          <img src={meal.strMealThumb} alt={meal.strMeal} className="w-full rounded-2xl object-cover" />
          <div>
            <p className="opacity-70 text-sm">{meal.strArea} • {meal.strCategory}</p>
            <h2 className="text-2xl font-bold mt-2 mb-4">Ingredients</h2>
            <ul className="list-disc pl-6 space-y-1">
              {ingredients.map((it, idx) => <li key={idx}>{it}</li>)}
            </ul>
            <h2 className="text-2xl font-bold mt-6 mb-2">Instructions</h2>
            <p className="whitespace-pre-wrap leading-relaxed">{meal.strInstructions}</p>
            {meal.strSource && (
              <a className="inline-block mt-4 text-blue-600 hover:underline" href={meal.strSource} target="_blank" rel="noreferrer">Source</a>
            )}
            {meal.strYoutube && (
              <a className="inline-block mt-2 text-blue-600 hover:underline" href={meal.strYoutube} target="_blank" rel="noreferrer">YouTube</a>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
