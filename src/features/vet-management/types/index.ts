// ==================== ENUMS/TYPES ====================

export type PetSpecies = 'dog' | 'cat' | 'bird' | 'rabbit' | 'hamster' | 'other';

export type AppointmentStatus = 'scheduled' | 'in-progress' | 'completed' | 'cancelled';

// ==================== ENTITIES ====================

/**
 * Cliente - Dueno de mascota
 */
export interface Client {
  id: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  address: string;
}

/**
 * Mascota - Informacion basica para listados (REST)
 */
export interface PetSummary {
  id: string;
  name: string;
  species: PetSpecies;
  breed: string;
  age: number;
  imageUrl: string;
  ownerId: string;
}

/**
 * Registro medico
 */
export interface MedicalRecord {
  id: string;
  date: string;
  diagnosis: string;
  treatment: string;
  notes: string;
  veterinarianId: string;
}

/**
 * Mascota - Informacion completa con historial (GraphQL)
 */
export interface PetDetail extends PetSummary {
  weight: number;
  color: string;
  birthDate: string;
  medicalHistory: MedicalRecord[];
  owner: Client;
}

/**
 * Veterinario
 */
export interface Veterinarian {
  id: string;
  firstName: string;
  lastName: string;
  specialty: string;
  phone: string;
  imageUrl: string;
}

/**
 * Cita/Atencion - Informacion para listados (REST)
 */
export interface AppointmentSummary {
  id: string;
  date: string;
  time: string;
  status: AppointmentStatus;
  petId: string;
  petName: string;
  petSpecies: PetSpecies;
  ownerId: string;
  ownerName: string;
  veterinarianId: string;
  veterinarianName: string;
  reason: string;
}

/**
 * Cita/Atencion - Informacion completa (GraphQL)
 */
export interface AppointmentDetail extends AppointmentSummary {
  pet: PetDetail;
  owner: Client;
  veterinarian: Veterinarian;
  notes: string;
  diagnosis?: string;
  treatment?: string;
}

// ==================== SERVICE INTERFACES ====================

export interface IVetService {
  getAllClients(): Promise<Client[]>;
  getAllPets(): Promise<PetSummary[]>;
  getAppointmentsByDate(date: string): Promise<AppointmentSummary[]>;
  getAllVeterinarians(): Promise<Veterinarian[]>;
}

// ==================== COMPONENT PROPS ====================

export interface ClientCardProps {
  client: Client;
  pets: PetSummary[];
}

export interface PetCardProps {
  pet: PetSummary;
  ownerName?: string;
}

export interface AppointmentCardProps {
  appointment: AppointmentSummary;
}

export interface DateFilterProps {
  selectedDate: string;
  onDateChange: (date: string) => void;
}

export interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}
