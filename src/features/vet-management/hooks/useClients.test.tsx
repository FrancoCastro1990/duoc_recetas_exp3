import { renderHook, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { ReactNode } from 'react';
import { useClients } from './useClients';
import type { Client, IVetService } from '../types';

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
];

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });
  return ({ children }: { children: ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

describe('useClients', () => {
  let mockService: IVetService;

  beforeEach(() => {
    mockService = {
      getAllClients: vi.fn(),
      getAllPets: vi.fn(),
      getAppointmentsByDate: vi.fn(),
      getAllVeterinarians: vi.fn(),
    };
  });

  it('returns loading state initially', () => {
    vi.mocked(mockService.getAllClients).mockReturnValue(new Promise(() => {}));

    const { result } = renderHook(() => useClients(mockService), {
      wrapper: createWrapper(),
    });

    expect(result.current.loading).toBe(true);
    expect(result.current.clients).toEqual([]);
    expect(result.current.error).toBeNull();
  });

  it('returns clients when fetch succeeds', async () => {
    vi.mocked(mockService.getAllClients).mockResolvedValue(mockClients);

    const { result } = renderHook(() => useClients(mockService), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.clients).toEqual(mockClients);
    expect(result.current.error).toBeNull();
  });

  it('returns empty array when no clients exist', async () => {
    vi.mocked(mockService.getAllClients).mockResolvedValue([]);

    const { result } = renderHook(() => useClients(mockService), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.clients).toEqual([]);
    expect(result.current.error).toBeNull();
  });

  it('returns error when fetch fails', async () => {
    const error = new Error('Network error');
    vi.mocked(mockService.getAllClients).mockRejectedValue(error);

    const { result } = renderHook(() => useClients(mockService), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.clients).toEqual([]);
    expect(result.current.error).toBeDefined();
  });

  it('calls service getAllClients method', async () => {
    vi.mocked(mockService.getAllClients).mockResolvedValue(mockClients);

    renderHook(() => useClients(mockService), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(mockService.getAllClients).toHaveBeenCalledTimes(1);
    });
  });
});
