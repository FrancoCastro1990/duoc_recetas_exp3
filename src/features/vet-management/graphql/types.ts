import type { PetDetail, AppointmentDetail } from '../types';

export interface GetPetByIdResponse {
  pet: PetDetail | null;
}

export interface GetPetByIdVariables {
  id: string;
}

export interface GetAppointmentByIdResponse {
  appointment: AppointmentDetail | null;
}

export interface GetAppointmentByIdVariables {
  id: string;
}
