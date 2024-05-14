import { createSlice } from '@reduxjs/toolkit';

export const sidebarSlice = createSlice({
  name: 'sidebar',
  initialState: {
    isDropdown: false,
    // Add more state for other dropdowns if needed
  },
  reducers: {
    toggleDropdown : state => {
      state.isDropdown = !state.isDropdown;
    },
    // Add more reducers for other dropdowns if needed
  },
});

export const { toggleDropdown } = sidebarSlice.actions;

export default sidebarSlice.reducer;
