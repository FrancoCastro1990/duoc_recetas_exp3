import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import { PetCard } from './PetCard';
import type { PetSummary } from '../types';

const mockPet: PetSummary = {
  id: 'p1',
  name: 'Max',
  species: 'dog',
  breed: 'Golden Retriever',
  age: 3,
  imageUrl: 'https://example.com/dog.jpg',
  ownerId: 'c1',
};

const renderWithRouter = (component: React.ReactNode) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe('PetCard', () => {
  it('renders pet name', () => {
    renderWithRouter(<PetCard pet={mockPet} />);
    expect(screen.getByText('Max')).toBeInTheDocument();
  });

  it('renders species and breed', () => {
    renderWithRouter(<PetCard pet={mockPet} />);
    expect(screen.getByText('Perro - Golden Retriever')).toBeInTheDocument();
  });

  it('renders age', () => {
    renderWithRouter(<PetCard pet={mockPet} />);
    expect(screen.getByText('3 anos')).toBeInTheDocument();
  });

  it('renders age as singular for 1 year', () => {
    const youngPet = { ...mockPet, age: 1 };
    renderWithRouter(<PetCard pet={youngPet} />);
    expect(screen.getByText('1 ano')).toBeInTheDocument();
  });

  it('renders image with correct alt text', () => {
    renderWithRouter(<PetCard pet={mockPet} />);
    const img = screen.getByAltText('Max');
    expect(img).toHaveAttribute('src', 'https://example.com/dog.jpg');
  });

  it('renders species emoji', () => {
    renderWithRouter(<PetCard pet={mockPet} />);
    expect(screen.getByTestId(`pet-card-${mockPet.id}`)).toBeInTheDocument();
  });

  it('links to pet detail page', () => {
    renderWithRouter(<PetCard pet={mockPet} />);
    const link = screen.getByTestId('pet-card-p1');
    expect(link).toHaveAttribute('href', '/pets/p1');
  });

  it('renders owner name when provided', () => {
    renderWithRouter(<PetCard pet={mockPet} ownerName="Maria Gonzalez" />);
    expect(screen.getByText('Maria Gonzalez')).toBeInTheDocument();
  });

  it('renders cat species correctly', () => {
    const catPet = { ...mockPet, species: 'cat' as const, breed: 'Siames' };
    renderWithRouter(<PetCard pet={catPet} />);
    expect(screen.getByText('Gato - Siames')).toBeInTheDocument();
  });

  it('renders bird species correctly', () => {
    const birdPet = { ...mockPet, species: 'bird' as const, breed: 'Canario' };
    renderWithRouter(<PetCard pet={birdPet} />);
    expect(screen.getByText('Ave - Canario')).toBeInTheDocument();
  });
});
