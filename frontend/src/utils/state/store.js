import { configureStore } from '@reduxjs/toolkit';
import navbarReducer from './navbarSlice';

export const store = configureStore({
  reducer: {
    navbar: navbarReducer,
  },
});

