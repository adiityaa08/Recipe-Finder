# 🍽️ Recipe Finder App

A simple recipe search application built with **React + Vite**, styled with **TailwindCSS**, and powered by the [TheMealDB API](https://www.themealdb.com/api.php).  
You can search for recipes, browse categories, and view detailed instructions for each meal.

---

## 🚀 Features

- 🔍 **Search recipes** by name  
- 📂 **Browse recipes by category**  
- 🍲 **View detailed recipe info** (ingredients, instructions, and images)  
- 🎨 **Dark/Light mode toggle**  
- ⚡ **Fast build** with Vite  
- 🔑 **Environment variables** for API handling  

---

## 🛠️ Tech Stack

- **Frontend:** React + Vite  
- **Styling:** TailwindCSS  
- **State Management:** React Hooks  
- **API:** [TheMealDB](https://www.themealdb.com/api.php)  
- **HTTP Client:** Axios  

---

## 📂 Project Structure
```
project/
├── node_modules/
├── public/
├── src/
│ ├── components/ # Reusable UI components (RecipeCard, SearchBar, etc.)
│ ├── pages/ # Page components (Details page, Home, etc.)
│ ├── hooks/ # Custom React hooks
│ ├── utils/ # API functions (axios)
│ ├── App.jsx # Root app
│ ├── main.jsx # React entry
│ └── index.css # Global styles
├── .env # API Base URL (ignored in Git)
├── .gitignore # Ignored files (node_modules, build, etc.)
├── package.json
├── vite.config.js
└── README.md
```

1. **Clone the repo**
   ```bash
   git clone https://github.com/your-username/recipe-finder.git
   cd recipe-finder
2. Install dependencies
   ```bash
   npm install
3.Run the project
   ```bash
  npm run dev

