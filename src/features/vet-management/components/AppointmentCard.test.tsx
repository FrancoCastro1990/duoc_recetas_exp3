import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { AppointmentCard } from './AppointmentCard';
import type { AppointmentSummary } from '../types';

const mockAppointment: AppointmentSummary = {
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
};

describe('AppointmentCard', () => {
  it('renders appointment time', () => {
    render(<AppointmentCard appointment={mockAppointment} />);
    expect(screen.getByText('09:00')).toBeInTheDocument();
  });

  it('renders pet name', () => {
    render(<AppointmentCard appointment={mockAppointment} />);
    expect(screen.getByText('Max')).toBeInTheDocument();
  });

  it('renders owner name', () => {
    render(<AppointmentCard appointment={mockAppointment} />);
    expect(screen.getByText('Maria Gonzalez')).toBeInTheDocument();
  });

  it('renders veterinarian name', () => {
    render(<AppointmentCard appointment={mockAppointment} />);
    expect(screen.getByText('Dr. Roberto Sanchez')).toBeInTheDocument();
  });

  it('renders reason', () => {
    render(<AppointmentCard appointment={mockAppointment} />);
    expect(screen.getByText('Control rutinario')).toBeInTheDocument();
  });

  it('renders scheduled status correctly', () => {
    render(<AppointmentCard appointment={mockAppointment} />);
    expect(screen.getByText('Programada')).toBeInTheDocument();
  });

  it('renders in-progress status correctly', () => {
    const inProgressAppointment = { ...mockAppointment, status: 'in-progress' as const };
    render(<AppointmentCard appointment={inProgressAppointment} />);
    expect(screen.getByText('En Curso')).toBeInTheDocument();
  });

  it('renders completed status correctly', () => {
    const completedAppointment = { ...mockAppointment, status: 'completed' as const };
    render(<AppointmentCard appointment={completedAppointment} />);
    expect(screen.getByText('Completada')).toBeInTheDocument();
  });

  it('renders data-testid with appointment id', () => {
    render(<AppointmentCard appointment={mockAppointment} />);
    expect(screen.getByTestId('appointment-card-a1')).toBeInTheDocument();
  });
});
