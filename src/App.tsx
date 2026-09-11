import { useState, useId } from 'react'
import './App.css'

export interface Todo {
  id: string
  text: string
  completed: boolean
}

type FilterType = 'all' | 'active' | 'completed'

function App() {
  const [todos, setTodos] = useState<Todo[]>([
    { id: '1', text: 'Découvrir GitHub Actions', completed: true },
    { id: '2', text: 'Configurer le workflow CI', completed: true },
    { id: '3', text: 'Automatiser le déploiement CD', completed: false },
  ])
  const [newTodoText, setNewTodoText] = useState('')
  const [filter, setFilter] = useState<FilterType>('all')
  const inputId = useId()

  const handleAddTodo = (e: React.FormEvent) => {
    e.preventDefault()
    const trimmed = newTodoText.trim()
    if (!trimmed) return

    const newTodo: Todo = {
      id: Date.now().toString(),
      text: trimmed,
      completed: false,
    }

    setTodos((prev) => [...prev, newTodo])
    setNewTodoText('')
  }

  const toggleTodo = (id: string) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    )
  }

  const deleteTodo = (id: string) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id))
  }

  const filteredTodos = todos.filter((todo) => {
    if (filter === 'active') return !todo.completed
    if (filter === 'completed') return todo.completed
    return true
  })

  const remainingCount = todos.filter((todo) => !todo.completed).length

  return (
    <div className="todo-container">
      <header className="todo-header">
        <h1>Todo List CI/CD</h1>
        <p className="subtitle">Application de démonstration GitHub Actions</p>
      </header>

      <form onSubmit={handleAddTodo} className="todo-form">
        <label htmlFor={inputId} className="visually-hidden">
          Nouvelle tâche
        </label>
        <input
          id={inputId}
          type="text"
          placeholder="Ajouter une tâche..."
          value={newTodoText}
          onChange={(e) => setNewTodoText(e.target.value)}
          className="todo-input"
        />
        <button type="submit" className="todo-button add-btn">
          Ajouter
        </button>
      </form>

      <div className="filters">
        <button
          type="button"
          className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
          onClick={() => setFilter('all')}
        >
          Toutes ({todos.length})
        </button>
        <button
          type="button"
          className={`filter-btn ${filter === 'active' ? 'active' : ''}`}
          onClick={() => setFilter('active')}
        >
          En cours ({remainingCount})
        </button>
        <button
          type="button"
          className={`filter-btn ${filter === 'completed' ? 'active' : ''}`}
          onClick={() => setFilter('completed')}
        >
          Terminées ({todos.length - remainingCount})
        </button>
      </div>

      <ul className="todo-list" aria-label="Liste des tâches">
        {filteredTodos.length === 0 ? (
          <li className="empty-state">Aucune tâche trouvée</li>
        ) : (
          filteredTodos.map((todo) => (
            <li key={todo.id} className={`todo-item ${todo.completed ? 'completed' : ''}`}>
              <label className="checkbox-container">
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => toggleTodo(todo.id)}
                  aria-label={`Marquer ${todo.text} comme ${todo.completed ? 'en cours' : 'terminée'}`}
                />
                <span className="todo-text">{todo.text}</span>
              </label>
              <button
                type="button"
                className="delete-btn"
                onClick={() => deleteTodo(todo.id)}
                aria-label={`Supprimer ${todo.text}`}
              >
                ✕
              </button>
            </li>
          ))
        )}
      </ul>

      <footer className="todo-footer">
        <span>{remainingCount} tâche{remainingCount > 1 ? 's' : ''} restante{remainingCount > 1 ? 's' : ''}</span>
      </footer>
    </div>
  )
}

export default App
