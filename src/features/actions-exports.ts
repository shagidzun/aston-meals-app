import type { AsyncThunk } from "@reduxjs/toolkit";
import type { UserSliceState } from "./user/userSlice";
import type { FavoritesSliceState } from "./favorites/favoritesSlice";
import type { HistorySliceState } from "./history/historySlice";

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
