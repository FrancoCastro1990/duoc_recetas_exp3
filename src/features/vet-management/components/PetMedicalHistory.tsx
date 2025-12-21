import { FileText, Calendar } from 'lucide-react';
import type { MedicalRecord } from '../types';
import { formatDate } from '../utils/helpers';

interface PetMedicalHistoryProps {
  records: MedicalRecord[];
}

export function PetMedicalHistory({ records }: PetMedicalHistoryProps) {
  return (
    <div className="bg-white rounded-xl shadow-md p-6" data-testid="pet-medical-history">
      <div className="flex items-center gap-3 mb-4">
        <div className="bg-accent-100 p-2 rounded-lg">
          <FileText className="w-6 h-6 text-accent-600" />
        </div>
        <h2 className="text-lg font-bold text-primary-900">Historial Medico</h2>
      </div>

      {records.length === 0 ? (
        <p className="text-neutral-500 text-center py-4">
          No hay registros medicos
        </p>
      ) : (
        <div className="space-y-4">
          {records.map((record) => (
            <div
              key={record.id}
              className="border-l-4 border-primary-400 pl-4 py-2"
              data-testid={`medical-record-${record.id}`}
            >
              <div className="flex items-center gap-2 text-sm text-neutral-500 mb-1">
                <Calendar className="w-4 h-4" />
                <span>{formatDate(record.date)}</span>
              </div>
              <h3 className="font-medium text-primary-800">{record.diagnosis}</h3>
              <p className="text-sm text-neutral-600 mt-1">
                <strong>Tratamiento:</strong> {record.treatment}
              </p>
              {record.notes && (
                <p className="text-sm text-neutral-500 mt-1 italic">
                  {record.notes}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
