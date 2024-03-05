import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { createAppSlice } from "../../app/createAppSlice";
import { auth } from "../../firebase/firebase";
import { db } from "../../firebase/firebase";
import type { AppDispatch } from "../../app/store";
import { getFavorites } from "../favorites/favoritesSlice";
import { getHistory } from "../history/historySlice";

export interface UserSliceState {
	isAuth: boolean;
	email: string | null;
	id: string | null;
}

const initialState: UserSliceState = {
	isAuth: false,
	email: null,
	id: null
};
export const userSlice = createAppSlice({
	name: "user",
	initialState,
	reducers: create => ({
		userSignUp: create.asyncThunk(
			async ({
				email,
				password
			}: {
				email: string;
				password: string;
			}): Promise<UserSliceState> => {
				const userCredential = await createUserWithEmailAndPassword(
					auth,
					email,
					password
				);
				const user = userCredential.user;
				const userRef = doc(db, "users", user.uid);
				await setDoc(userRef, {
					email: user.email,
					id: user.uid
				});
				return {
					isAuth: true,
					email: user.email,
					id: user.uid
				};
			},
			{
				fulfilled: (state, action) => {
					state.isAuth = action.payload.isAuth;
					state.email = action.payload.email;
					state.id = action.payload.id;
				}
			}
		),
		userSignIn: create.asyncThunk(
			async (
				{
					email,
					password
				}: {
					email: string;
					password: string;
				},
				thunkAPI
			): Promise<UserSliceState> => {
				const userCredential = await signInWithEmailAndPassword(
					auth,
					email,
					password
				);
				//здесь as, т.к. в доке есть такая рекомендация при создании санков через create.asyncThunk
				//подробнее тут: https://redux-toolkit.js.org/usage/usage-with-typescript#typing-async-thunks-inside-createslice
				const dispatch = thunkAPI.dispatch as AppDispatch;
				const user = userCredential.user;
				dispatch(getFavorites(user.uid));
				dispatch(getHistory(user.uid));
				return {
					isAuth: true,
					email: user.email,
					id: user.uid
				};
			},
			{
				fulfilled: (state, action) => {
					state.isAuth = action.payload.isAuth;
					state.email = action.payload.email;
					state.id = action.payload.id;
				}
			}
		),
		userSignOut: create.reducer(state => {
			state.isAuth = false;
			state.email = null;
			state.id = null;
		})
	}),
	selectors: {
		selectIsAuth: user => user.isAuth,
		selectId: user => user.id,
		selectEmail: user => user.email
	}
});

export const { userSignUp, userSignIn, userSignOut } = userSlice.actions;
export const { selectIsAuth, selectId, selectEmail } = userSlice.selectors;
