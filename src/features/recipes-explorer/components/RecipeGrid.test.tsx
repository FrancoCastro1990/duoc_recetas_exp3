import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { RecipeGrid } from './RecipeGrid'
import type { RecipeSummary } from '../types'

const mockRecipes: RecipeSummary[] = [
  {
    id: '1',
    title: 'Tiramisú Italiano',
    difficulty: 'medium',
    category: 'dessert',
    imageUrl: '/images/tiramisu.jpg',
    cookingTime: 45
  },
  {
    id: '2',
    title: 'Pasta Carbonara',
    difficulty: 'easy',
    category: 'main-course',
    imageUrl: '/images/carbonara.jpg',
    cookingTime: 25
  },
  {
    id: '3',
    title: 'Cheesecake',
    difficulty: 'hard',
    category: 'dessert',
    imageUrl: '/images/cheesecake.jpg',
    cookingTime: 60
  }
]

const renderWithRouter = (ui: React.ReactElement) => {
  return render(ui, { wrapper: BrowserRouter })
}

describe('RecipeGrid', () => {
  it('renders loading state with spinner', () => {
    renderWithRouter(<RecipeGrid recipes={[]} loading={true} />)

    expect(screen.getByText('Cargando recetas...')).toBeInTheDocument()
  })

  it('renders empty state message when no recipes', () => {
    renderWithRouter(<RecipeGrid recipes={[]} loading={false} />)

    expect(screen.getByText('No se encontraron recetas')).toBeInTheDocument()
    expect(screen.getByText('Intenta ajustar los filtros o la búsqueda')).toBeInTheDocument()
  })

  it('renders empty state by default when loading is not provided', () => {
    renderWithRouter(<RecipeGrid recipes={[]} />)

    expect(screen.getByText('No se encontraron recetas')).toBeInTheDocument()
  })

  it('renders all recipe cards when recipes are provided', () => {
    renderWithRouter(<RecipeGrid recipes={mockRecipes} loading={false} />)

    expect(screen.getByText('Tiramisú Italiano')).toBeInTheDocument()
    expect(screen.getByText('Pasta Carbonara')).toBeInTheDocument()
    expect(screen.getByText('Cheesecake')).toBeInTheDocument()
  })

  it('renders the correct number of recipe cards', () => {
    renderWithRouter(<RecipeGrid recipes={mockRecipes} loading={false} />)

    const links = screen.getAllByRole('link', { name: /ver receta/i })
    expect(links).toHaveLength(3)
  })

  it('renders each recipe with correct link', () => {
    renderWithRouter(<RecipeGrid recipes={mockRecipes} loading={false} />)

    const links = screen.getAllByRole('link', { name: /ver receta/i })
    expect(links[0]).toHaveAttribute('href', '/recipes/1')
    expect(links[1]).toHaveAttribute('href', '/recipes/2')
    expect(links[2]).toHaveAttribute('href', '/recipes/3')
  })

  it('does not show loading state when recipes are provided', () => {
    renderWithRouter(<RecipeGrid recipes={mockRecipes} loading={false} />)

    expect(screen.queryByText('Cargando recetas...')).not.toBeInTheDocument()
  })

  it('does not show empty state when recipes are provided', () => {
    renderWithRouter(<RecipeGrid recipes={mockRecipes} loading={false} />)

    expect(screen.queryByText('No se encontraron recetas')).not.toBeInTheDocument()
  })

  it('prioritizes loading state over empty state', () => {
    renderWithRouter(<RecipeGrid recipes={[]} loading={true} />)

    expect(screen.getByText('Cargando recetas...')).toBeInTheDocument()
    expect(screen.queryByText('No se encontraron recetas')).not.toBeInTheDocument()
  })

  it('renders single recipe correctly', () => {
    const singleRecipe = [mockRecipes[0]]
    renderWithRouter(<RecipeGrid recipes={singleRecipe} loading={false} />)

    expect(screen.getByText('Tiramisú Italiano')).toBeInTheDocument()
    const links = screen.getAllByRole('link', { name: /ver receta/i })
    expect(links).toHaveLength(1)
  })
})
