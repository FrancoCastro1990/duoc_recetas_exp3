import { queryOptions } from '@tanstack/react-query';
import { vetKeys } from './keys';
import type { IVetService } from '../types';

export const clientsQueryOptions = (service: IVetService) =>
  queryOptions({
    queryKey: vetKeys.clients(),
    queryFn: () => service.getAllClients(),
    staleTime: 5 * 60 * 1000,
  });

export const petsQueryOptions = (service: IVetService) =>
  queryOptions({
    queryKey: vetKeys.pets(),
    queryFn: () => service.getAllPets(),
    staleTime: 5 * 60 * 1000,
  });

export const appointmentsQueryOptions = (service: IVetService, date: string) =>
  queryOptions({
    queryKey: vetKeys.appointmentsByDate(date),
    queryFn: () => service.getAppointmentsByDate(date),
    staleTime: 1 * 60 * 1000,
  });

export const veterinariansQueryOptions = (service: IVetService) =>
  queryOptions({
    queryKey: vetKeys.veterinarians(),
    queryFn: () => service.getAllVeterinarians(),
    staleTime: 10 * 60 * 1000,
  });
