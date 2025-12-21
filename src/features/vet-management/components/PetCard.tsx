import { Link } from 'react-router-dom';
import type { PetCardProps } from '../types';
import { getSpeciesLabel, getSpeciesEmoji, formatAge } from '../utils/helpers';

export function PetCard({ pet, ownerName }: PetCardProps) {
  return (
    <Link
      to={`/pets/${pet.id}`}
      data-testid={`pet-card-${pet.id}`}
      className="block bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg
                 transition-all duration-200 hover:-translate-y-1"
    >
      {/* Image */}
      <div className="relative h-40 overflow-hidden">
        <img
          src={pet.imageUrl}
          alt={pet.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg">
          <span className="text-lg">{getSpeciesEmoji(pet.species)}</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="text-lg font-bold text-primary-900 mb-1">{pet.name}</h3>
        <p className="text-sm text-neutral-600 mb-2">
          {getSpeciesLabel(pet.species)} - {pet.breed}
        </p>
        <div className="flex items-center justify-between text-sm">
          <span className="text-neutral-500">{formatAge(pet.age)}</span>
          {ownerName && (
            <span className="text-primary-600 font-medium">{ownerName}</span>
          )}
        </div>
      </div>
    </Link>
  );
}
