import { createListenerMiddleware } from "@reduxjs/toolkit";
import { signOut } from "firebase/auth";
import { getCurrentUser, userSignOut } from "../features/user/userSlice";
import { clearHistory, getHistory } from "../features/history/historySlice";
import {
	clearFavorites,
	getFavorites
} from "../features/favorites/favoritesSlice";
import { auth } from "../firebase/firebase";
import type { AppDispatch, RootState } from "../app/store";

export const listenerMiddleware = createListenerMiddleware();

const startAppListening = listenerMiddleware.startListening.withTypes<
	RootState,
	AppDispatch
>();

startAppListening({
	actionCreator: getCurrentUser,
	effect: (_, { dispatch, getState }) => {
		const state = getState();
		dispatch(getHistory(state.user.id));
		dispatch(getFavorites(state.user.id));
	}
});

startAppListening({
	actionCreator: userSignOut,
	effect: async (_, { dispatch }) => {
		await signOut(auth);
		dispatch(clearHistory());
		dispatch(clearFavorites());
		localStorage.removeItem("currentUser");
	}
});
