import { Phone, Mail, MapPin } from 'lucide-react';
import type { ClientCardProps } from '../types';
import { getSpeciesEmoji } from '../utils/helpers';

export function ClientCard({ client, pets }: ClientCardProps) {
  return (
    <div
      data-testid={`client-card-${client.id}`}
      className="bg-white rounded-xl shadow-md p-5 hover:shadow-lg transition-all duration-200"
    >
      {/* Client Info */}
      <div className="mb-4">
        <h3 className="text-lg font-bold text-primary-900">
          {client.firstName} {client.lastName}
        </h3>
        <div className="mt-2 space-y-1">
          <div className="flex items-center gap-2 text-sm text-neutral-600">
            <Phone className="w-4 h-4 text-primary-500" />
            <span>{client.phone}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-neutral-600">
            <Mail className="w-4 h-4 text-primary-500" />
            <span>{client.email}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-neutral-600">
            <MapPin className="w-4 h-4 text-primary-500" />
            <span>{client.address}</span>
          </div>
        </div>
      </div>

      {/* Pets */}
      {pets.length > 0 && (
        <div className="border-t border-neutral-100 pt-4">
          <p className="text-sm font-medium text-neutral-700 mb-2">
            Mascotas ({pets.length})
          </p>
          <div className="flex flex-wrap gap-2">
            {pets.map((pet) => (
              <span
                key={pet.id}
                className="inline-flex items-center gap-1 bg-primary-50 text-primary-700
                           px-3 py-1 rounded-full text-sm"
              >
                <span>{getSpeciesEmoji(pet.species)}</span>
                <span>{pet.name}</span>
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
