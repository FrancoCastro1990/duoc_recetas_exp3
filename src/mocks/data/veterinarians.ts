import type { Veterinarian } from '@/features/vet-management/types';

export const mockVeterinarians: Veterinarian[] = [
  {
    id: 'v1',
    firstName: 'Roberto',
    lastName: 'Sanchez',
    specialty: 'Medicina General',
    phone: '+56 9 1111 2222',
    imageUrl: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=200&h=200&fit=crop',
  },
  {
    id: 'v2',
    firstName: 'Patricia',
    lastName: 'Lopez',
    specialty: 'Cirugia',
    phone: '+56 9 3333 4444',
    imageUrl: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=200&h=200&fit=crop',
  },
  {
    id: 'v3',
    firstName: 'Miguel',
    lastName: 'Torres',
    specialty: 'Dermatologia',
    phone: '+56 9 5555 6666',
    imageUrl: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=200&h=200&fit=crop',
  },
];
