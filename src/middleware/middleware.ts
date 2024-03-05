import { createListenerMiddleware } from "@reduxjs/toolkit";
import { clearFavorites } from "../features/favorites/favoritesSlice";
import { removeUser } from "../features/user/userSlice";

export const listenerMiddleware = createListenerMiddleware();

listenerMiddleware.startListening({
	actionCreator: removeUser,
	effect: (action, api) => {
		console.log("actionCreator", action);
	}
});
