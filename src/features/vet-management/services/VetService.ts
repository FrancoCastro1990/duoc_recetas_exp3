import type { Client, PetSummary, AppointmentSummary, Veterinarian, IVetService } from '../types';

export class VetService implements IVetService {
  private baseUrl: string;

  constructor(baseUrl: string = '/api') {
    this.baseUrl = baseUrl;
  }

  async getAllClients(): Promise<Client[]> {
    const response = await fetch(`${this.baseUrl}/clients`);
    if (!response.ok) {
      throw new Error('Error al obtener los clientes');
    }
    return response.json();
  }

  async getAllPets(): Promise<PetSummary[]> {
    const response = await fetch(`${this.baseUrl}/pets`);
    if (!response.ok) {
      throw new Error('Error al obtener las mascotas');
    }
    return response.json();
  }

  async getAppointmentsByDate(date: string): Promise<AppointmentSummary[]> {
    const response = await fetch(`${this.baseUrl}/appointments?date=${date}`);
    if (!response.ok) {
      throw new Error('Error al obtener las citas');
    }
    return response.json();
  }

  async getAllVeterinarians(): Promise<Veterinarian[]> {
    const response = await fetch(`${this.baseUrl}/veterinarians`);
    if (!response.ok) {
      throw new Error('Error al obtener los veterinarios');
    }
    return response.json();
  }
}

export const vetService = new VetService();
