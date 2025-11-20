import { configureStore } from '@reduxjs/toolkit';
import favoritesReducer from '../features/favorites/favoritesSlice';
import { recipesApi } from '../features/recipes/recipesApi';

// Konfigurera Redux store
export const store = configureStore({
  reducer: {
    favorites: favoritesReducer,
    [recipesApi.reducerPath]: recipesApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(recipesApi.middleware),
});

// Härled och exportera TypeScript-typer
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
