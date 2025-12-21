import type { PetSummary, Client } from '../types';
import { PetCard } from './PetCard';
import { Loader2 } from 'lucide-react';

interface PetGridProps {
  pets: PetSummary[];
  clients?: Client[];
  loading?: boolean;
}

export function PetGrid({ pets, clients, loading }: PetGridProps) {
  if (loading) {
    return (
      <div className="flex justify-center items-center py-12" data-testid="pets-loading">
        <Loader2 className="w-8 h-8 text-primary-500 animate-spin" />
      </div>
    );
  }

  if (pets.length === 0) {
    return (
      <div className="text-center py-12" data-testid="pets-empty">
        <p className="text-neutral-500">No se encontraron mascotas</p>
      </div>
    );
  }

  const getOwnerName = (ownerId: string): string | undefined => {
    if (!clients) return undefined;
    const client = clients.find((c) => c.id === ownerId);
    return client ? `${client.firstName} ${client.lastName}` : undefined;
  };

  return (
    <div
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
      data-testid="pets-grid"
    >
      {pets.map((pet) => (
        <PetCard key={pet.id} pet={pet} ownerName={getOwnerName(pet.ownerId)} />
      ))}
    </div>
  );
}
