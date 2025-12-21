import { useMemo } from 'react';
import type { Client } from '../types';

export function useClientsSearch(clients: Client[], searchTerm: string) {
  const filteredClients = useMemo(() => {
    if (!searchTerm.trim()) {
      return clients;
    }

    const term = searchTerm.toLowerCase();
    return clients.filter(
      (client) =>
        client.firstName.toLowerCase().includes(term) ||
        client.lastName.toLowerCase().includes(term) ||
        `${client.firstName} ${client.lastName}`.toLowerCase().includes(term)
    );
  }, [clients, searchTerm]);

  return { filteredClients };
}
