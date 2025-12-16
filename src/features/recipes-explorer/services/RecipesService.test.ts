import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { RecipesService } from './RecipesService'
import { server } from '@/test/server'
import { http, HttpResponse } from 'msw'
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
  }
]

describe('RecipesService', () => {
  let service: RecipesService

  beforeEach(() => {
    service = new RecipesService()
  })

  describe('constructor', () => {
    it('uses default baseUrl "/api" when not provided', () => {
      const defaultService = new RecipesService()
      expect(defaultService).toBeInstanceOf(RecipesService)
    })

    it('accepts custom baseUrl', () => {
      const customService = new RecipesService('/custom-api')
      expect(customService).toBeInstanceOf(RecipesService)
    })
  })

  describe('getAllRecipes', () => {
    it('returns array of RecipeSummary on success', async () => {
      server.use(
        http.get('/api/recipes', () => {
          return HttpResponse.json(mockRecipes)
        })
      )

      const result = await service.getAllRecipes()

      expect(result).toEqual(mockRecipes)
      expect(result).toHaveLength(2)
    })

    it('throws error when response is not ok', async () => {
      server.use(
        http.get('/api/recipes', () => {
          return new HttpResponse(null, {
            status: 500,
            statusText: 'Internal Server Error'
          })
        })
      )

      await expect(service.getAllRecipes()).rejects.toThrow('Failed to fetch recipes')
    })

    it('throws error on network failure', async () => {
      server.use(
        http.get('/api/recipes', () => {
          return HttpResponse.error()
        })
      )

      await expect(service.getAllRecipes()).rejects.toThrow()
    })

    it('returns empty array when API returns empty array', async () => {
      server.use(
        http.get('/api/recipes', () => {
          return HttpResponse.json([])
        })
      )

      const result = await service.getAllRecipes()

      expect(result).toEqual([])
      expect(result).toHaveLength(0)
    })

    it('uses custom baseUrl when provided', async () => {
      const customService = new RecipesService('/custom-api')

      server.use(
        http.get('/custom-api/recipes', () => {
          return HttpResponse.json(mockRecipes)
        })
      )

      const result = await customService.getAllRecipes()

      expect(result).toEqual(mockRecipes)
    })
  })

  describe('getRecipeById', () => {
    const mockRecipeDetail = {
      ...mockRecipes[0],
      description: 'A classic Italian dessert',
      prepTime: 30,
      servings: 8,
      ingredients: [{ name: 'Mascarpone', amount: '500', unit: 'g' }],
      instructions: ['Mix ingredients'],
      tips: ['Chill overnight'],
      author: 'Chef Mario'
    }

    it('returns recipe detail on success', async () => {
      server.use(
        http.get('/api/recipes/1', () => {
          return HttpResponse.json(mockRecipeDetail)
        })
      )

      const result = await service.getRecipeById('1')

      expect(result).toEqual(mockRecipeDetail)
    })

    it('throws error when recipe not found', async () => {
      server.use(
        http.get('/api/recipes/999', () => {
          return new HttpResponse(null, {
            status: 404,
            statusText: 'Not Found'
          })
        })
      )

      await expect(service.getRecipeById('999')).rejects.toThrow('Failed to fetch recipe')
    })

    it('includes recipe id in error message context', async () => {
      server.use(
        http.get('/api/recipes/test-id', () => {
          return new HttpResponse(null, {
            status: 500,
            statusText: 'Server Error'
          })
        })
      )

      await expect(service.getRecipeById('test-id')).rejects.toThrow()
    })
  })
})
