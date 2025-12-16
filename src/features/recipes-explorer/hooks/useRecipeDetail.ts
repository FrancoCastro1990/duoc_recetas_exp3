import { useQuery } from '@apollo/client/react';
import { GET_RECIPE_BY_ID } from '../graphql/queries';
import type { GetRecipeByIdResponse, GetRecipeByIdVariables } from '../graphql/types';

/**
 * Custom hook for fetching recipe details via GraphQL
 * @param id - Recipe ID to fetch
 * @returns Apollo useQuery result with recipe data, loading, and error states
 */
export function useRecipeDetail(id: string) {
  return useQuery<GetRecipeByIdResponse, GetRecipeByIdVariables>(GET_RECIPE_BY_ID, {
    variables: { id },
    skip: !id, // Don't run query if no ID provided
  });
}
