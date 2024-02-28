import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type {
	MealsApiFullMealResponse,
	MealsApiResponse,
	MealsApiResponseCategories
} from "../types/apiTypes";

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
		}),
		getMealById: build.query<MealsApiFullMealResponse, string | undefined>({
			query: id => `/lookup.php?i=${id}`
		})
	})
});

export const {
	useGetMealsCategoriesQuery,
	useGetMealsByCategoryQuery,
	useGetMealByIdQuery
} = mealsApi;
