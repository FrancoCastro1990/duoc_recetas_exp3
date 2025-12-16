import { Clock, ChefHat } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { RecipeCardProps } from '../types';
import { formatCookingTime, getDifficultyLabel, getDifficultyColor, getCategoryLabel } from '../utils/helpers';

export function RecipeCard({ recipe }: RecipeCardProps) {
  return (
    <div data-testid={`recipe-card-${recipe.id}`} className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-200 border border-neutral-200 overflow-hidden group hover:ring-2 hover:ring-primary-200/50 hover:brightness-[1.02] animate-scale-in">
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={recipe.imageUrl}
          alt={recipe.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
        <div className={`absolute top-4 right-4 px-3 py-1.5 rounded-full text-sm font-medium backdrop-blur-sm shadow-md ${getDifficultyColor(recipe.difficulty)}`}>
          {getDifficultyLabel(recipe.difficulty)}
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs font-medium text-primary-600 bg-primary-50 px-2 py-1 rounded-full">
            {getCategoryLabel(recipe.category)}
          </span>
        </div>

        <h3 className="text-xl font-bold text-neutral-900 mb-4 line-clamp-2 group-hover:text-primary-600 transition-colors duration-200">
          {recipe.title}
        </h3>

        {/* Recipe Details */}
        <div className="space-y-2 mb-6">
          <div className="flex items-center gap-2 text-neutral-600 text-sm">
            <Clock className="w-4 h-4 text-primary-600" />
            <span>{formatCookingTime(recipe.cookingTime)}</span>
          </div>

          <div className="flex items-center gap-2 text-neutral-600 text-sm">
            <ChefHat className="w-4 h-4 text-primary-600" />
            <span>{getDifficultyLabel(recipe.difficulty)}</span>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end pt-4 border-t border-neutral-200">
          <Link
            to={`/recipes/${recipe.id}`}
            data-testid={`view-recipe-${recipe.id}`}
            className="px-4 py-2 bg-gradient-primary hover:shadow-xl hover:brightness-110 hover:ring-2 hover:ring-white/30 text-white rounded-xl transition-all duration-200 font-medium text-sm shadow-md"
          >
            Ver Receta
          </Link>
        </div>
      </div>
    </div>
  );
}
