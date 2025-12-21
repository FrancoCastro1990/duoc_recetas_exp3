import { useQuery } from '@tanstack/react-query';
import { clientsQueryOptions } from '../queries/options';
import type { IVetService } from '../types';

export function useClients(service: IVetService) {
  const { data, isLoading, error } = useQuery(clientsQueryOptions(service));

  return {
    clients: data ?? [],
    loading: isLoading,
    error,
  };
}
