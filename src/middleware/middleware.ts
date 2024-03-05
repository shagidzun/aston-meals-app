import { createListenerMiddleware } from "@reduxjs/toolkit";
import { signOut } from "firebase/auth";
import { getCurrentUser, userSignOut } from "../features/user/userSlice";
import { clearHistory, getHistory } from "../features/history/historySlice";
import {
	clearFavorites,
	getFavorites
} from "../features/favorites/favoritesSlice";
import { auth } from "../firebase/firebase";
import type { RootState } from "../app/store";

export const listenerMiddleware = createListenerMiddleware();

listenerMiddleware.startListening({
	actionCreator: getCurrentUser,
	effect: (_, { dispatch, getState }) => {
		//используется as т.к. тип не передается автоматически
		const state = getState() as RootState;
		dispatch(getHistory(state.user.id));
		dispatch(getFavorites(state.user.id));
	}
});

listenerMiddleware.startListening({
	actionCreator: userSignOut,
	effect: async (_, api) => {
		const dispatch = api.dispatch;
		await signOut(auth);
		dispatch(clearHistory());
		dispatch(clearFavorites());
	}
});
