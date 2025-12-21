import { renderHook } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { useClientsSearch } from './useClientsSearch';
import type { Client } from '../types';

const mockClients: Client[] = [
  {
    id: 'c1',
    firstName: 'Maria',
    lastName: 'Gonzalez',
    phone: '+56 9 1234 5678',
    email: 'maria@email.com',
    address: 'Av. Providencia 1234',
  },
  {
    id: 'c2',
    firstName: 'Carlos',
    lastName: 'Rodriguez',
    phone: '+56 9 8765 4321',
    email: 'carlos@email.com',
    address: 'Calle Las Flores 567',
  },
  {
    id: 'c3',
    firstName: 'Ana',
    lastName: 'Martinez',
    phone: '+56 9 5555 1234',
    email: 'ana@email.com',
    address: 'Pasaje Los Aromos 89',
  },
];

describe('useClientsSearch', () => {
  it('returns all clients when search term is empty', () => {
    const { result } = renderHook(() => useClientsSearch(mockClients, ''));
    expect(result.current.filteredClients).toHaveLength(3);
  });

  it('returns all clients when search term is whitespace', () => {
    const { result } = renderHook(() => useClientsSearch(mockClients, '   '));
    expect(result.current.filteredClients).toHaveLength(3);
  });

  it('filters by first name', () => {
    const { result } = renderHook(() => useClientsSearch(mockClients, 'maria'));
    expect(result.current.filteredClients).toHaveLength(1);
    expect(result.current.filteredClients[0].firstName).toBe('Maria');
  });

  it('filters by last name', () => {
    const { result } = renderHook(() => useClientsSearch(mockClients, 'rodriguez'));
    expect(result.current.filteredClients).toHaveLength(1);
    expect(result.current.filteredClients[0].lastName).toBe('Rodriguez');
  });

  it('filters by full name', () => {
    const { result } = renderHook(() => useClientsSearch(mockClients, 'maria gonzalez'));
    expect(result.current.filteredClients).toHaveLength(1);
    expect(result.current.filteredClients[0].id).toBe('c1');
  });

  it('is case insensitive', () => {
    const { result } = renderHook(() => useClientsSearch(mockClients, 'MARIA'));
    expect(result.current.filteredClients).toHaveLength(1);
  });

  it('returns empty array when no matches', () => {
    const { result } = renderHook(() => useClientsSearch(mockClients, 'xyz'));
    expect(result.current.filteredClients).toHaveLength(0);
  });

  it('handles partial matches', () => {
    const { result } = renderHook(() => useClientsSearch(mockClients, 'mar'));
    expect(result.current.filteredClients).toHaveLength(2); // Maria and Martinez
  });

  it('updates when search term changes', () => {
    const { result, rerender } = renderHook(
      ({ term }) => useClientsSearch(mockClients, term),
      { initialProps: { term: '' } }
    );

    expect(result.current.filteredClients).toHaveLength(3);

    rerender({ term: 'carlos' });
    expect(result.current.filteredClients).toHaveLength(1);
  });

  it('handles empty clients array', () => {
    const { result } = renderHook(() => useClientsSearch([], 'test'));
    expect(result.current.filteredClients).toHaveLength(0);
  });
});
