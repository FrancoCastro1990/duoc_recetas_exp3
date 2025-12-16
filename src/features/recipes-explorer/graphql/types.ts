import type { RecipeDifficulty, RecipeCategory, Ingredient } from '../types';

/**
 * GraphQL Recipe Detail Type
 * Represents the complete recipe data structure returned by GraphQL queries
 */
export interface RecipeDetailGQL {
  id: string;
  title: string;
  description: string;
  difficulty: RecipeDifficulty;
  category: RecipeCategory;
  imageUrl: string;
  cookingTime: number;
  prepTime: number;
  servings: number;
  ingredients: Ingredient[];
  instructions: string[];
  tips: string[];
  author: string;
}

/**
 * GraphQL Query Response for GetRecipeById
 */
export interface GetRecipeByIdResponse {
  recipe: RecipeDetailGQL | null;
}

/**
 * GraphQL Query Variables for GetRecipeById
 */
export interface GetRecipeByIdVariables {
  id: string;
}
