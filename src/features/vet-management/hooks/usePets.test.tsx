import { renderHook, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { ReactNode } from 'react';
import { usePets } from './usePets';
import type { PetSummary, IVetService } from '../types';

const mockPets: PetSummary[] = [
  {
    id: 'p1',
    name: 'Max',
    species: 'dog',
    breed: 'Golden Retriever',
    age: 3,
    imageUrl: 'https://example.com/dog.jpg',
    ownerId: 'c1',
  },
  {
    id: 'p2',
    name: 'Luna',
    species: 'cat',
    breed: 'Siames',
    age: 2,
    imageUrl: 'https://example.com/cat.jpg',
    ownerId: 'c1',
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

describe('usePets', () => {
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
    vi.mocked(mockService.getAllPets).mockReturnValue(new Promise(() => {}));

    const { result } = renderHook(() => usePets(mockService), {
      wrapper: createWrapper(),
    });

    expect(result.current.loading).toBe(true);
    expect(result.current.pets).toEqual([]);
    expect(result.current.error).toBeNull();
  });

  it('returns pets when fetch succeeds', async () => {
    vi.mocked(mockService.getAllPets).mockResolvedValue(mockPets);

    const { result } = renderHook(() => usePets(mockService), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.pets).toEqual(mockPets);
    expect(result.current.error).toBeNull();
  });

  it('returns empty array when no pets exist', async () => {
    vi.mocked(mockService.getAllPets).mockResolvedValue([]);

    const { result } = renderHook(() => usePets(mockService), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.pets).toEqual([]);
    expect(result.current.error).toBeNull();
  });

  it('returns error when fetch fails', async () => {
    const error = new Error('Network error');
    vi.mocked(mockService.getAllPets).mockRejectedValue(error);

    const { result } = renderHook(() => usePets(mockService), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.pets).toEqual([]);
    expect(result.current.error).toBeDefined();
  });

  it('calls service getAllPets method', async () => {
    vi.mocked(mockService.getAllPets).mockResolvedValue(mockPets);

    renderHook(() => usePets(mockService), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(mockService.getAllPets).toHaveBeenCalledTimes(1);
    });
  });
});
