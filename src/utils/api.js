import axios from 'axios'

const BASE = import.meta.env.VITE_API_BASE;

export async function fetchBySearch(q) {
  const { data } = await axios.get(`${BASE}/search.php?s=${encodeURIComponent(q)}`)
  return data.meals || []
}

export async function fetchCategories() {
  const { data } = await axios.get(`${BASE}/list.php?c=list`)
  return data.meals || []
}

export async function fetchByCategory(cat) {
  const { data } = await axios.get(`${BASE}/filter.php?c=${encodeURIComponent(cat)}`)
  return data.meals || []
}

export async function fetchById(id) {
  const { data } = await axios.get(`${BASE}/lookup.php?i=${encodeURIComponent(id)}`)
  return data.meals ? data.meals[0] : null
}
