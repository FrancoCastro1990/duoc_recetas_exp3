import { useState, useMemo } from 'react';
import type { RecipeSummary } from '../types';

export const useRecipesSearch = (recipes: RecipeSummary[]) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredRecipes = useMemo(() => {
    if (!searchTerm.trim()) return recipes;

    const lowerSearch = searchTerm.toLowerCase();
    return recipes.filter(recipe =>
      recipe.title.toLowerCase().includes(lowerSearch)
    );
  }, [recipes, searchTerm]);

  return { searchTerm, setSearchTerm, filteredRecipes };
};
