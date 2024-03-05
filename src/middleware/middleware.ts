import { createListenerMiddleware } from "@reduxjs/toolkit";
import { signOut } from "firebase/auth";
import { userSignOut } from "../features/user/userSlice";
import { clearHistory } from "../features/history/historySlice";
import { clearFavorites } from "../features/favorites/favoritesSlice";
import { auth } from "../firebase/firebase";

export const listenerMiddleware = createListenerMiddleware();
/*На мой взгляд было бы лучше сделать это через create.asyncThunk,
как было сделано в редьюсере userSignIn в userSlice.
Но сделал кастомную мидлвару, чтобы закрыть соответствующее требование*/
listenerMiddleware.startListening({
	actionCreator: userSignOut,
	effect: async (action, api) => {
		const dispatch = api.dispatch;
		await signOut(auth);
		dispatch(clearHistory());
		dispatch(clearFavorites());
	}
});
