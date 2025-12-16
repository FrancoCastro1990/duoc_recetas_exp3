import { describe, it, expect, vi, beforeEach } from 'vitest'
import { renderHook, waitFor } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useRecipesExplorer } from './useRecipesExplorer'
import type { IRecipesService, RecipeSummary } from '../types'
import type { ReactNode } from 'react'

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
  }
]

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        gcTime: 0
      }
    }
  })

  return ({ children }: { children: ReactNode }) => (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  )
}

describe('useRecipesExplorer', () => {
  let mockService: IRecipesService

  beforeEach(() => {
    mockService = {
      getAllRecipes: vi.fn(),
      getRecipeById: vi.fn()
    }
  })

  it('returns loading true initially', () => {
    vi.mocked(mockService.getAllRecipes).mockReturnValue(new Promise(() => {}))

    const { result } = renderHook(() => useRecipesExplorer(mockService), {
      wrapper: createWrapper()
    })

    expect(result.current.loading).toBe(true)
    expect(result.current.recipes).toEqual([])
  })

  it('returns recipes when service resolves successfully', async () => {
    vi.mocked(mockService.getAllRecipes).mockResolvedValue(mockRecipes)

    const { result } = renderHook(() => useRecipesExplorer(mockService), {
      wrapper: createWrapper()
    })

    await waitFor(() => {
      expect(result.current.loading).toBe(false)
    })

    expect(result.current.recipes).toEqual(mockRecipes)
    expect(result.current.error).toBeNull()
  })

  it('returns empty array as default when data is undefined', async () => {
    vi.mocked(mockService.getAllRecipes).mockResolvedValue([])

    const { result } = renderHook(() => useRecipesExplorer(mockService), {
      wrapper: createWrapper()
    })

    await waitFor(() => {
      expect(result.current.loading).toBe(false)
    })

    expect(result.current.recipes).toEqual([])
  })

  it('returns error when service fails', async () => {
    const error = new Error('Failed to fetch')
    vi.mocked(mockService.getAllRecipes).mockRejectedValue(error)

    const { result } = renderHook(() => useRecipesExplorer(mockService), {
      wrapper: createWrapper()
    })

    await waitFor(() => {
      expect(result.current.loading).toBe(false)
    })

    expect(result.current.error).toBeTruthy()
    expect(result.current.recipes).toEqual([])
  })

  it('calls service.getAllRecipes', async () => {
    vi.mocked(mockService.getAllRecipes).mockResolvedValue(mockRecipes)

    renderHook(() => useRecipesExplorer(mockService), {
      wrapper: createWrapper()
    })

    await waitFor(() => {
      expect(mockService.getAllRecipes).toHaveBeenCalled()
    })
  })
})
