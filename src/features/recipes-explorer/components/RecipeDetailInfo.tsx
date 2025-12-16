import { Clock, Timer, Users, User } from 'lucide-react';
import type { RecipeDetailGQL } from '../graphql/types';
import { formatCookingTime } from '../utils/helpers';

interface RecipeDetailInfoProps {
  recipe: RecipeDetailGQL;
}

export function RecipeDetailInfo({ recipe }: RecipeDetailInfoProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-white p-6 rounded-2xl shadow-md border border-neutral-200">
      {/* Prep Time */}
      <div className="flex items-start gap-3">
        <div className="p-2 bg-primary-50 rounded-lg">
          <Timer className="w-5 h-5 text-primary-600" />
        </div>
        <div>
          <p className="text-xs text-neutral-500 font-medium uppercase">Preparación</p>
          <p className="text-neutral-900 font-medium">{formatCookingTime(recipe.prepTime)}</p>
        </div>
      </div>

      {/* Cooking Time */}
      <div className="flex items-start gap-3">
        <div className="p-2 bg-primary-50 rounded-lg">
          <Clock className="w-5 h-5 text-primary-600" />
        </div>
        <div>
          <p className="text-xs text-neutral-500 font-medium uppercase">Cocción</p>
          <p className="text-neutral-900 font-medium">{formatCookingTime(recipe.cookingTime)}</p>
        </div>
      </div>

      {/* Servings */}
      <div className="flex items-start gap-3">
        <div className="p-2 bg-primary-50 rounded-lg">
          <Users className="w-5 h-5 text-primary-600" />
        </div>
        <div>
          <p className="text-xs text-neutral-500 font-medium uppercase">Porciones</p>
          <p className="text-neutral-900 font-medium">{recipe.servings} personas</p>
        </div>
      </div>

      {/* Author */}
      <div className="flex items-start gap-3">
        <div className="p-2 bg-primary-50 rounded-lg">
          <User className="w-5 h-5 text-primary-600" />
        </div>
        <div>
          <p className="text-xs text-neutral-500 font-medium uppercase">Autor</p>
          <p className="text-neutral-900 font-medium text-sm">{recipe.author}</p>
        </div>
      </div>
    </div>
  );
}
