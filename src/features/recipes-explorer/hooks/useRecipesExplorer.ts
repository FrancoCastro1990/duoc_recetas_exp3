import { useQuery } from '@tanstack/react-query';
import { createRecipesExplorerQueryOptions } from '../queries/options';
import type { IRecipesService } from '../types';

export const useRecipesExplorer = (service: IRecipesService) => {
  const queries = createRecipesExplorerQueryOptions(service);
  const { data: recipes = [], isLoading, isError, error } = useQuery(queries.all());

  return {
    recipes,
    loading: isLoading,
    error: isError ? error : null
  };
};
