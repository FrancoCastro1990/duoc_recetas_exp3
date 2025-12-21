import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { DateFilter } from './DateFilter';

describe('DateFilter', () => {
  it('renders date input', () => {
    render(<DateFilter selectedDate="2024-12-16" onDateChange={() => {}} />);
    expect(screen.getByTestId('date-input')).toBeInTheDocument();
  });

  it('displays the selected date', () => {
    render(<DateFilter selectedDate="2024-12-16" onDateChange={() => {}} />);
    expect(screen.getByTestId('date-input')).toHaveValue('2024-12-16');
  });

  it('calls onDateChange when date is changed', async () => {
    const user = userEvent.setup();
    const onDateChange = vi.fn();
    render(<DateFilter selectedDate="2024-12-16" onDateChange={onDateChange} />);

    const input = screen.getByTestId('date-input');
    await user.clear(input);
    await user.type(input, '2024-12-20');

    expect(onDateChange).toHaveBeenCalled();
  });

  it('renders calendar icon', () => {
    render(<DateFilter selectedDate="2024-12-16" onDateChange={() => {}} />);
    expect(screen.getByTestId('date-filter')).toBeInTheDocument();
  });
});
