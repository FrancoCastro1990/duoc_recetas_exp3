import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import { PetGrid } from './PetGrid';
import type { PetSummary } from '../types';

const mockPets: PetSummary[] = [
  {
    id: 'p1',
    name: 'Max',
    species: 'dog',
    breed: 'Golden Retriever',
    age: 3,
    imageUrl: 'https://example.com/dog1.jpg',
    ownerId: 'c1',
  },
  {
    id: 'p2',
    name: 'Luna',
    species: 'cat',
    breed: 'Siames',
    age: 2,
    imageUrl: 'https://example.com/cat1.jpg',
    ownerId: 'c2',
  },
];

const renderWithRouter = (component: React.ReactNode) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe('PetGrid', () => {
  it('renders loading state', () => {
    renderWithRouter(<PetGrid pets={[]} loading={true} />);
    expect(screen.getByTestId('pets-loading')).toBeInTheDocument();
  });

  it('renders empty state when no pets', () => {
    renderWithRouter(<PetGrid pets={[]} loading={false} />);
    expect(screen.getByTestId('pets-empty')).toBeInTheDocument();
    expect(screen.getByText('No se encontraron mascotas')).toBeInTheDocument();
  });

  it('renders pet cards', () => {
    renderWithRouter(<PetGrid pets={mockPets} loading={false} />);
    expect(screen.getByText('Max')).toBeInTheDocument();
    expect(screen.getByText('Luna')).toBeInTheDocument();
  });

  it('renders grid container', () => {
    renderWithRouter(<PetGrid pets={mockPets} loading={false} />);
    expect(screen.getByTestId('pets-grid')).toBeInTheDocument();
  });

  it('prioritizes loading state over empty', () => {
    renderWithRouter(<PetGrid pets={[]} loading={true} />);
    expect(screen.getByTestId('pets-loading')).toBeInTheDocument();
    expect(screen.queryByTestId('pets-empty')).not.toBeInTheDocument();
  });

  it('renders correct number of cards', () => {
    renderWithRouter(<PetGrid pets={mockPets} loading={false} />);
    expect(screen.getAllByText(/Perro|Gato/).length).toBe(2);
  });
});
