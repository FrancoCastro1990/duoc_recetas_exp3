import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

const getToday = (): string => {
  return new Date().toISOString().split('T')[0];
};

interface UiState {
  selectedDate: string;
  clientSearchTerm: string;
  clientsViewMode: 'grid' | 'list';
  sidebarOpen: boolean;
}

const initialState: UiState = {
  selectedDate: getToday(),
  clientSearchTerm: '',
  clientsViewMode: 'grid',
  sidebarOpen: false,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setSelectedDate: (state, action: PayloadAction<string>) => {
      state.selectedDate = action.payload;
    },
    setClientSearchTerm: (state, action: PayloadAction<string>) => {
      state.clientSearchTerm = action.payload;
    },
    setClientsViewMode: (state, action: PayloadAction<'grid' | 'list'>) => {
      state.clientsViewMode = action.payload;
    },
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen;
    },
    resetFilters: (state) => {
      state.selectedDate = getToday();
      state.clientSearchTerm = '';
    },
  },
});

export const {
  setSelectedDate,
  setClientSearchTerm,
  setClientsViewMode,
  toggleSidebar,
  resetFilters,
} = uiSlice.actions;

export default uiSlice.reducer;
