import { ShoppingBasket } from 'lucide-react';
import type { RecipeDetailGQL } from '../graphql/types';

interface RecipeIngredientsProps {
  recipe: RecipeDetailGQL;
}

export function RecipeIngredients({ recipe }: RecipeIngredientsProps) {
  return (
    <div data-testid="recipe-ingredients" className="bg-white p-6 rounded-2xl shadow-md border border-neutral-200">
      <div className="flex items-center gap-2 mb-4">
        <ShoppingBasket className="w-6 h-6 text-primary-600" />
        <h2 className="text-2xl font-bold text-neutral-900">Ingredientes</h2>
      </div>

      <ul className="space-y-3">
        {recipe.ingredients.map((ingredient, index) => (
          <li
            key={index}
            className="flex items-center gap-3 p-3 bg-primary-50 rounded-lg hover:bg-primary-100 transition-colors duration-200"
          >
            <div className="w-2 h-2 bg-primary-500 rounded-full flex-shrink-0" />
            <span className="text-neutral-700">
              <span className="font-semibold text-primary-700">
                {ingredient.amount} {ingredient.unit}
              </span>
              {' '}{ingredient.name}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
