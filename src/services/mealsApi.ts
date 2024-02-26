import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface Category {
	idCategory: string;
	strCategory: string;
	strCategoryDescription: string;
	strCategoryThumb: string;
}

interface Meal {
	idMeal: string;
	strMeal: string;
	strMealThumb: string;
}
interface MealsApiResponseCategories {
	categories: Category[];
}

interface MealsApiResponse {
	meals: Meal[];
}

export const mealsApi = createApi({
	baseQuery: fetchBaseQuery({
		baseUrl: "https://themealdb.com/api/json/v1/1/"
	}),
	reducerPath: "mealsApi",
	endpoints: build => ({
		getMealsCategories: build.query<MealsApiResponseCategories, void>({
			query: () => "categories.php"
		}),
		getMealsByCategory: build.query<MealsApiResponse, string | undefined>({
			query: category => `filter.php?c=${category}`
		})
	})
});

export const { useGetMealsCategoriesQuery, useGetMealsByCategoryQuery } =
	mealsApi;
