import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { useRecipeDetail } from '../hooks/useRecipeDetail';
import {
  RecipeDetailHeader,
  RecipeDetailInfo,
  RecipeDescription,
  RecipeIngredients,
  RecipeInstructions,
  RecipeTips,
} from '../components';

export function RecipeDetail() {
  const { id } = useParams<{ id: string }>();
  const { data, loading, error } = useRecipeDetail(id || '');

  // Loading state
  if (loading) {
    return (
      <div data-testid="recipe-detail-loading" className="min-h-screen flex items-center justify-center p-8">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-primary-600 animate-spin mx-auto mb-4" />
          <p className="text-neutral-600">Cargando detalles de la receta...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center p-8">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 bg-error-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl">⚠️</span>
          </div>
          <h2 className="text-2xl font-bold text-neutral-900 mb-2">Error al cargar la receta</h2>
          <p className="text-neutral-600 mb-6">{error.message}</p>
          <Link
            to="/recipes"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-primary text-white rounded-xl hover:shadow-lg transition-all duration-200 font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver a Recetas
          </Link>
        </div>
      </div>
    );
  }

  // Not found state
  if (!data?.recipe) {
    return (
      <div className="min-h-screen flex items-center justify-center p-8">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 bg-warning-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl">🔍</span>
          </div>
          <h2 className="text-2xl font-bold text-neutral-900 mb-2">Receta no encontrada</h2>
          <p className="text-neutral-600 mb-6">
            La receta que buscas no existe o ha sido eliminada.
          </p>
          <Link
            to="/recipes"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-primary text-white rounded-xl hover:shadow-lg transition-all duration-200 font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver a Recetas
          </Link>
        </div>
      </div>
    );
  }

  const recipe = data.recipe;

  return (
    <div data-testid="recipe-detail-page" className="min-h-screen py-8">
      <div>
        {/* Back Button */}
        <Link
          to="/recipes"
          data-testid="back-to-recipes"
          className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 font-medium mb-6 transition-colors duration-200"
        >
          <ArrowLeft className="w-4 h-4" />
          Volver a Recetas
        </Link>

        {/* Content */}
        <div className="space-y-6">
          {/* Header with image and title */}
          <RecipeDetailHeader recipe={recipe} />

          {/* Info bar */}
          <RecipeDetailInfo recipe={recipe} />

          {/* Description */}
          <RecipeDescription recipe={recipe} />

          {/* Grid Layout for Ingredients and Instructions */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column: Ingredients */}
            <div className="lg:col-span-1">
              <RecipeIngredients recipe={recipe} />
            </div>

            {/* Right Column: Instructions */}
            <div className="lg:col-span-2">
              <RecipeInstructions recipe={recipe} />
            </div>
          </div>

          {/* Tips */}
          <RecipeTips recipe={recipe} />
        </div>
      </div>
    </div>
  );
}
