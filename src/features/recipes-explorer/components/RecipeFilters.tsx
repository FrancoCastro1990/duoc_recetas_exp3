import type { RecipeFiltersProps, RecipeCategory } from '../types';
import { getCategoryLabel } from '../utils/helpers';

const CATEGORIES: Array<RecipeCategory | 'all'> = ['all', 'dessert', 'main-course'];

export function RecipeFilters({ selectedCategory, onCategoryChange }: RecipeFiltersProps) {
  return (
    <div className="flex flex-wrap gap-2" data-testid="recipe-filters">
      {CATEGORIES.map((category) => (
        <button
          key={category}
          onClick={() => onCategoryChange(category)}
          data-testid={`filter-${category}`}
          className={`px-4 py-2 rounded-xl font-medium transition-all duration-200 ${
            selectedCategory === category
              ? 'bg-gradient-primary text-white shadow-lg hover:shadow-xl ring-2 ring-primary-300/50 brightness-105'
              : 'bg-white text-neutral-700 border border-neutral-200 shadow-sm hover:border-primary-300 hover:bg-primary-50 hover:shadow-md hover:ring-2 hover:ring-primary-200/50 hover:brightness-[1.02]'
          }`}
        >
          <span>
            {category === 'all' ? 'Todas' : getCategoryLabel(category as RecipeCategory)}
          </span>
        </button>
      ))}
    </div>
  );
}
