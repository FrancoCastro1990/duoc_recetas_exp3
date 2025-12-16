import type { RecipeDetailGQL } from '../graphql/types';

interface RecipeDescriptionProps {
  recipe: RecipeDetailGQL;
}

export function RecipeDescription({ recipe }: RecipeDescriptionProps) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-md border border-neutral-200">
      <h2 className="text-2xl font-bold text-neutral-900 mb-4">Descripción</h2>
      <p className="text-neutral-700 leading-relaxed whitespace-pre-line">{recipe.description}</p>
    </div>
  );
}
