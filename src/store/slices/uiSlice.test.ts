import { describe, it, expect, vi, beforeAll, afterAll } from 'vitest';
import uiReducer, {
  setSelectedDate,
  setClientSearchTerm,
  setClientsViewMode,
  toggleSidebar,
  resetFilters,
} from './uiSlice';

// Get current date dynamically to match the slice's initialState
const mockDate = new Date().toISOString().split('T')[0];

beforeAll(() => {
  vi.useFakeTimers();
  vi.setSystemTime(new Date(`${mockDate}T12:00:00`));
});

afterAll(() => {
  vi.useRealTimers();
});

describe('uiSlice', () => {
  const initialState = {
    selectedDate: mockDate,
    clientSearchTerm: '',
    clientsViewMode: 'grid' as const,
    sidebarOpen: false,
  };

  describe('initial state', () => {
    it('has correct initial values', () => {
      const state = uiReducer(undefined, { type: 'unknown' });
      expect(state.selectedDate).toBe(mockDate);
      expect(state.clientSearchTerm).toBe('');
      expect(state.clientsViewMode).toBe('grid');
      expect(state.sidebarOpen).toBe(false);
    });
  });

  describe('setSelectedDate', () => {
    it('updates selected date', () => {
      const state = uiReducer(initialState, setSelectedDate('2024-12-20'));
      expect(state.selectedDate).toBe('2024-12-20');
    });
  });

  describe('setClientSearchTerm', () => {
    it('updates search term', () => {
      const state = uiReducer(initialState, setClientSearchTerm('Maria'));
      expect(state.clientSearchTerm).toBe('Maria');
    });

    it('allows empty search term', () => {
      const stateWithSearch = { ...initialState, clientSearchTerm: 'test' };
      const state = uiReducer(stateWithSearch, setClientSearchTerm(''));
      expect(state.clientSearchTerm).toBe('');
    });
  });

  describe('setClientsViewMode', () => {
    it('changes to list view', () => {
      const state = uiReducer(initialState, setClientsViewMode('list'));
      expect(state.clientsViewMode).toBe('list');
    });

    it('changes to grid view', () => {
      const listState = { ...initialState, clientsViewMode: 'list' as const };
      const state = uiReducer(listState, setClientsViewMode('grid'));
      expect(state.clientsViewMode).toBe('grid');
    });
  });

  describe('toggleSidebar', () => {
    it('opens sidebar when closed', () => {
      const state = uiReducer(initialState, toggleSidebar());
      expect(state.sidebarOpen).toBe(true);
    });

    it('closes sidebar when open', () => {
      const openState = { ...initialState, sidebarOpen: true };
      const state = uiReducer(openState, toggleSidebar());
      expect(state.sidebarOpen).toBe(false);
    });
  });

  describe('resetFilters', () => {
    it('resets date to today', () => {
      const modifiedState = { ...initialState, selectedDate: '2024-01-01' };
      const state = uiReducer(modifiedState, resetFilters());
      expect(state.selectedDate).toBe(mockDate);
    });

    it('clears search term', () => {
      const modifiedState = { ...initialState, clientSearchTerm: 'test' };
      const state = uiReducer(modifiedState, resetFilters());
      expect(state.clientSearchTerm).toBe('');
    });

    it('preserves other state', () => {
      const modifiedState = {
        ...initialState,
        selectedDate: '2024-01-01',
        clientSearchTerm: 'test',
        clientsViewMode: 'list' as const,
        sidebarOpen: true,
      };
      const state = uiReducer(modifiedState, resetFilters());
      expect(state.clientsViewMode).toBe('list');
      expect(state.sidebarOpen).toBe(true);
    });
  });
});
