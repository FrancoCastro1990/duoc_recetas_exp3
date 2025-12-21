import type { AppointmentSummary } from '../types';
import { AppointmentCard } from './AppointmentCard';
import { Loader2, Calendar } from 'lucide-react';

interface AppointmentListProps {
  appointments: AppointmentSummary[];
  loading?: boolean;
}

const MAX_APPOINTMENTS_PER_DAY = 8;

export function AppointmentList({ appointments, loading }: AppointmentListProps) {
  if (loading) {
    return (
      <div className="flex justify-center items-center py-12" data-testid="appointments-loading">
        <Loader2 className="w-8 h-8 text-primary-500 animate-spin" />
      </div>
    );
  }

  if (appointments.length === 0) {
    return (
      <div className="text-center py-12" data-testid="appointments-empty">
        <Calendar className="w-12 h-12 text-neutral-300 mx-auto mb-4" />
        <p className="text-neutral-500">No hay citas programadas para este dia</p>
      </div>
    );
  }

  // Sort by time
  const sortedAppointments = [...appointments].sort((a, b) =>
    a.time.localeCompare(b.time)
  );

  return (
    <div data-testid="appointments-list">
      {appointments.length >= MAX_APPOINTMENTS_PER_DAY && (
        <div
          className="mb-4 p-3 bg-warning-50 border border-warning-200 rounded-lg text-warning-700 text-sm"
          data-testid="max-appointments-warning"
        >
          Se ha alcanzado el maximo de {MAX_APPOINTMENTS_PER_DAY} citas para este dia
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {sortedAppointments.map((appointment) => (
          <AppointmentCard key={appointment.id} appointment={appointment} />
        ))}
      </div>
    </div>
  );
}
