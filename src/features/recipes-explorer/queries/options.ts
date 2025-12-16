import { queryOptions } from '@tanstack/react-query';
import { recipesExplorerKeys } from './keys';
import type { IRecipesService } from '../types';

export const createRecipesExplorerQueryOptions = (service: IRecipesService) => ({
  all: () => queryOptions({
    queryKey: recipesExplorerKeys.list(),
    queryFn: () => service.getAllRecipes(),
    staleTime: 1000 * 60 * 5, // 5 minutes
  }),

  detail: (id: string) => queryOptions({
    queryKey: recipesExplorerKeys.detail(id),
    queryFn: () => service.getRecipeById(id),
    staleTime: 1000 * 60 * 5, // 5 minutes
  }),
});
