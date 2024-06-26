export interface CatTypes {
  idCategory: number;
  strCategory: string;
  strCategoryThumb: string;
}
export interface RecipeTypes {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
}
export interface Meal {
  idMeal: string;
  strMeal: string;
  strArea: string;
  strInstructions: string;
  strMealThumb: string;
  strYoutube: string;
}

export interface MealApiResponse {
  meals: Meal[];
}
