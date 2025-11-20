import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { Recipe, RecipeSearchResponse } from '../../types/recipe';

// RTK Query service för receptdata
export const recipesApi = createApi({
  reducerPath: 'recipesApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://dummyjson.com' }),
  endpoints: (builder) => ({
    // Sök recept med query-parameter
    searchRecipes: builder.query<RecipeSearchResponse, { q: string }>({
      query: ({ q }) => `/recipes/search?q=${encodeURIComponent(q)}`,
    }),
    
    // Hämta ett specifikt recept (valfritt)
    getRecipeById: builder.query<Recipe, number>({
      query: (id) => `/recipes/${id}`,
    }),
  }),
});

// Exportera genererade hooks
export const { useSearchRecipesQuery, useGetRecipeByIdQuery } = recipesApi;
