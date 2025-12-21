import type { PetDetail } from '../types';
import { getSpeciesLabel, getSpeciesEmoji, formatAge, formatWeight } from '../utils/helpers';

interface PetDetailHeaderProps {
  pet: PetDetail;
}

export function PetDetailHeader({ pet }: PetDetailHeaderProps) {
  return (
    <div className="relative rounded-2xl overflow-hidden shadow-lg" data-testid="pet-detail-header">
      {/* Background Image */}
      <div className="h-64 md:h-80">
        <img
          src={pet.imageUrl}
          alt={pet.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
      </div>

      {/* Content Overlay */}
      <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-4xl">{getSpeciesEmoji(pet.species)}</span>
          <h1 className="text-3xl md:text-4xl font-bold">{pet.name}</h1>
        </div>
        <p className="text-lg text-white/90 mb-3">
          {getSpeciesLabel(pet.species)} - {pet.breed}
        </p>
        <div className="flex flex-wrap gap-3">
          <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm">
            {formatAge(pet.age)}
          </span>
          <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm">
            {formatWeight(pet.weight)}
          </span>
          <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm">
            {pet.color}
          </span>
        </div>
      </div>
    </div>
  );
}
