import { renderHook, waitFor } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { MockedProvider } from '@apollo/client/testing/react';
import type { MockedResponse } from '@apollo/client/testing';
import type { ReactNode } from 'react';
import { usePetDetail } from './usePetDetail';
import { GET_PET_BY_ID } from '../graphql/queries';
import type { PetDetail } from '../types';

const mockPetDetail: PetDetail = {
  id: 'p1',
  name: 'Max',
  species: 'dog',
  breed: 'Golden Retriever',
  age: 3,
  weight: 32,
  color: 'Dorado',
  birthDate: '2021-05-15',
  imageUrl: 'https://example.com/dog.jpg',
  ownerId: 'c1',
  owner: {
    id: 'c1',
    firstName: 'Maria',
    lastName: 'Gonzalez',
    phone: '+56 9 1234 5678',
    email: 'maria@email.com',
    address: 'Av. Providencia 1234',
  },
  medicalHistory: [
    {
      id: 'mr1',
      date: '2024-10-15',
      diagnosis: 'Dermatitis alergica',
      treatment: 'Antihistaminicos y bano medicado',
      notes: 'Controlar en 2 semanas',
      veterinarianId: 'v1',
    },
  ],
};

const createWrapper = (mocks: MockedResponse[]) => {
  return ({ children }: { children: ReactNode }) => (
    <MockedProvider mocks={mocks} addTypename={false}>
      {children}
    </MockedProvider>
  );
};

describe('usePetDetail', () => {
  it('returns loading state initially', () => {
    const mocks: MockedResponse[] = [
      {
        request: {
          query: GET_PET_BY_ID,
          variables: { id: 'p1' },
        },
        result: {
          data: { pet: mockPetDetail },
        },
      },
    ];

    const { result } = renderHook(() => usePetDetail('p1'), {
      wrapper: createWrapper(mocks),
    });

    expect(result.current.loading).toBe(true);
    expect(result.current.pet).toBeNull();
  });

  it('returns pet detail when query succeeds', async () => {
    const mocks: MockedResponse[] = [
      {
        request: {
          query: GET_PET_BY_ID,
          variables: { id: 'p1' },
        },
        result: {
          data: { pet: mockPetDetail },
        },
      },
    ];

    const { result } = renderHook(() => usePetDetail('p1'), {
      wrapper: createWrapper(mocks),
    });

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.pet).toEqual(mockPetDetail);
    expect(result.current.error).toBeUndefined();
  });

  it('returns null when pet not found', async () => {
    const mocks: MockedResponse[] = [
      {
        request: {
          query: GET_PET_BY_ID,
          variables: { id: 'nonexistent' },
        },
        result: {
          data: { pet: null },
        },
      },
    ];

    const { result } = renderHook(() => usePetDetail('nonexistent'), {
      wrapper: createWrapper(mocks),
    });

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.pet).toBeNull();
    expect(result.current.error).toBeUndefined();
  });

  it('returns error when query fails', async () => {
    const mocks: MockedResponse[] = [
      {
        request: {
          query: GET_PET_BY_ID,
          variables: { id: 'p1' },
        },
        error: new Error('GraphQL error'),
      },
    ];

    const { result } = renderHook(() => usePetDetail('p1'), {
      wrapper: createWrapper(mocks),
    });

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.pet).toBeNull();
    expect(result.current.error).toBeDefined();
  });

  it('skips query when id is empty', async () => {
    const mocks: MockedResponse[] = [];

    const { result } = renderHook(() => usePetDetail(''), {
      wrapper: createWrapper(mocks),
    });

    // Should not be loading since query is skipped
    expect(result.current.loading).toBe(false);
    expect(result.current.pet).toBeNull();
  });

  it('refetches when id changes', async () => {
    const secondPet: PetDetail = {
      ...mockPetDetail,
      id: 'p2',
      name: 'Luna',
      species: 'cat',
    };

    const mocks: MockedResponse[] = [
      {
        request: {
          query: GET_PET_BY_ID,
          variables: { id: 'p1' },
        },
        result: {
          data: { pet: mockPetDetail },
        },
      },
      {
        request: {
          query: GET_PET_BY_ID,
          variables: { id: 'p2' },
        },
        result: {
          data: { pet: secondPet },
        },
      },
    ];

    const { result, rerender } = renderHook(
      ({ id }) => usePetDetail(id),
      {
        wrapper: createWrapper(mocks),
        initialProps: { id: 'p1' },
      }
    );

    await waitFor(() => {
      expect(result.current.pet?.name).toBe('Max');
    });

    rerender({ id: 'p2' });

    await waitFor(() => {
      expect(result.current.pet?.name).toBe('Luna');
    });
  });
});
