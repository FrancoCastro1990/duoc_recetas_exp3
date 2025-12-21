import { Users } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setClientSearchTerm } from '@/store/slices/uiSlice';
import { useClients } from '../hooks/useClients';
import { usePets } from '../hooks/usePets';
import { useClientsSearch } from '../hooks/useClientsSearch';
import { SearchBar, ClientGrid, PetGrid } from '../components';
import { vetService } from '../services/VetService';

export function ClientsPetsPage() {
  const dispatch = useAppDispatch();
  const searchTerm = useAppSelector((state) => state.ui.clientSearchTerm);

  const { clients, loading: clientsLoading } = useClients(vetService);
  const { pets, loading: petsLoading } = usePets(vetService);
  const { filteredClients } = useClientsSearch(clients, searchTerm);

  const loading = clientsLoading || petsLoading;

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-primary p-8 rounded-2xl mb-8 shadow-lg">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 bg-white/20 backdrop-blur-sm rounded-xl">
            <Users className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white">Clientes y Mascotas</h1>
            <p className="text-primary-100">
              Gestiona la informacion de tus clientes y sus mascotas
            </p>
          </div>
        </div>

        {/* Search */}
        <div className="max-w-md">
          <SearchBar
            value={searchTerm}
            onChange={(value) => dispatch(setClientSearchTerm(value))}
            placeholder="Buscar cliente por nombre..."
          />
        </div>

        {/* Stats */}
        <div className="flex gap-6 mt-6">
          <div className="text-white">
            <span className="text-primary-100">Total clientes:</span>
            <span className="font-bold ml-2">{clients.length}</span>
          </div>
          <div className="text-white">
            <span className="text-primary-100">Total mascotas:</span>
            <span className="font-bold ml-2">{pets.length}</span>
          </div>
        </div>
      </div>

      {/* Clients Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-primary-900 mb-6">
          Clientes {searchTerm && `(${filteredClients.length} encontrados)`}
        </h2>
        <ClientGrid clients={filteredClients} pets={pets} loading={loading} />
      </section>

      {/* Pets Section */}
      <section>
        <h2 className="text-2xl font-bold text-primary-900 mb-6">
          Todas las Mascotas
        </h2>
        <PetGrid pets={pets} clients={clients} loading={petsLoading} />
      </section>
    </div>
  );
}
