import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { usePetDetail } from '../hooks/usePetDetail';
import { PetDetailHeader, PetOwnerInfo, PetMedicalHistory } from '../components';

export function PetDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { pet, loading, error } = usePetDetail(id ?? '');

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-12 h-12 text-primary-500 animate-spin" />
      </div>
    );
  }

  if (error || !pet) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <p className="text-neutral-500">No se encontro la mascota</p>
        <Link
          to="/clients"
          className="flex items-center gap-2 text-primary-600 hover:text-primary-700"
        >
          <ArrowLeft className="w-4 h-4" />
          Volver a clientes
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Back Button */}
      <Link
        to="/clients"
        className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 mb-6"
        data-testid="back-button"
      >
        <ArrowLeft className="w-4 h-4" />
        Volver a clientes
      </Link>

      {/* Header */}
      <PetDetailHeader pet={pet} />

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        {/* Owner Info */}
        <div className="lg:col-span-1">
          <PetOwnerInfo owner={pet.owner} />
        </div>

        {/* Medical History */}
        <div className="lg:col-span-2">
          <PetMedicalHistory records={pet.medicalHistory} />
        </div>
      </div>
    </div>
  );
}
