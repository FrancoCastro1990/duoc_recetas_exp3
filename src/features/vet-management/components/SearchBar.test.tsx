import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { SearchBar } from './SearchBar';

describe('SearchBar', () => {
  it('renders input with placeholder', () => {
    render(<SearchBar value="" onChange={() => {}} placeholder="Buscar..." />);
    expect(screen.getByPlaceholderText('Buscar...')).toBeInTheDocument();
  });

  it('renders with default placeholder when not provided', () => {
    render(<SearchBar value="" onChange={() => {}} />);
    expect(screen.getByPlaceholderText('Buscar...')).toBeInTheDocument();
  });

  it('displays the current value', () => {
    render(<SearchBar value="test value" onChange={() => {}} />);
    expect(screen.getByTestId('search-input')).toHaveValue('test value');
  });

  it('calls onChange when typing', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<SearchBar value="" onChange={onChange} />);

    const input = screen.getByTestId('search-input');
    await user.type(input, 'a');

    expect(onChange).toHaveBeenCalledWith('a');
  });

  it('calls onChange for each character typed', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<SearchBar value="" onChange={onChange} />);

    const input = screen.getByTestId('search-input');
    await user.type(input, 'abc');

    expect(onChange).toHaveBeenCalledTimes(3);
  });

  it('renders search icon', () => {
    render(<SearchBar value="" onChange={() => {}} />);
    expect(screen.getByTestId('search-bar')).toBeInTheDocument();
  });
});
