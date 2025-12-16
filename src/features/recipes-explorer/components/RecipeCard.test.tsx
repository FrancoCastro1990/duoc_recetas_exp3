import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { RecipeCard } from './RecipeCard'
import type { RecipeSummary } from '../types'

const mockRecipe: RecipeSummary = {
  id: '1',
  title: 'Tiramisú Italiano',
  difficulty: 'medium',
  category: 'dessert',
  imageUrl: '/images/tiramisu.jpg',
  cookingTime: 45
}

const renderWithRouter = (ui: React.ReactElement) => {
  return render(ui, { wrapper: BrowserRouter })
}

describe('RecipeCard', () => {
  it('renders the recipe title', () => {
    renderWithRouter(<RecipeCard recipe={mockRecipe} />)

    expect(screen.getByText('Tiramisú Italiano')).toBeInTheDocument()
  })

  it('renders the difficulty label', () => {
    renderWithRouter(<RecipeCard recipe={mockRecipe} />)

    const difficultyLabels = screen.getAllByText('Medio')
    expect(difficultyLabels.length).toBeGreaterThanOrEqual(1)
  })

  it('renders the category label', () => {
    renderWithRouter(<RecipeCard recipe={mockRecipe} />)

    expect(screen.getByText('Postre')).toBeInTheDocument()
  })

  it('renders the formatted cooking time', () => {
    renderWithRouter(<RecipeCard recipe={mockRecipe} />)

    expect(screen.getByText('45 min')).toBeInTheDocument()
  })

  it('renders the recipe image with correct alt text', () => {
    renderWithRouter(<RecipeCard recipe={mockRecipe} />)

    const image = screen.getByAltText('Tiramisú Italiano')
    expect(image).toBeInTheDocument()
    expect(image).toHaveAttribute('src', '/images/tiramisu.jpg')
  })

  it('renders a link to the recipe detail page', () => {
    renderWithRouter(<RecipeCard recipe={mockRecipe} />)

    const link = screen.getByRole('link', { name: /ver receta/i })
    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute('href', '/recipes/1')
  })

  it('renders correctly with easy difficulty', () => {
    const easyRecipe: RecipeSummary = { ...mockRecipe, difficulty: 'easy' }
    renderWithRouter(<RecipeCard recipe={easyRecipe} />)

    const difficultyLabels = screen.getAllByText('Fácil')
    expect(difficultyLabels.length).toBeGreaterThanOrEqual(1)
  })

  it('renders correctly with hard difficulty', () => {
    const hardRecipe: RecipeSummary = { ...mockRecipe, difficulty: 'hard' }
    renderWithRouter(<RecipeCard recipe={hardRecipe} />)

    const difficultyLabels = screen.getAllByText('Difícil')
    expect(difficultyLabels.length).toBeGreaterThanOrEqual(1)
  })

  it('renders correctly with main-course category', () => {
    const mainCourseRecipe: RecipeSummary = { ...mockRecipe, category: 'main-course' }
    renderWithRouter(<RecipeCard recipe={mainCourseRecipe} />)

    expect(screen.getByText('Plato Principal')).toBeInTheDocument()
  })

  it('formats cooking time in hours correctly', () => {
    const longRecipe: RecipeSummary = { ...mockRecipe, cookingTime: 90 }
    renderWithRouter(<RecipeCard recipe={longRecipe} />)

    expect(screen.getByText('1h 30min')).toBeInTheDocument()
  })
})
