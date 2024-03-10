import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/firebase";
import type { AppDispatch } from "../app/store";
import { store } from "../app/store";
import { getCurrentUser, setLoadingOff } from "../features/user/userSlice";

interface CurrentUser {
	email: string;
	id: string;
}

/*Решил создать отдельную функцию для получения текущего юзера в зависимости от переменной окружения
и прокидывать её в App*/
export const initializeAuth = (): void => {
	const dispatch: AppDispatch = store.dispatch;
	if (import.meta.env.VITE_REMOTE_STORE === "firebase") {
		onAuthStateChanged(auth, user => {
			if (user) {
				dispatch(getCurrentUser(user.email, user.uid));
			}
			dispatch(setLoadingOff());
		});
	} else {
		const userLS = localStorage.getItem("currentUser");
		if (userLS) {
			const parsedUser: CurrentUser = JSON.parse(userLS);
			dispatch(getCurrentUser(parsedUser.email, parsedUser.id));
		}
		dispatch(setLoadingOff());
	}
};
