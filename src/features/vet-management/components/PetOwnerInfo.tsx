import { User, Phone, Mail, MapPin } from 'lucide-react';
import type { Client } from '../types';

interface PetOwnerInfoProps {
  owner: Client;
}

export function PetOwnerInfo({ owner }: PetOwnerInfoProps) {
  return (
    <div className="bg-white rounded-xl shadow-md p-6" data-testid="pet-owner-info">
      <div className="flex items-center gap-3 mb-4">
        <div className="bg-primary-100 p-2 rounded-lg">
          <User className="w-6 h-6 text-primary-600" />
        </div>
        <div>
          <h2 className="text-lg font-bold text-primary-900">Dueno</h2>
          <p className="text-neutral-600">
            {owner.firstName} {owner.lastName}
          </p>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center gap-3 text-sm">
          <Phone className="w-4 h-4 text-primary-500" />
          <span className="text-neutral-700">{owner.phone}</span>
        </div>
        <div className="flex items-center gap-3 text-sm">
          <Mail className="w-4 h-4 text-primary-500" />
          <span className="text-neutral-700">{owner.email}</span>
        </div>
        <div className="flex items-center gap-3 text-sm">
          <MapPin className="w-4 h-4 text-primary-500" />
          <span className="text-neutral-700">{owner.address}</span>
        </div>
      </div>
    </div>
  );
}
