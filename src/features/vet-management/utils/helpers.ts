import type { PetSpecies, AppointmentStatus } from '../types';

export const formatDate = (dateStr: string): string => {
  const date = new Date(dateStr + 'T00:00:00');
  return date.toLocaleDateString('es-CL', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
};

export const formatDateLong = (dateStr: string): string => {
  const date = new Date(dateStr + 'T00:00:00');
  return date.toLocaleDateString('es-CL', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
};

export const getSpeciesLabel = (species: PetSpecies): string => {
  const labels: Record<PetSpecies, string> = {
    dog: 'Perro',
    cat: 'Gato',
    bird: 'Ave',
    rabbit: 'Conejo',
    hamster: 'Hamster',
    other: 'Otro',
  };
  return labels[species];
};

export const getSpeciesEmoji = (species: PetSpecies): string => {
  const emojis: Record<PetSpecies, string> = {
    dog: '🐕',
    cat: '🐈',
    bird: '🦜',
    rabbit: '🐇',
    hamster: '🐹',
    other: '🐾',
  };
  return emojis[species];
};

export const getStatusLabel = (status: AppointmentStatus): string => {
  const labels: Record<AppointmentStatus, string> = {
    scheduled: 'Programada',
    'in-progress': 'En Curso',
    completed: 'Completada',
    cancelled: 'Cancelada',
  };
  return labels[status];
};

export const getStatusColor = (status: AppointmentStatus): string => {
  const colors: Record<AppointmentStatus, string> = {
    scheduled: 'bg-accent-100 text-accent-700',
    'in-progress': 'bg-warning-100 text-warning-700',
    completed: 'bg-success-100 text-success-700',
    cancelled: 'bg-error-100 text-error-700',
  };
  return colors[status];
};

export const formatAge = (age: number): string => {
  if (age === 1) return '1 ano';
  return `${age} anos`;
};

export const formatWeight = (weight: number): string => {
  return `${weight} kg`;
};

export const getFullName = (firstName: string, lastName: string): string => {
  return `${firstName} ${lastName}`;
};
