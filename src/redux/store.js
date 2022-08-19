import {configureStore} from '@reduxjs/toolkit';
// import du slice pour ajout au store
import favoritesSlice from './favoritesSlice';

export const store = configureStore({
  reducer: {
    favorites: favoritesSlice.reducer, // attention c'est le reducer du slice qu'il faut ajouter
  },
});
