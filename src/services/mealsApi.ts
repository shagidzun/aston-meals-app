import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Category, Meal, MealFull } from "../types/apiTypes";

export const mealsApi = createApi({
	baseQuery: fetchBaseQuery({
		baseUrl: "https://themealdb.com/api/json/v1/1/"
	}),
	reducerPath: "mealsApi",
	endpoints: build => ({
		getMealsCategories: build.query<Category[], void>({
			query: () => "categories.php",
			transformResponse: (response: { categories: Category[] }) =>
				response.categories
		}),
		getMealsByCategory: build.query<Meal[], string | null | undefined>({
			query: category => `filter.php?c=${category}`,
			transformResponse: (response: { meals: Meal[] }) => response.meals
		}),
		getMealById: build.query<Partial<MealFull>[], string | null | undefined>({
			query: id => `/lookup.php?i=${id}`,
			transformResponse: (response: { meals: Partial<MealFull>[] }) =>
				response.meals
		}),
		getMealByName: build.query<Partial<MealFull>[], string | null | undefined>({
			query: name => `/search.php?s=${name}`,
			transformResponse: (response: { meals: Partial<MealFull>[] }) =>
				response.meals
		})
	})
});

export const {
	useGetMealsCategoriesQuery,
	useGetMealsByCategoryQuery,
	useGetMealByIdQuery,
	useGetMealByNameQuery
} = mealsApi;
