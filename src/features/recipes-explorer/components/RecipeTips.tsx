import { Lightbulb } from 'lucide-react';
import type { RecipeDetailGQL } from '../graphql/types';

interface RecipeTipsProps {
  recipe: RecipeDetailGQL;
}

export function RecipeTips({ recipe }: RecipeTipsProps) {
  if (recipe.tips.length === 0) return null;

  return (
    <div className="bg-accent-50 p-6 rounded-2xl shadow-md border border-accent-200">
      <div className="flex items-center gap-2 mb-4">
        <Lightbulb className="w-6 h-6 text-accent-600" />
        <h2 className="text-2xl font-bold text-accent-900">Tips del Chef</h2>
      </div>

      <ul className="space-y-3">
        {recipe.tips.map((tip, index) => (
          <li
            key={index}
            className="flex items-start gap-3 p-3 bg-white rounded-lg"
          >
            <div className="w-2 h-2 bg-accent-500 rounded-full flex-shrink-0 mt-2" />
            <span className="text-neutral-700">{tip}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
