import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Lokal typ för favoriter (subset av Recipe)
export interface Favorite {
  id: number;
  name: string;
  image: string;
  cuisine: string;
}

// State-gränssnitt
export interface FavoritesState {
  items: Favorite[];
}

// Initial state
const initialState: FavoritesState = {
  items: [],
};

// Skapa slice
const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    // Lägg till favorit (om den inte redan finns)
    addFavorite: (state, action: PayloadAction<Favorite>) => {
      const exists = state.items.some(item => item.id === action.payload.id);
      if (!exists) {
        state.items.push(action.payload);
      }
    },
    
    // Ta bort favorit via id
    removeFavorite: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
    
    // Rensa alla favoriter
    clearFavorites: (state) => {
      state.items = [];
    },
  },
});

// Exportera actions
export const { addFavorite, removeFavorite, clearFavorites } = favoritesSlice.actions;

// Exportera reducer
export default favoritesSlice.reducer;
