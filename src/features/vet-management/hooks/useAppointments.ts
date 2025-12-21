import { useQuery } from '@tanstack/react-query';
import { appointmentsQueryOptions } from '../queries/options';
import type { IVetService } from '../types';

export function useAppointments(service: IVetService, date: string) {
  const { data, isLoading, error } = useQuery(appointmentsQueryOptions(service, date));

  return {
    appointments: data ?? [],
    loading: isLoading,
    error,
  };
}
