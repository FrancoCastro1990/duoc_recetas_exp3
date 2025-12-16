import type { RecipeSummary, RecipeDetail, IRecipesService } from '../types';

/**
 * Recipes Service
 * Handles REST API calls for recipe data
 *
 * Note: This service returns RecipeSummary[] for listing (basic fields only).
 * For full recipe details, use GraphQL GetRecipeById query instead.
 */
export class RecipesService implements IRecipesService {
  private readonly baseUrl: string;

  constructor(baseUrl: string = '/api') {
    this.baseUrl = baseUrl;
  }

  /**
   * Get all recipes (summary data only)
   * Returns basic recipe information for listing and grid display
   */
  async getAllRecipes(): Promise<RecipeSummary[]> {
    try {
      const response = await fetch(`${this.baseUrl}/recipes`);
      if (!response.ok) {
        throw new Error(`Failed to fetch recipes: ${response.statusText}`);
      }
      return response.json();
    } catch (error) {
      console.error('Error fetching recipes:', error);
      throw error;
    }
  }

  /**
   * Get recipe by ID (full detail data)
   * @deprecated Use GraphQL GetRecipeById query instead for better performance
   */
  async getRecipeById(id: string): Promise<RecipeDetail> {
    try {
      const response = await fetch(`${this.baseUrl}/recipes/${id}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch recipe: ${response.statusText}`);
      }
      return response.json();
    } catch (error) {
      console.error(`Error fetching recipe ${id}:`, error);
      throw error;
    }
  }
}
