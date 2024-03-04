import { combineSlices, configureStore } from "@reduxjs/toolkit";
import { mealsApi } from "../services/mealsApi";
import { userSlice } from "../features/user/userSlice";
import { historySlice } from "../features/history/historySlice";
import { favoritesSlice } from "../features/favorites/favoritesSlice";

const rootReducer = combineSlices(
	mealsApi,
	userSlice,
	historySlice,
	favoritesSlice
);

export type RootState = ReturnType<typeof rootReducer>;

export const store = configureStore({
	reducer: rootReducer,
	middleware: getDefaultMiddleware => {
		return getDefaultMiddleware().concat(mealsApi.middleware);
	}
});

export type AppStore = typeof store;
export type AppDispatch = AppStore["dispatch"];
