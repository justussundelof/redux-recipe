// Domän-typer för receptdata

export interface Recipe {
  id: number;
  name: string;
  cuisine: string;
  difficulty: string;
  mealType: string[];
  image: string;
  prepTimeMinutes?: number;
  cookTimeMinutes?: number;
  servings?: number;
  caloriesPerServing?: number;
  rating?: number;
  reviewCount?: number;
}

export interface RecipeSearchResponse {
  recipes: Recipe[];
  total: number;
  skip: number;
  limit: number;
}
