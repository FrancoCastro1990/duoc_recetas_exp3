import { Loader2 } from 'lucide-react';
import type { RecipeGridProps } from '../types';
import { RecipeCard } from './RecipeCard';

export function RecipeGrid({ recipes, loading = false }: RecipeGridProps) {
  if (loading) {
    return (
      <div data-testid="recipes-loading" className="flex flex-col items-center justify-center py-20 gap-4">
        <Loader2 className="w-10 h-10 text-primary-600 animate-spin" />
        <p className="text-neutral-600 font-medium">Cargando recetas...</p>
      </div>
    );
  }

  if (recipes.length === 0) {
    return (
      <div data-testid="recipes-empty" className="text-center py-20 bg-white rounded-2xl shadow-md border border-neutral-200">
        <div className="max-w-md mx-auto px-6">
          <p className="text-neutral-500 text-lg font-medium mb-2">No se encontraron recetas</p>
          <p className="text-neutral-400 text-sm">Intenta ajustar los filtros o la búsqueda</p>
        </div>
      </div>
    );
  }

  return (
    <div data-testid="recipes-grid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
      {recipes.map((recipe) => (
        <RecipeCard key={recipe.id} recipe={recipe} />
      ))}
    </div>
  );
}
