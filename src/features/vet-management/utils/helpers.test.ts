import { describe, it, expect } from 'vitest';
import {
  formatDate,
  formatDateLong,
  getSpeciesLabel,
  getSpeciesEmoji,
  getStatusLabel,
  getStatusColor,
  formatAge,
  formatWeight,
  getFullName,
} from './helpers';

describe('helpers', () => {
  describe('formatDate', () => {
    it('formats date correctly', () => {
      expect(formatDate('2024-12-16')).toBe('16-12-2024');
    });
  });

  describe('formatDateLong', () => {
    it('formats date in long format', () => {
      const result = formatDateLong('2024-12-16');
      expect(result).toContain('16');
      expect(result).toContain('2024');
    });
  });

  describe('getSpeciesLabel', () => {
    it('returns correct label for dog', () => {
      expect(getSpeciesLabel('dog')).toBe('Perro');
    });

    it('returns correct label for cat', () => {
      expect(getSpeciesLabel('cat')).toBe('Gato');
    });

    it('returns correct label for bird', () => {
      expect(getSpeciesLabel('bird')).toBe('Ave');
    });

    it('returns correct label for rabbit', () => {
      expect(getSpeciesLabel('rabbit')).toBe('Conejo');
    });

    it('returns correct label for hamster', () => {
      expect(getSpeciesLabel('hamster')).toBe('Hamster');
    });

    it('returns correct label for other', () => {
      expect(getSpeciesLabel('other')).toBe('Otro');
    });
  });

  describe('getSpeciesEmoji', () => {
    it('returns dog emoji', () => {
      expect(getSpeciesEmoji('dog')).toBe('🐕');
    });

    it('returns cat emoji', () => {
      expect(getSpeciesEmoji('cat')).toBe('🐈');
    });

    it('returns bird emoji', () => {
      expect(getSpeciesEmoji('bird')).toBe('🦜');
    });
  });

  describe('getStatusLabel', () => {
    it('returns Programada for scheduled', () => {
      expect(getStatusLabel('scheduled')).toBe('Programada');
    });

    it('returns En Curso for in-progress', () => {
      expect(getStatusLabel('in-progress')).toBe('En Curso');
    });

    it('returns Completada for completed', () => {
      expect(getStatusLabel('completed')).toBe('Completada');
    });

    it('returns Cancelada for cancelled', () => {
      expect(getStatusLabel('cancelled')).toBe('Cancelada');
    });
  });

  describe('getStatusColor', () => {
    it('returns accent colors for scheduled', () => {
      expect(getStatusColor('scheduled')).toContain('accent');
    });

    it('returns warning colors for in-progress', () => {
      expect(getStatusColor('in-progress')).toContain('warning');
    });

    it('returns success colors for completed', () => {
      expect(getStatusColor('completed')).toContain('success');
    });

    it('returns error colors for cancelled', () => {
      expect(getStatusColor('cancelled')).toContain('error');
    });
  });

  describe('formatAge', () => {
    it('returns singular for 1 year', () => {
      expect(formatAge(1)).toBe('1 ano');
    });

    it('returns plural for multiple years', () => {
      expect(formatAge(3)).toBe('3 anos');
    });
  });

  describe('formatWeight', () => {
    it('formats weight with kg', () => {
      expect(formatWeight(5)).toBe('5 kg');
    });

    it('handles decimal weights', () => {
      expect(formatWeight(4.5)).toBe('4.5 kg');
    });
  });

  describe('getFullName', () => {
    it('combines first and last name', () => {
      expect(getFullName('Maria', 'Gonzalez')).toBe('Maria Gonzalez');
    });
  });
});
