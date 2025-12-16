import type { RecipeDetailGQL } from '../graphql/types';
import { getCategoryLabel, getDifficultyLabel, getDifficultyColor } from '../utils/helpers';

interface RecipeDetailHeaderProps {
  recipe: RecipeDetailGQL;
}

export function RecipeDetailHeader({ recipe }: RecipeDetailHeaderProps) {
  return (
    <div className="relative">
      {/* Hero Image */}
      <div className="relative h-64 md:h-96 overflow-hidden rounded-2xl">
        <img
          src={recipe.imageUrl}
          alt={recipe.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/80 via-neutral-900/40 to-transparent" />

        {/* Badges */}
        <div className="absolute top-6 right-6 flex gap-2">
          <div className={`px-4 py-2 rounded-full text-sm font-medium backdrop-blur-sm shadow-lg ${getDifficultyColor(recipe.difficulty)}`}>
            {getDifficultyLabel(recipe.difficulty)}
          </div>
          <div className="px-4 py-2 rounded-full text-sm font-medium backdrop-blur-sm shadow-lg bg-primary-100 text-primary-700">
            {getCategoryLabel(recipe.category)}
          </div>
        </div>

        {/* Title Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
          <h1 data-testid="recipe-title" className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2 drop-shadow-lg">
            {recipe.title}
          </h1>
        </div>
      </div>
    </div>
  );
}
