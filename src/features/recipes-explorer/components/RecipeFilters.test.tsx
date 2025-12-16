import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { RecipeFilters } from './RecipeFilters'

describe('RecipeFilters', () => {
  it('renders all three category buttons', () => {
    const mockOnChange = vi.fn()
    render(<RecipeFilters selectedCategory="all" onCategoryChange={mockOnChange} />)

    expect(screen.getByRole('button', { name: /todas/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /postre/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /plato principal/i })).toBeInTheDocument()
  })

  it('calls onCategoryChange with "all" when clicking "Todas" button', async () => {
    const user = userEvent.setup()
    const mockOnChange = vi.fn()
    render(<RecipeFilters selectedCategory="dessert" onCategoryChange={mockOnChange} />)

    await user.click(screen.getByRole('button', { name: /todas/i }))

    expect(mockOnChange).toHaveBeenCalledWith('all')
  })

  it('calls onCategoryChange with "dessert" when clicking "Postre" button', async () => {
    const user = userEvent.setup()
    const mockOnChange = vi.fn()
    render(<RecipeFilters selectedCategory="all" onCategoryChange={mockOnChange} />)

    await user.click(screen.getByRole('button', { name: /postre/i }))

    expect(mockOnChange).toHaveBeenCalledWith('dessert')
  })

  it('calls onCategoryChange with "main-course" when clicking "Plato Principal" button', async () => {
    const user = userEvent.setup()
    const mockOnChange = vi.fn()
    render(<RecipeFilters selectedCategory="all" onCategoryChange={mockOnChange} />)

    await user.click(screen.getByRole('button', { name: /plato principal/i }))

    expect(mockOnChange).toHaveBeenCalledWith('main-course')
  })

  it('applies active styles to the selected category button', () => {
    const mockOnChange = vi.fn()
    render(<RecipeFilters selectedCategory="dessert" onCategoryChange={mockOnChange} />)

    const dessertButton = screen.getByRole('button', { name: /postre/i })
    expect(dessertButton).toHaveClass('bg-gradient-primary')
  })

  it('applies inactive styles to non-selected category buttons', () => {
    const mockOnChange = vi.fn()
    render(<RecipeFilters selectedCategory="dessert" onCategoryChange={mockOnChange} />)

    const allButton = screen.getByRole('button', { name: /todas/i })
    expect(allButton).toHaveClass('bg-white')
    expect(allButton).not.toHaveClass('bg-gradient-primary')
  })

  it('updates active button when selectedCategory changes', () => {
    const mockOnChange = vi.fn()
    const { rerender } = render(
      <RecipeFilters selectedCategory="all" onCategoryChange={mockOnChange} />
    )

    const allButton = screen.getByRole('button', { name: /todas/i })
    expect(allButton).toHaveClass('bg-gradient-primary')

    rerender(<RecipeFilters selectedCategory="main-course" onCategoryChange={mockOnChange} />)

    const mainCourseButton = screen.getByRole('button', { name: /plato principal/i })
    expect(mainCourseButton).toHaveClass('bg-gradient-primary')
    expect(allButton).not.toHaveClass('bg-gradient-primary')
  })
})
