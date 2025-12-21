import { useQuery } from '@tanstack/react-query';
import { petsQueryOptions } from '../queries/options';
import type { IVetService } from '../types';

export function usePets(service: IVetService) {
  const { data, isLoading, error } = useQuery(petsQueryOptions(service));

  return {
    pets: data ?? [],
    loading: isLoading,
    error,
  };
}
