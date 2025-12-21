import { Clock, User, Stethoscope } from 'lucide-react';
import type { AppointmentCardProps } from '../types';
import { getStatusLabel, getStatusColor, getSpeciesEmoji } from '../utils/helpers';

export function AppointmentCard({ appointment }: AppointmentCardProps) {
  return (
    <div
      data-testid={`appointment-card-${appointment.id}`}
      className="bg-white rounded-xl shadow-md p-4 border border-neutral-200
                 hover:shadow-lg transition-all duration-200"
    >
      {/* Header: Time and Status */}
      <div className="flex justify-between items-center mb-3">
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-primary-600" />
          <span className="font-bold text-lg text-primary-900">{appointment.time}</span>
        </div>
        <span
          className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(appointment.status)}`}
        >
          {getStatusLabel(appointment.status)}
        </span>
      </div>

      {/* Pet Info */}
      <div className="flex items-center gap-2 mb-2">
        <span className="text-lg">{getSpeciesEmoji(appointment.petSpecies)}</span>
        <span className="font-medium text-primary-800">{appointment.petName}</span>
      </div>

      {/* Owner */}
      <div className="flex items-center gap-2 mb-2 text-neutral-600">
        <User className="w-4 h-4" />
        <span className="text-sm">{appointment.ownerName}</span>
      </div>

      {/* Veterinarian */}
      <div className="flex items-center gap-2 text-neutral-600">
        <Stethoscope className="w-4 h-4" />
        <span className="text-sm">{appointment.veterinarianName}</span>
      </div>

      {/* Reason */}
      <div className="mt-3 pt-3 border-t border-neutral-100">
        <p className="text-sm text-neutral-700">{appointment.reason}</p>
      </div>
    </div>
  );
}
