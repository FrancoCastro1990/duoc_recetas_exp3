import { useQuery } from '@apollo/client/react';
import { GET_PET_BY_ID } from '../graphql/queries';
import type { GetPetByIdResponse, GetPetByIdVariables } from '../graphql/types';

export function usePetDetail(id: string) {
  const { data, loading, error } = useQuery<GetPetByIdResponse, GetPetByIdVariables>(
    GET_PET_BY_ID,
    {
      variables: { id },
      skip: !id,
    }
  );

  return {
    pet: data?.pet ?? null,
    loading,
    error,
  };
}
