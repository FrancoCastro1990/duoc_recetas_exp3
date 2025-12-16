import { ListOrdered } from 'lucide-react';
import type { RecipeDetailGQL } from '../graphql/types';

interface RecipeInstructionsProps {
  recipe: RecipeDetailGQL;
}

export function RecipeInstructions({ recipe }: RecipeInstructionsProps) {
  return (
    <div data-testid="recipe-instructions" className="bg-white p-6 rounded-2xl shadow-md border border-neutral-200">
      <div className="flex items-center gap-2 mb-4">
        <ListOrdered className="w-6 h-6 text-primary-600" />
        <h2 className="text-2xl font-bold text-neutral-900">Preparación</h2>
      </div>

      <ol className="space-y-4">
        {recipe.instructions.map((instruction, index) => (
          <li
            key={index}
            className="flex gap-4 p-4 bg-neutral-50 rounded-lg hover:bg-neutral-100 transition-colors duration-200"
          >
            <div className="flex-shrink-0 w-8 h-8 bg-gradient-primary text-white rounded-full flex items-center justify-center font-bold text-sm shadow-md">
              {index + 1}
            </div>
            <p className="text-neutral-700 leading-relaxed pt-1">{instruction}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}
