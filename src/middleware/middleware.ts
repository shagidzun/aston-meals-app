import { createListenerMiddleware } from "@reduxjs/toolkit";
import { signOut } from "firebase/auth";
import { userSignOut } from "../features/user/userSlice";
import { clearHistory } from "../features/history/historySlice";
import { clearFavorites } from "../features/favorites/favoritesSlice";
import { auth } from "../firebase/firebase";

export const listenerMiddleware = createListenerMiddleware();

listenerMiddleware.startListening({
	actionCreator: userSignOut,
	effect: async (action, api) => {
		const dispatch = api.dispatch;
		await signOut(auth);
		dispatch(clearHistory());
		dispatch(clearFavorites());
	}
});
