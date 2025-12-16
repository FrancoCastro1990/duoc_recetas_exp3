import { describe, it, expect } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useRecipesSearch } from './useRecipesSearch'
import type { RecipeSummary } from '../types'

const mockRecipes: RecipeSummary[] = [
  {
    id: '1',
    title: 'Tiramisú Italiano',
    difficulty: 'medium',
    category: 'dessert',
    imageUrl: '/images/tiramisu.jpg',
    cookingTime: 30
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
    title: 'Cheesecake de Fresa',
    difficulty: 'hard',
    category: 'dessert',
    imageUrl: '/images/cheesecake.jpg',
    cookingTime: 60
  }
]

describe('useRecipesSearch', () => {
  it('initializes with empty searchTerm', () => {
    const { result } = renderHook(() => useRecipesSearch(mockRecipes))

    expect(result.current.searchTerm).toBe('')
  })

  it('returns all recipes when searchTerm is empty', () => {
    const { result } = renderHook(() => useRecipesSearch(mockRecipes))

    expect(result.current.filteredRecipes).toHaveLength(3)
    expect(result.current.filteredRecipes).toEqual(mockRecipes)
  })

  it('returns all recipes when searchTerm contains only whitespace', () => {
    const { result } = renderHook(() => useRecipesSearch(mockRecipes))

    act(() => {
      result.current.setSearchTerm('   ')
    })

    expect(result.current.filteredRecipes).toHaveLength(3)
  })

  it('filters recipes by title correctly', () => {
    const { result } = renderHook(() => useRecipesSearch(mockRecipes))

    act(() => {
      result.current.setSearchTerm('Tiramisú')
    })

    expect(result.current.filteredRecipes).toHaveLength(1)
    expect(result.current.filteredRecipes[0].title).toBe('Tiramisú Italiano')
  })

  it('performs case-insensitive search', () => {
    const { result } = renderHook(() => useRecipesSearch(mockRecipes))

    // Using "italiano" (lowercase) to search for "Tiramisú Italiano"
    act(() => {
      result.current.setSearchTerm('italiano')
    })

    expect(result.current.filteredRecipes).toHaveLength(1)
    expect(result.current.filteredRecipes[0].id).toBe('1')
  })

  it('filters by partial title match', () => {
    const { result } = renderHook(() => useRecipesSearch(mockRecipes))

    act(() => {
      result.current.setSearchTerm('Pasta')
    })

    expect(result.current.filteredRecipes).toHaveLength(1)
    expect(result.current.filteredRecipes[0].title).toBe('Pasta Carbonara')
  })

  it('returns empty array when no recipes match', () => {
    const { result } = renderHook(() => useRecipesSearch(mockRecipes))

    act(() => {
      result.current.setSearchTerm('Pizza')
    })

    expect(result.current.filteredRecipes).toHaveLength(0)
  })

  it('returns all recipes when clearing searchTerm', () => {
    const { result } = renderHook(() => useRecipesSearch(mockRecipes))

    act(() => {
      result.current.setSearchTerm('Tiramisú')
    })

    expect(result.current.filteredRecipes).toHaveLength(1)

    act(() => {
      result.current.setSearchTerm('')
    })

    expect(result.current.filteredRecipes).toHaveLength(3)
  })

  it('updates filteredRecipes when recipes prop changes', () => {
    const { result, rerender } = renderHook(
      ({ recipes }) => useRecipesSearch(recipes),
      { initialProps: { recipes: mockRecipes } }
    )

    expect(result.current.filteredRecipes).toHaveLength(3)

    const newRecipes = mockRecipes.slice(0, 2)
    rerender({ recipes: newRecipes })

    expect(result.current.filteredRecipes).toHaveLength(2)
  })

  it('matches multiple recipes with common term', () => {
    const { result } = renderHook(() => useRecipesSearch(mockRecipes))

    act(() => {
      result.current.setSearchTerm('de')
    })

    // "Cheesecake de Fresa" contains "de"
    expect(result.current.filteredRecipes.length).toBeGreaterThanOrEqual(1)
  })
})
