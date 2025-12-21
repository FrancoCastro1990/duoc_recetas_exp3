import type { Client } from '@/features/vet-management/types';

export const mockClients: Client[] = [
  {
    id: 'c1',
    firstName: 'Maria',
    lastName: 'Gonzalez',
    phone: '+56 9 1234 5678',
    email: 'maria.gonzalez@email.com',
    address: 'Av. Providencia 1234, Santiago',
  },
  {
    id: 'c2',
    firstName: 'Carlos',
    lastName: 'Rodriguez',
    phone: '+56 9 8765 4321',
    email: 'carlos.rodriguez@email.com',
    address: 'Calle Las Flores 567, Nunoa',
  },
  {
    id: 'c3',
    firstName: 'Ana',
    lastName: 'Martinez',
    phone: '+56 9 5555 1234',
    email: 'ana.martinez@email.com',
    address: 'Pasaje Los Aromos 89, La Reina',
  },
  {
    id: 'c4',
    firstName: 'Pedro',
    lastName: 'Silva',
    phone: '+56 9 7777 8888',
    email: 'pedro.silva@email.com',
    address: 'Av. Apoquindo 4500, Las Condes',
  },
  {
    id: 'c5',
    firstName: 'Laura',
    lastName: 'Fernandez',
    phone: '+56 9 3333 4444',
    email: 'laura.fernandez@email.com',
    address: 'Calle Principal 234, Vitacura',
  },
];
