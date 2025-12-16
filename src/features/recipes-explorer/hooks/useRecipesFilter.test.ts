import { describe, it, expect } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useRecipesFilter } from './useRecipesFilter'
import type { RecipeSummary } from '../types'

const mockRecipes: RecipeSummary[] = [
  {
    id: '1',
    title: 'Tiramisú',
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
    title: 'Cheesecake',
    difficulty: 'hard',
    category: 'dessert',
    imageUrl: '/images/cheesecake.jpg',
    cookingTime: 60
  }
]

describe('useRecipesFilter', () => {
  it('initializes with selectedCategory as "all"', () => {
    const { result } = renderHook(() => useRecipesFilter(mockRecipes))

    expect(result.current.selectedCategory).toBe('all')
  })

  it('returns all recipes when selectedCategory is "all"', () => {
    const { result } = renderHook(() => useRecipesFilter(mockRecipes))

    expect(result.current.filteredRecipes).toHaveLength(3)
    expect(result.current.filteredRecipes).toEqual(mockRecipes)
  })

  it('filters recipes by dessert category correctly', () => {
    const { result } = renderHook(() => useRecipesFilter(mockRecipes))

    act(() => {
      result.current.setSelectedCategory('dessert')
    })

    expect(result.current.selectedCategory).toBe('dessert')
    expect(result.current.filteredRecipes).toHaveLength(2)
    expect(result.current.filteredRecipes.every(r => r.category === 'dessert')).toBe(true)
  })

  it('filters recipes by main-course category correctly', () => {
    const { result } = renderHook(() => useRecipesFilter(mockRecipes))

    act(() => {
      result.current.setSelectedCategory('main-course')
    })

    expect(result.current.selectedCategory).toBe('main-course')
    expect(result.current.filteredRecipes).toHaveLength(1)
    expect(result.current.filteredRecipes[0].title).toBe('Pasta Carbonara')
  })

  it('returns all recipes when switching back to "all"', () => {
    const { result } = renderHook(() => useRecipesFilter(mockRecipes))

    act(() => {
      result.current.setSelectedCategory('dessert')
    })

    expect(result.current.filteredRecipes).toHaveLength(2)

    act(() => {
      result.current.setSelectedCategory('all')
    })

    expect(result.current.filteredRecipes).toHaveLength(3)
  })

  it('returns empty array when recipes is empty', () => {
    const { result } = renderHook(() => useRecipesFilter([]))

    expect(result.current.filteredRecipes).toHaveLength(0)
  })

  it('updates filteredRecipes when recipes prop changes', () => {
    const { result, rerender } = renderHook(
      ({ recipes }) => useRecipesFilter(recipes),
      { initialProps: { recipes: mockRecipes } }
    )

    expect(result.current.filteredRecipes).toHaveLength(3)

    const newRecipes = mockRecipes.slice(0, 1)
    rerender({ recipes: newRecipes })

    expect(result.current.filteredRecipes).toHaveLength(1)
  })
})
