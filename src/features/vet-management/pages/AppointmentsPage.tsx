import { Calendar, AlertCircle } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setSelectedDate } from '@/store/slices/uiSlice';
import { useAppointments } from '../hooks/useAppointments';
import { DateFilter, AppointmentList } from '../components';
import { vetService } from '../services/VetService';
import { formatDateLong } from '../utils/helpers';

const MAX_APPOINTMENTS_PER_DAY = 8;

export function AppointmentsPage() {
  const dispatch = useAppDispatch();
  const selectedDate = useAppSelector((state) => state.ui.selectedDate);

  const { appointments, loading, error } = useAppointments(vetService, selectedDate);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-error-50 text-error-700 px-6 py-4 rounded-xl">
          Error al cargar las citas
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-primary p-8 rounded-2xl mb-8 shadow-lg">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-white/20 backdrop-blur-sm rounded-xl">
              <Calendar className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">Citas del Dia</h1>
              <p className="text-primary-100">{formatDateLong(selectedDate)}</p>
            </div>
          </div>

          {/* Date Filter */}
          <DateFilter
            selectedDate={selectedDate}
            onDateChange={(date) => dispatch(setSelectedDate(date))}
          />
        </div>

        {/* Stats */}
        <div className="flex gap-6">
          <div className="text-white">
            <span className="text-primary-100">Citas programadas:</span>
            <span className="font-bold ml-2">{appointments.length}</span>
          </div>
          <div className="text-white">
            <span className="text-primary-100">Maximo por dia:</span>
            <span className="font-bold ml-2">{MAX_APPOINTMENTS_PER_DAY}</span>
          </div>
        </div>

        {/* Warning if at limit */}
        {appointments.length >= MAX_APPOINTMENTS_PER_DAY && (
          <div className="mt-4 flex items-center gap-2 bg-warning-100 text-warning-800 px-4 py-2 rounded-lg">
            <AlertCircle className="w-5 h-5" />
            <span>Se ha alcanzado el maximo de citas para este dia</span>
          </div>
        )}
      </div>

      {/* Appointments List */}
      <AppointmentList appointments={appointments} loading={loading} />
    </div>
  );
}
