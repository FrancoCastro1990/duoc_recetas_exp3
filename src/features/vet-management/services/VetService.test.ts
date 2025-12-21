import { describe, it, expect, beforeEach } from 'vitest';
import { http, HttpResponse } from 'msw';
import { server } from '@/test/server';
import { VetService } from './VetService';

const mockClients = [
  {
    id: 'c1',
    firstName: 'Maria',
    lastName: 'Gonzalez',
    phone: '+56 9 1234 5678',
    email: 'maria@email.com',
    address: 'Av. Providencia 1234',
  },
];

const mockPets = [
  {
    id: 'p1',
    name: 'Max',
    species: 'dog',
    breed: 'Golden Retriever',
    age: 3,
    imageUrl: 'https://example.com/dog.jpg',
    ownerId: 'c1',
  },
];

const mockAppointments = [
  {
    id: 'a1',
    date: '2024-12-16',
    time: '09:00',
    status: 'scheduled',
    petId: 'p1',
    petName: 'Max',
    petSpecies: 'dog',
    ownerId: 'c1',
    ownerName: 'Maria Gonzalez',
    veterinarianId: 'v1',
    veterinarianName: 'Dr. Test',
    reason: 'Control',
  },
];

const mockVeterinarians = [
  {
    id: 'v1',
    firstName: 'Roberto',
    lastName: 'Sanchez',
    specialty: 'Medicina General',
    phone: '+56 9 1111 2222',
    imageUrl: 'https://example.com/vet.jpg',
  },
];

describe('VetService', () => {
  let service: VetService;

  beforeEach(() => {
    service = new VetService();
  });

  describe('constructor', () => {
    it('uses default baseUrl', () => {
      const defaultService = new VetService();
      expect(defaultService).toBeDefined();
    });

    it('accepts custom baseUrl', () => {
      const customService = new VetService('/custom-api');
      expect(customService).toBeDefined();
    });
  });

  describe('getAllClients', () => {
    it('fetches clients successfully', async () => {
      server.use(
        http.get('/api/clients', () => HttpResponse.json(mockClients))
      );

      const clients = await service.getAllClients();
      expect(clients).toEqual(mockClients);
    });

    it('throws error on server error', async () => {
      server.use(
        http.get('/api/clients', () => new HttpResponse(null, { status: 500 }))
      );

      await expect(service.getAllClients()).rejects.toThrow('Error al obtener los clientes');
    });
  });

  describe('getAllPets', () => {
    it('fetches pets successfully', async () => {
      server.use(
        http.get('/api/pets', () => HttpResponse.json(mockPets))
      );

      const pets = await service.getAllPets();
      expect(pets).toEqual(mockPets);
    });

    it('throws error on server error', async () => {
      server.use(
        http.get('/api/pets', () => new HttpResponse(null, { status: 500 }))
      );

      await expect(service.getAllPets()).rejects.toThrow('Error al obtener las mascotas');
    });
  });

  describe('getAppointmentsByDate', () => {
    it('fetches appointments by date successfully', async () => {
      server.use(
        http.get('/api/appointments', ({ request }) => {
          const url = new URL(request.url);
          const date = url.searchParams.get('date');
          if (date === '2024-12-16') {
            return HttpResponse.json(mockAppointments);
          }
          return HttpResponse.json([]);
        })
      );

      const appointments = await service.getAppointmentsByDate('2024-12-16');
      expect(appointments).toEqual(mockAppointments);
    });

    it('returns empty array for date with no appointments', async () => {
      server.use(
        http.get('/api/appointments', () => HttpResponse.json([]))
      );

      const appointments = await service.getAppointmentsByDate('2024-12-20');
      expect(appointments).toEqual([]);
    });

    it('throws error on server error', async () => {
      server.use(
        http.get('/api/appointments', () => new HttpResponse(null, { status: 500 }))
      );

      await expect(service.getAppointmentsByDate('2024-12-16')).rejects.toThrow('Error al obtener las citas');
    });
  });

  describe('getAllVeterinarians', () => {
    it('fetches veterinarians successfully', async () => {
      server.use(
        http.get('/api/veterinarians', () => HttpResponse.json(mockVeterinarians))
      );

      const vets = await service.getAllVeterinarians();
      expect(vets).toEqual(mockVeterinarians);
    });

    it('throws error on server error', async () => {
      server.use(
        http.get('/api/veterinarians', () => new HttpResponse(null, { status: 500 }))
      );

      await expect(service.getAllVeterinarians()).rejects.toThrow('Error al obtener los veterinarios');
    });
  });
});
