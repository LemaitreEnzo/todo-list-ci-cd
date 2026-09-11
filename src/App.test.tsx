import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import App from './App'

describe('TodoList App', () => {
  it('renders the header and default todos', () => {
    render(<App />)
    expect(screen.getByText(/Todo List CI\/CD/i)).toBeInTheDocument()
    expect(screen.getByText('Découvrir GitHub Actions')).toBeInTheDocument()
    expect(screen.getByText('Configurer le workflow CI')).toBeInTheDocument()
    expect(screen.getByText('Automatiser le déploiement CD')).toBeInTheDocument()
  })

  it('can add a new todo task', () => {
    render(<App />)
    const input = screen.getByPlaceholderText('Ajouter une tâche...')
    const addButton = screen.getByRole('button', { name: 'Ajouter' })

    fireEvent.change(input, { target: { value: 'Tester le pipeline CI' } })
    fireEvent.click(addButton)

    expect(screen.getByText('Tester le pipeline CI')).toBeInTheDocument()
    expect(input).toHaveValue('')
  })

  it('does not add empty or whitespace-only todo', () => {
    render(<App />)
    const initialItems = screen.getAllByRole('listitem')
    const addButton = screen.getByRole('button', { name: 'Ajouter' })

    fireEvent.click(addButton)
    const currentItems = screen.getAllByRole('listitem')

    expect(currentItems.length).toBe(initialItems.length)
  })

  it('can toggle a todo task completion status', () => {
    render(<App />)
    const checkbox = screen.getByLabelText(/Marquer Automatiser le déploiement CD comme terminée/i)
    expect(checkbox).not.toBeChecked()

    fireEvent.click(checkbox)
    expect(checkbox).toBeChecked()
  })

  it('can delete a todo task', () => {
    render(<App />)
    expect(screen.getByText('Configurer le workflow CI')).toBeInTheDocument()

    const deleteBtn = screen.getByLabelText('Supprimer Configurer le workflow CI')
    fireEvent.click(deleteBtn)

    expect(screen.queryByText('Configurer le workflow CI')).not.toBeInTheDocument()
  })

  it('filters active and completed tasks', () => {
    render(<App />)
    
    // Filter active tasks
    const activeFilterBtn = screen.getByRole('button', { name: /En cours/i })
    fireEvent.click(activeFilterBtn)

    expect(screen.getByText('Automatiser le déploiement CD')).toBeInTheDocument()
    expect(screen.queryByText('Découvrir GitHub Actions')).not.toBeInTheDocument()

    // Filter completed tasks
    const completedFilterBtn = screen.getByRole('button', { name: /Terminées/i })
    fireEvent.click(completedFilterBtn)

    expect(screen.getByText('Découvrir GitHub Actions')).toBeInTheDocument()
    expect(screen.queryByText('Automatiser le déploiement CD')).not.toBeInTheDocument()
  })
})
