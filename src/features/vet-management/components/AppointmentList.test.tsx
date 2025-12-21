import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { AppointmentList } from './AppointmentList';
import type { AppointmentSummary } from '../types';

const createAppointment = (id: string, time: string): AppointmentSummary => ({
  id,
  date: '2024-12-16',
  time,
  status: 'scheduled',
  petId: `p${id}`,
  petName: `Pet ${id}`,
  petSpecies: 'dog',
  ownerId: `c${id}`,
  ownerName: `Owner ${id}`,
  veterinarianId: 'v1',
  veterinarianName: 'Dr. Test',
  reason: 'Test reason',
});

const mockAppointments: AppointmentSummary[] = [
  createAppointment('1', '09:00'),
  createAppointment('2', '10:00'),
  createAppointment('3', '11:00'),
];

describe('AppointmentList', () => {
  it('renders loading state', () => {
    render(<AppointmentList appointments={[]} loading={true} />);
    expect(screen.getByTestId('appointments-loading')).toBeInTheDocument();
  });

  it('renders empty state when no appointments', () => {
    render(<AppointmentList appointments={[]} loading={false} />);
    expect(screen.getByTestId('appointments-empty')).toBeInTheDocument();
    expect(screen.getByText('No hay citas programadas para este dia')).toBeInTheDocument();
  });

  it('renders appointment cards', () => {
    render(<AppointmentList appointments={mockAppointments} loading={false} />);
    expect(screen.getByText('09:00')).toBeInTheDocument();
    expect(screen.getByText('10:00')).toBeInTheDocument();
    expect(screen.getByText('11:00')).toBeInTheDocument();
  });

  it('renders list container', () => {
    render(<AppointmentList appointments={mockAppointments} loading={false} />);
    expect(screen.getByTestId('appointments-list')).toBeInTheDocument();
  });

  it('prioritizes loading state over empty', () => {
    render(<AppointmentList appointments={[]} loading={true} />);
    expect(screen.getByTestId('appointments-loading')).toBeInTheDocument();
    expect(screen.queryByTestId('appointments-empty')).not.toBeInTheDocument();
  });

  it('shows warning when max appointments reached', () => {
    const eightAppointments = Array.from({ length: 8 }, (_, i) =>
      createAppointment(String(i + 1), `${9 + i}:00`)
    );
    render(<AppointmentList appointments={eightAppointments} loading={false} />);
    expect(screen.getByTestId('max-appointments-warning')).toBeInTheDocument();
  });

  it('does not show warning when less than 8 appointments', () => {
    render(<AppointmentList appointments={mockAppointments} loading={false} />);
    expect(screen.queryByTestId('max-appointments-warning')).not.toBeInTheDocument();
  });

  it('sorts appointments by time', () => {
    const unsortedAppointments = [
      createAppointment('3', '11:00'),
      createAppointment('1', '09:00'),
      createAppointment('2', '10:00'),
    ];
    render(<AppointmentList appointments={unsortedAppointments} loading={false} />);
    const times = screen.getAllByText(/\d{2}:00/);
    expect(times[0]).toHaveTextContent('09:00');
    expect(times[1]).toHaveTextContent('10:00');
    expect(times[2]).toHaveTextContent('11:00');
  });
});
