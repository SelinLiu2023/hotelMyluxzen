// navbarSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isMenuOpen: false, // État initial du menu (fermé)
};

const navbarSlice = createSlice({
  name: 'navbar',
  initialState,
  reducers: {
    toggleMenu: (state) => {
      state.isMenuOpen = !state.isMenuOpen; // Bascule l'état du menu
    },
  },
});

export const { toggleMenu } = navbarSlice.actions; // Exporter l'action
export default navbarSlice.reducer; // Exporter le reducer

