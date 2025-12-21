import { gql } from '@apollo/client';

export const GET_PET_BY_ID = gql`
  query GetPetById($id: String!) {
    pet(id: $id) {
      id
      name
      species
      breed
      age
      weight
      color
      birthDate
      imageUrl
      ownerId
      medicalHistory {
        id
        date
        diagnosis
        treatment
        notes
        veterinarianId
      }
      owner {
        id
        firstName
        lastName
        phone
        email
        address
      }
    }
  }
`;

export const GET_APPOINTMENT_BY_ID = gql`
  query GetAppointmentById($id: String!) {
    appointment(id: $id) {
      id
      date
      time
      status
      reason
      notes
      diagnosis
      treatment
      petId
      petName
      petSpecies
      ownerId
      ownerName
      veterinarianId
      veterinarianName
      pet {
        id
        name
        species
        breed
        age
        imageUrl
      }
      owner {
        id
        firstName
        lastName
        phone
        address
      }
      veterinarian {
        id
        firstName
        lastName
        specialty
        imageUrl
      }
    }
  }
`;
