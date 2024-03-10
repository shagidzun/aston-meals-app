import type { AsyncThunk } from "@reduxjs/toolkit";
import type { UserSliceState } from "./user/userSlice";
import type { FavoritesSliceState } from "./favorites/favoritesSlice";
import type { HistorySliceState } from "./history/historySlice";

type ThunksResult = {
	userSignIn: AsyncThunk<
		UserSliceState,
		{ email: string; password: string },
		any
	>;
	userSignUp: AsyncThunk<
		UserSliceState,
		{ email: string; password: string },
		any
	>;
	getFavorites: AsyncThunk<FavoritesSliceState, string | null | undefined, any>;
	updateFavorites: AsyncThunk<
		FavoritesSliceState,
		{
			strMeal: string | null | undefined;
			idMeal: string | null | undefined;
			strMealThumb: string | null | undefined;
			userId: string | null | undefined;
		},
		any
	>;
	getHistory: AsyncThunk<HistorySliceState, string | null, any>;
	updateHistory: AsyncThunk<
		HistorySliceState,
		{ url: string; userId: string | null },
		any
	>;
};

export async function getExports(
	REMOTE_STORE: "ls" | "firebase"
): Promise<ThunksResult> {
	//третий тип у всех в AsyncThunk any, т.к. нужный тип в RTK отсутствует (PreventCircular<AsyncThunkConfig>)
	let userSignIn: AsyncThunk<
		UserSliceState,
		{ email: string; password: string },
		any
	>;
	let userSignUp: AsyncThunk<
		UserSliceState,
		{ email: string; password: string },
		any
	>;
	let getFavorites: AsyncThunk<
		FavoritesSliceState,
		string | null | undefined,
		any
	>;
	let updateFavorites: AsyncThunk<
		FavoritesSliceState,
		{
			strMeal: string | null | undefined;
			idMeal: string | null | undefined;
			strMealThumb: string | null | undefined;
			userId: string | null | undefined;
		},
		any
	>;
	let getHistory: AsyncThunk<HistorySliceState, string | null, any>;
	let updateHistory: AsyncThunk<
		HistorySliceState,
		{ url: string; userId: string | null },
		any
	>;

	const userModulePromise = import("./user/userSlice");
	const favoritesModulePromise = import("./favorites/favoritesSlice");
	const historyModulePromise = import("./history/historySlice");

	if (REMOTE_STORE === "firebase") {
		const userModule = await userModulePromise;
		userSignIn = userModule.userSignIn;
		userSignUp = userModule.userSignUp;

		const favoritesModule = await favoritesModulePromise;
		getFavorites = favoritesModule.getFavorites;
		updateFavorites = favoritesModule.updateFavorites;

		const historyModule = await historyModulePromise;
		getHistory = historyModule.getHistory;
		updateHistory = historyModule.updateHistory;
	} else {
		const userModule = await userModulePromise;
		userSignIn = userModule.userSignInLS;
		userSignUp = userModule.userSignUpLS;

		const favoritesModule = await favoritesModulePromise;
		getFavorites = favoritesModule.getFavoritesLS;
		updateFavorites = favoritesModule.updateFavoritesLS;

		const historyModule = await historyModulePromise;
		getHistory = historyModule.getHistoryLS;
		updateHistory = historyModule.updateHistoryLS;
	}

	return {
		userSignUp,
		userSignIn,
		getFavorites,
		updateFavorites,
		getHistory,
		updateHistory
	};
}

let userSignIn: AsyncThunk<
	UserSliceState,
	{ email: string; password: string },
	any
>;
let userSignUp: AsyncThunk<
	UserSliceState,
	{ email: string; password: string },
	any
>;
let getFavorites: AsyncThunk<
	FavoritesSliceState,
	string | null | undefined,
	any
>;
let updateFavorites: AsyncThunk<
	FavoritesSliceState,
	{
		strMeal: string | null | undefined;
		idMeal: string | null | undefined;
		strMealThumb: string | null | undefined;
		userId: string | null | undefined;
	},
	any
>;
let getHistory: AsyncThunk<HistorySliceState, string | null, any>;
let updateHistory: AsyncThunk<
	HistorySliceState,
	{ url: string; userId: string | null },
	any
>;

if (import.meta.env.VITE_REMOTE_STORE === "firebase") {
	import("./user/userSlice").then(module => {
		userSignIn = module.userSignIn;
		userSignUp = module.userSignUp;
	});
	import("./favorites/favoritesSlice").then(module => {
		getFavorites = module.getFavorites;
		updateFavorites = module.updateFavorites;
	});
	import("./history/historySlice").then(module => {
		getHistory = module.getHistory;
		updateHistory = module.updateHistory;
	});
} else {
	import("./user/userSlice").then(module => {
		userSignIn = module.userSignInLS;
		userSignUp = module.userSignUpLS;
	});
	import("./favorites/favoritesSlice").then(module => {
		getFavorites = module.getFavoritesLS;
		updateFavorites = module.updateFavoritesLS;
	});
	import("./history/historySlice").then(module => {
		getHistory = module.getHistoryLS;
		updateHistory = module.updateHistoryLS;
	});
}

export {
	userSignIn,
	userSignUp,
	getFavorites,
	updateFavorites,
	getHistory,
	updateHistory
};
