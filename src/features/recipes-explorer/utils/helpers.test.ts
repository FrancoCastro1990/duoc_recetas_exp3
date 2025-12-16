import { describe, it, expect } from 'vitest'
import {
  formatCookingTime,
  getDifficultyLabel,
  getDifficultyColor,
  getCategoryLabel,
  getCategoryColor
} from './helpers'

describe('formatCookingTime', () => {
  it('formats minutes less than 60 correctly', () => {
    expect(formatCookingTime(30)).toBe('30 min')
    expect(formatCookingTime(45)).toBe('45 min')
    expect(formatCookingTime(1)).toBe('1 min')
  })

  it('formats exactly 60 minutes as 1h', () => {
    expect(formatCookingTime(60)).toBe('1h')
  })

  it('formats hours with no remaining minutes correctly', () => {
    expect(formatCookingTime(120)).toBe('2h')
    expect(formatCookingTime(180)).toBe('3h')
  })

  it('formats hours with remaining minutes correctly', () => {
    expect(formatCookingTime(90)).toBe('1h 30min')
    expect(formatCookingTime(75)).toBe('1h 15min')
    expect(formatCookingTime(150)).toBe('2h 30min')
  })
})

describe('getDifficultyLabel', () => {
  it('returns "Fácil" for easy difficulty', () => {
    expect(getDifficultyLabel('easy')).toBe('Fácil')
  })

  it('returns "Medio" for medium difficulty', () => {
    expect(getDifficultyLabel('medium')).toBe('Medio')
  })

  it('returns "Difícil" for hard difficulty', () => {
    expect(getDifficultyLabel('hard')).toBe('Difícil')
  })
})

describe('getDifficultyColor', () => {
  it('returns correct Tailwind classes for easy difficulty', () => {
    expect(getDifficultyColor('easy')).toBe('bg-accent-100 text-accent-700')
  })

  it('returns correct Tailwind classes for medium difficulty', () => {
    expect(getDifficultyColor('medium')).toBe('bg-warning-100 text-warning-700')
  })

  it('returns correct Tailwind classes for hard difficulty', () => {
    expect(getDifficultyColor('hard')).toBe('bg-error-100 text-error-700')
  })
})

describe('getCategoryLabel', () => {
  it('returns "Postre" for dessert category', () => {
    expect(getCategoryLabel('dessert')).toBe('Postre')
  })

  it('returns "Plato Principal" for main-course category', () => {
    expect(getCategoryLabel('main-course')).toBe('Plato Principal')
  })
})

describe('getCategoryColor', () => {
  it('returns correct Tailwind classes for dessert category', () => {
    expect(getCategoryColor('dessert')).toBe('bg-accent-100 text-accent-700')
  })

  it('returns correct Tailwind classes for main-course category', () => {
    expect(getCategoryColor('main-course')).toBe('bg-primary-100 text-primary-700')
  })
})
