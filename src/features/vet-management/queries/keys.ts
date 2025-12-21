export const vetKeys = {
  all: ['vet'] as const,
  clients: () => [...vetKeys.all, 'clients'] as const,
  pets: () => [...vetKeys.all, 'pets'] as const,
  petDetail: (id: string) => [...vetKeys.pets(), id] as const,
  appointments: () => [...vetKeys.all, 'appointments'] as const,
  appointmentsByDate: (date: string) => [...vetKeys.appointments(), date] as const,
  veterinarians: () => [...vetKeys.all, 'veterinarians'] as const,
};
