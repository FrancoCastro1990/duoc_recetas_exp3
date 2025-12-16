import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { SearchBar } from './SearchBar'

describe('SearchBar', () => {
  it('renders an input element', () => {
    const mockOnChange = vi.fn()
    render(<SearchBar value="" onChange={mockOnChange} />)

    expect(screen.getByRole('textbox')).toBeInTheDocument()
  })

  it('displays the default placeholder', () => {
    const mockOnChange = vi.fn()
    render(<SearchBar value="" onChange={mockOnChange} />)

    expect(screen.getByPlaceholderText('Buscar recetas...')).toBeInTheDocument()
  })

  it('displays a custom placeholder when provided', () => {
    const mockOnChange = vi.fn()
    render(<SearchBar value="" onChange={mockOnChange} placeholder="Buscar por nombre..." />)

    expect(screen.getByPlaceholderText('Buscar por nombre...')).toBeInTheDocument()
  })

  it('displays the controlled value', () => {
    const mockOnChange = vi.fn()
    render(<SearchBar value="Tiramisú" onChange={mockOnChange} />)

    expect(screen.getByDisplayValue('Tiramisú')).toBeInTheDocument()
  })

  it('calls onChange when user types', async () => {
    const user = userEvent.setup()
    const mockOnChange = vi.fn()
    render(<SearchBar value="" onChange={mockOnChange} />)

    const input = screen.getByRole('textbox')
    await user.type(input, 'Pasta')

    // Each character triggers onChange
    expect(mockOnChange).toHaveBeenCalledTimes(5)
    expect(mockOnChange).toHaveBeenLastCalledWith('a')
  })

  it('calls onChange with complete value when typing', async () => {
    const user = userEvent.setup()
    const mockOnChange = vi.fn()
    render(<SearchBar value="" onChange={mockOnChange} />)

    const input = screen.getByRole('textbox')
    await user.type(input, 'P')

    expect(mockOnChange).toHaveBeenCalledWith('P')
  })

  it('clears input when value prop becomes empty', () => {
    const mockOnChange = vi.fn()
    const { rerender } = render(<SearchBar value="Tiramisú" onChange={mockOnChange} />)

    expect(screen.getByDisplayValue('Tiramisú')).toBeInTheDocument()

    rerender(<SearchBar value="" onChange={mockOnChange} />)

    expect(screen.queryByDisplayValue('Tiramisú')).not.toBeInTheDocument()
  })

  it('updates displayed value when value prop changes', () => {
    const mockOnChange = vi.fn()
    const { rerender } = render(<SearchBar value="Pasta" onChange={mockOnChange} />)

    expect(screen.getByDisplayValue('Pasta')).toBeInTheDocument()

    rerender(<SearchBar value="Tiramisú" onChange={mockOnChange} />)

    expect(screen.getByDisplayValue('Tiramisú')).toBeInTheDocument()
  })
})
