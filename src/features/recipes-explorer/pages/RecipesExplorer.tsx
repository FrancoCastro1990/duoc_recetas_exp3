import { RecipesService } from '../services/RecipesService';
import { useRecipesExplorer } from '../hooks/useRecipesExplorer';
import { useRecipesSearch } from '../hooks/useRecipesSearch';
import { useRecipesFilter } from '../hooks/useRecipesFilter';
import { SearchBar, RecipeFilters, RecipeGrid } from '../components';
import { ChefHat } from 'lucide-react';

// Create service instance OUTSIDE component (singleton)
const recipesService = new RecipesService();

export function RecipesExplorer() {
  // Data fetching hook
  const { recipes, loading, error } = useRecipesExplorer(recipesService);

  // Filter hook
  const { selectedCategory, setSelectedCategory, filteredRecipes: categoryFiltered } = useRecipesFilter(recipes);

  // Search hook (receives filtered data from previous hook)
  const { searchTerm, setSearchTerm, filteredRecipes: finalRecipes } = useRecipesSearch(categoryFiltered);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-error-50 text-error-700 px-6 py-4 rounded-xl border border-error-200">
          <p className="font-medium">Error al cargar recetas</p>
          <p className="text-sm mt-1">Por favor, intenta nuevamente más tarde.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-primary p-8 md:p-12 rounded-2xl mb-8 shadow-lg animate-fade-in">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 bg-white/20 backdrop-blur-sm rounded-xl shadow-md">
            <ChefHat className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-white">
              Explorador de Recetas
            </h1>
            <p className="text-primary-100 mt-1">
              Descubre y explora deliciosas recetas
            </p>
          </div>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl">
          <SearchBar
            value={searchTerm}
            onChange={setSearchTerm}
            placeholder="Buscar por nombre de receta..."
          />
        </div>

        {/* Stats */}
        <div className="flex flex-wrap gap-6 mt-6">
          <div className="flex items-center gap-2">
            <span className="text-primary-100">Total de recetas:</span>
            <span className="font-bold text-white">{recipes.length}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-primary-100">Recetas encontradas:</span>
            <span className="font-bold text-white">{finalRecipes.length}</span>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-neutral-900 mb-4">Filtrar por categoría</h2>
        <RecipeFilters
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />
      </div>

      {/* Recipes Grid */}
      <RecipeGrid recipes={finalRecipes} loading={loading} />
    </div>
  );
}
