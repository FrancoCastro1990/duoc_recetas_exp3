import type { Client, PetSummary } from '../types';
import { ClientCard } from './ClientCard';
import { Loader2 } from 'lucide-react';

interface ClientGridProps {
  clients: Client[];
  pets: PetSummary[];
  loading?: boolean;
}

export function ClientGrid({ clients, pets, loading }: ClientGridProps) {
  if (loading) {
    return (
      <div className="flex justify-center items-center py-12" data-testid="clients-loading">
        <Loader2 className="w-8 h-8 text-primary-500 animate-spin" />
      </div>
    );
  }

  if (clients.length === 0) {
    return (
      <div className="text-center py-12" data-testid="clients-empty">
        <p className="text-neutral-500">No se encontraron clientes</p>
      </div>
    );
  }

  const getPetsForClient = (clientId: string): PetSummary[] => {
    return pets.filter((pet) => pet.ownerId === clientId);
  };

  return (
    <div
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      data-testid="clients-grid"
    >
      {clients.map((client) => (
        <ClientCard
          key={client.id}
          client={client}
          pets={getPetsForClient(client.id)}
        />
      ))}
    </div>
  );
}
