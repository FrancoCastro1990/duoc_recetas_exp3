import { graphql, HttpResponse } from 'msw';
import { mockPetsDetail } from '../data/pets';
import { mockAppointmentsDetail } from '../data/appointments';

export const vetGraphQLHandlers = [
  // Query: GetPetById
  graphql.query('GetPetById', ({ variables }) => {
    const { id } = variables as { id: string };
    const pet = mockPetsDetail.find((p) => p.id === id);

    if (!pet) {
      return HttpResponse.json({
        errors: [{ message: 'Pet not found', extensions: { code: 'NOT_FOUND' } }],
        data: null,
      });
    }

    return HttpResponse.json({
      data: { pet },
    });
  }),

  // Query: GetAppointmentById
  graphql.query('GetAppointmentById', ({ variables }) => {
    const { id } = variables as { id: string };
    const appointment = mockAppointmentsDetail.find((a) => a.id === id);

    if (!appointment) {
      return HttpResponse.json({
        errors: [{ message: 'Appointment not found', extensions: { code: 'NOT_FOUND' } }],
        data: null,
      });
    }

    return HttpResponse.json({
      data: { appointment },
    });
  }),
];
