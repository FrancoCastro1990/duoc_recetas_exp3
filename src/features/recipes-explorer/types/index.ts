// Recipe difficulty type
export type RecipeDifficulty = 'easy' | 'medium' | 'hard';

// Recipe category type
export type RecipeCategory = 'dessert' | 'main-course';

// Ingredient type
export interface Ingredient {
  name: string;
  amount: string;
  unit: string;
}

/**
 * Recipe Summary (REST API)
 * Basic recipe information for listing and grid display
 * Returned by GET /api/recipes
 */
export interface RecipeSummary {
  id: string;
  title: string;
  difficulty: RecipeDifficulty;
  category: RecipeCategory;
  imageUrl: string;
  cookingTime: number; // in minutes
}

/**
 * Recipe Detail (GraphQL API)
 * Complete recipe information including ingredients and instructions
 * Returned by GraphQL GetRecipeById query
 */
export interface RecipeDetail {
  id: string;
  title: string;
  description: string;
  difficulty: RecipeDifficulty;
  category: RecipeCategory;
  imageUrl: string;
  cookingTime: number; // in minutes
  prepTime: number; // in minutes
  servings: number;
  ingredients: Ingredient[];
  instructions: string[];
  tips: string[];
  author: string;
}

// Service interface
export interface IRecipesService {
  getAllRecipes(): Promise<RecipeSummary[]>;
  getRecipeById(id: string): Promise<RecipeDetail>;
}

// Component props interfaces
export interface RecipeCardProps {
  recipe: RecipeSummary;
}

export interface RecipeGridProps {
  recipes: RecipeSummary[];
  loading?: boolean;
}

export interface RecipeFiltersProps {
  selectedCategory: RecipeCategory | 'all';
  onCategoryChange: (category: RecipeCategory | 'all') => void;
}

export interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}
