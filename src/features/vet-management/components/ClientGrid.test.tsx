import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { ClientGrid } from './ClientGrid';
import type { Client, PetSummary } from '../types';

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
];

describe('ClientGrid', () => {
  it('renders loading state', () => {
    render(<ClientGrid clients={[]} pets={[]} loading={true} />);
    expect(screen.getByTestId('clients-loading')).toBeInTheDocument();
  });

  it('renders empty state when no clients', () => {
    render(<ClientGrid clients={[]} pets={[]} loading={false} />);
    expect(screen.getByTestId('clients-empty')).toBeInTheDocument();
    expect(screen.getByText('No se encontraron clientes')).toBeInTheDocument();
  });

  it('renders client cards', () => {
    render(<ClientGrid clients={mockClients} pets={mockPets} loading={false} />);
    expect(screen.getByText('Maria Gonzalez')).toBeInTheDocument();
    expect(screen.getByText('Carlos Rodriguez')).toBeInTheDocument();
  });

  it('renders grid container', () => {
    render(<ClientGrid clients={mockClients} pets={mockPets} loading={false} />);
    expect(screen.getByTestId('clients-grid')).toBeInTheDocument();
  });

  it('prioritizes loading state over empty', () => {
    render(<ClientGrid clients={[]} pets={[]} loading={true} />);
    expect(screen.getByTestId('clients-loading')).toBeInTheDocument();
    expect(screen.queryByTestId('clients-empty')).not.toBeInTheDocument();
  });

  it('associates pets with correct clients', () => {
    render(<ClientGrid clients={mockClients} pets={mockPets} loading={false} />);
    // Max belongs to c1 (Maria), not c2 (Carlos)
    const mariaCard = screen.getByTestId('client-card-c1');
    expect(mariaCard).toContainHTML('Max');
  });
});
