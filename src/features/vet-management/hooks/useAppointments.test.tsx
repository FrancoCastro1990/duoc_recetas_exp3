import { renderHook, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { ReactNode } from 'react';
import { useAppointments } from './useAppointments';
import type { AppointmentSummary, IVetService } from '../types';

const mockAppointments: AppointmentSummary[] = [
  {
    id: 'a1',
    date: '2024-12-16',
    time: '09:00',
    status: 'scheduled',
    petId: 'p1',
    petName: 'Max',
    petSpecies: 'dog',
    ownerId: 'c1',
    ownerName: 'Maria Gonzalez',
    veterinarianId: 'v1',
    veterinarianName: 'Dr. Roberto Sanchez',
    reason: 'Control rutinario',
  },
  {
    id: 'a2',
    date: '2024-12-16',
    time: '10:00',
    status: 'in-progress',
    petId: 'p2',
    petName: 'Luna',
    petSpecies: 'cat',
    ownerId: 'c1',
    ownerName: 'Maria Gonzalez',
    veterinarianId: 'v2',
    veterinarianName: 'Dra. Patricia Lopez',
    reason: 'Vacunacion',
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

describe('useAppointments', () => {
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
    vi.mocked(mockService.getAppointmentsByDate).mockReturnValue(new Promise(() => {}));

    const { result } = renderHook(() => useAppointments(mockService, '2024-12-16'), {
      wrapper: createWrapper(),
    });

    expect(result.current.loading).toBe(true);
    expect(result.current.appointments).toEqual([]);
    expect(result.current.error).toBeNull();
  });

  it('returns appointments when fetch succeeds', async () => {
    vi.mocked(mockService.getAppointmentsByDate).mockResolvedValue(mockAppointments);

    const { result } = renderHook(() => useAppointments(mockService, '2024-12-16'), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.appointments).toEqual(mockAppointments);
    expect(result.current.error).toBeNull();
  });

  it('returns empty array when no appointments for date', async () => {
    vi.mocked(mockService.getAppointmentsByDate).mockResolvedValue([]);

    const { result } = renderHook(() => useAppointments(mockService, '2024-12-20'), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.appointments).toEqual([]);
    expect(result.current.error).toBeNull();
  });

  it('returns error when fetch fails', async () => {
    const error = new Error('Network error');
    vi.mocked(mockService.getAppointmentsByDate).mockRejectedValue(error);

    const { result } = renderHook(() => useAppointments(mockService, '2024-12-16'), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.appointments).toEqual([]);
    expect(result.current.error).toBeDefined();
  });

  it('calls service getAppointmentsByDate with correct date', async () => {
    vi.mocked(mockService.getAppointmentsByDate).mockResolvedValue(mockAppointments);

    renderHook(() => useAppointments(mockService, '2024-12-16'), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(mockService.getAppointmentsByDate).toHaveBeenCalledWith('2024-12-16');
    });
  });

  it('refetches when date changes', async () => {
    vi.mocked(mockService.getAppointmentsByDate).mockResolvedValue(mockAppointments);

    const { rerender } = renderHook(
      ({ date }) => useAppointments(mockService, date),
      {
        wrapper: createWrapper(),
        initialProps: { date: '2024-12-16' },
      }
    );

    await waitFor(() => {
      expect(mockService.getAppointmentsByDate).toHaveBeenCalledWith('2024-12-16');
    });

    rerender({ date: '2024-12-17' });

    await waitFor(() => {
      expect(mockService.getAppointmentsByDate).toHaveBeenCalledWith('2024-12-17');
    });
  });
});
