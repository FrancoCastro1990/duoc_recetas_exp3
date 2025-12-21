import { http, HttpResponse } from 'msw';
import { mockClients } from '../data/clients';
import { mockPetsSummary } from '../data/pets';
import { mockAppointmentsSummary } from '../data/appointments';
import { mockVeterinarians } from '../data/veterinarians';

export const vetRestHandlers = [
  // GET /api/clients
  http.get('/api/clients', () => {
    return HttpResponse.json(mockClients);
  }),

  // GET /api/pets
  http.get('/api/pets', () => {
    return HttpResponse.json(mockPetsSummary);
  }),

  // GET /api/appointments?date=YYYY-MM-DD
  http.get('/api/appointments', ({ request }) => {
    const url = new URL(request.url);
    const date = url.searchParams.get('date');

    if (!date) {
      const today = new Date().toISOString().split('T')[0];
      const todayAppointments = mockAppointmentsSummary.filter((apt) => apt.date === today);
      return HttpResponse.json(todayAppointments);
    }

    const filteredAppointments = mockAppointmentsSummary.filter((apt) => apt.date === date);
    return HttpResponse.json(filteredAppointments);
  }),

  // GET /api/veterinarians
  http.get('/api/veterinarians', () => {
    return HttpResponse.json(mockVeterinarians);
  }),
];
