import type { RecipeDifficulty, RecipeCategory } from '../types';

export const formatCookingTime = (minutes: number): string => {
  if (minutes < 60) return `${minutes} min`;
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  if (mins === 0) return `${hours}h`;
  return `${hours}h ${mins}min`;
};

export const getDifficultyLabel = (difficulty: RecipeDifficulty): string => {
  const labels: Record<RecipeDifficulty, string> = {
    easy: 'Fácil',
    medium: 'Medio',
    hard: 'Difícil',
  };
  return labels[difficulty];
};

export const getDifficultyColor = (difficulty: RecipeDifficulty): string => {
  const colors: Record<RecipeDifficulty, string> = {
    easy: 'bg-accent-100 text-accent-700',
    medium: 'bg-warning-100 text-warning-700',
    hard: 'bg-error-100 text-error-700',
  };
  return colors[difficulty];
};

export const getCategoryLabel = (category: RecipeCategory): string => {
  const labels: Record<RecipeCategory, string> = {
    dessert: 'Postre',
    'main-course': 'Plato Principal',
  };
  return labels[category];
};

export const getCategoryColor = (category: RecipeCategory): string => {
  const colors: Record<RecipeCategory, string> = {
    dessert: 'bg-accent-100 text-accent-700',
    'main-course': 'bg-primary-100 text-primary-700',
  };
  return colors[category];
};
