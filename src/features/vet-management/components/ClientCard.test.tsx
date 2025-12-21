import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { ClientCard } from './ClientCard';
import type { Client, PetSummary } from '../types';

const mockClient: Client = {
  id: 'c1',
  firstName: 'Maria',
  lastName: 'Gonzalez',
  phone: '+56 9 1234 5678',
  email: 'maria@email.com',
  address: 'Av. Providencia 1234, Santiago',
};

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

describe('ClientCard', () => {
  it('renders client full name', () => {
    render(<ClientCard client={mockClient} pets={[]} />);
    expect(screen.getByText('Maria Gonzalez')).toBeInTheDocument();
  });

  it('renders client phone', () => {
    render(<ClientCard client={mockClient} pets={[]} />);
    expect(screen.getByText('+56 9 1234 5678')).toBeInTheDocument();
  });

  it('renders client email', () => {
    render(<ClientCard client={mockClient} pets={[]} />);
    expect(screen.getByText('maria@email.com')).toBeInTheDocument();
  });

  it('renders client address', () => {
    render(<ClientCard client={mockClient} pets={[]} />);
    expect(screen.getByText('Av. Providencia 1234, Santiago')).toBeInTheDocument();
  });

  it('renders pets section when pets are provided', () => {
    render(<ClientCard client={mockClient} pets={mockPets} />);
    expect(screen.getByText('Mascotas (2)')).toBeInTheDocument();
  });

  it('renders pet names', () => {
    render(<ClientCard client={mockClient} pets={mockPets} />);
    expect(screen.getByText('Max')).toBeInTheDocument();
    expect(screen.getByText('Luna')).toBeInTheDocument();
  });

  it('does not render pets section when no pets', () => {
    render(<ClientCard client={mockClient} pets={[]} />);
    expect(screen.queryByText(/Mascotas/)).not.toBeInTheDocument();
  });

  it('renders data-testid with client id', () => {
    render(<ClientCard client={mockClient} pets={[]} />);
    expect(screen.getByTestId('client-card-c1')).toBeInTheDocument();
  });
});
