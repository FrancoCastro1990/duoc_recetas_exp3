import { useState, useMemo } from 'react';
import type { RecipeSummary, RecipeCategory } from '../types';

export const useRecipesFilter = (recipes: RecipeSummary[]) => {
  const [selectedCategory, setSelectedCategory] = useState<RecipeCategory | 'all'>('all');

  const filteredRecipes = useMemo(() => {
    if (selectedCategory === 'all') return recipes;
    return recipes.filter(recipe => recipe.category === selectedCategory);
  }, [recipes, selectedCategory]);

  return {
    selectedCategory,
    setSelectedCategory,
    filteredRecipes
  };
};
