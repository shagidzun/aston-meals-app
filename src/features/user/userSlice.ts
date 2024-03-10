import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import type { PayloadAction } from "@reduxjs/toolkit";
import { nanoid } from "@reduxjs/toolkit";
import { createAppSlice } from "../../app/createAppSlice";
import { auth } from "../../firebase/firebase";
import { db } from "../../firebase/firebase";
import type { AppDispatch } from "../../app/store";
import { getFavorites } from "../actions-exports";
import { getHistory } from "../actions-exports";
import { parseLSItem } from "../../utils/parseLSItem";
import { REMOTE_STORE } from "../../remote-config";

export interface UserSliceState {
	isLoading: boolean;
	isAuth: boolean;
	email: string | null;
	id: string | null;
	error?: string;
}

const initialState: UserSliceState = {
	isLoading: true,
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
				let userState: UserSliceState;
				if (REMOTE_STORE === "firebase") {
					try {
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
						userState = {
							...initialState,
							isLoading: false,
							isAuth: true,
							email: user.email,
							id: user.uid
						};
						//any т.к. сам ts советует давать any ошибке
					} catch (err: any) {
						userState = {
							...initialState,
							error: err.message
						};
					}
				} else {
					for (let itemStr in localStorage) {
						const storageItem = localStorage.getItem(itemStr);
						const parsedItem = parseLSItem(storageItem);
						if (parsedItem && parsedItem.credentials.email === email) {
							return {
								...initialState,
								error: "Account already exists"
							};
						}
					}
					const id = nanoid();
					localStorage.setItem(
						id,
						JSON.stringify({
							credentials: {
								email,
								password
							},
							history: [],
							favorites: []
						})
					);
					localStorage.setItem("currentUser", JSON.stringify({ email, id }));
					userState = {
						...initialState,
						isLoading: false,
						isAuth: true,
						email,
						id
					};
				}
				return userState;
			},
			{
				pending: state => {
					state.isLoading = true;
				},
				fulfilled: (state, action) => {
					state.isLoading = false;
					state.isAuth = action.payload.isAuth;
					state.email = action.payload.email;
					state.id = action.payload.id;
					state.error = action.payload.error;
				},
				rejected: state => {
					state.isLoading = false;
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
				let userState: UserSliceState = initialState;
				//здесь as, т.к. не передается тип + так советуют делать создатели в асинк санках
				const dispatch = thunkAPI.dispatch as AppDispatch;
				if (REMOTE_STORE === "firebase") {
					try {
						const userCredential = await signInWithEmailAndPassword(
							auth,
							email,
							password
						);
						//здесь as, т.к. в доке есть такая рекомендация при создании санков через create.asyncThunk
						//подробнее тут: https://redux-toolkit.js.org/usage/usage-with-typescript#typing-async-thunks-inside-createslice
						const user = userCredential.user;
						dispatch(getFavorites(user.uid));
						dispatch(getHistory(user.uid));
						userState = {
							...initialState,
							isLoading: false,
							isAuth: true,
							email: user.email,
							id: user.uid
						};
						//any т.к. сам ts советует давать any ошибке
					} catch (err: any) {
						userState = {
							...initialState,
							error: err.message
						};
					}
				} else {
					let isMatched: boolean = false;
					for (let itemStr in localStorage) {
						const storageItem = localStorage.getItem(itemStr);
						const parsedItem = parseLSItem(storageItem);
						if (
							parsedItem &&
							Object.prototype.hasOwnProperty.call(parsedItem, "credentials") &&
							parsedItem.credentials.email === email &&
							parsedItem.credentials.password === password
						) {
							localStorage.setItem(
								"currentUser",
								JSON.stringify({ email, id: itemStr })
							);
							userState = {
								...initialState,
								isLoading: false,
								isAuth: true,
								email,
								id: itemStr
							};
							isMatched = true;
							break;
						}
					}
					if (!isMatched) {
						userState = {
							...initialState,
							error: "Wrong email or password"
						};
					}
				}
				return userState;
			},
			{
				pending: state => {
					state.isLoading = true;
				},
				fulfilled: (state, action) => {
					state.isLoading = false;
					state.isAuth = action.payload.isAuth;
					state.email = action.payload.email;
					state.id = action.payload.id;
					state.error = action.payload.error;
				},
				rejected: state => {
					state.isLoading = false;
				}
			}
		),
		userSignOut: create.reducer(state => {
			state.isAuth = false;
			state.email = null;
			state.id = null;
		}),
		getCurrentUser: create.preparedReducer(
			(email: string | null, id: string) => {
				return {
					payload: { isLoading: false, isAuth: true, email, id }
				};
			},
			(state, action: PayloadAction<UserSliceState>) => {
				state.isLoading = action.payload.isLoading;
				state.isAuth = action.payload.isAuth;
				state.email = action.payload.email;
				state.id = action.payload.id;
			}
		),
		setLoadingOff: create.reducer(state => {
			state.isLoading = false;
		}),
		userSignInLS: create.asyncThunk(
			({
				email,
				password
			}: {
				email: string;
				password: string;
			}): UserSliceState => {
				let userState: UserSliceState = initialState;
				let isMatched: boolean = false;
				for (let itemStr in localStorage) {
					const storageItem = localStorage.getItem(itemStr);
					const parsedItem = parseLSItem(storageItem);
					if (
						parsedItem &&
						Object.prototype.hasOwnProperty.call(parsedItem, "credentials") &&
						parsedItem.credentials.email === email &&
						parsedItem.credentials.password === password
					) {
						localStorage.setItem(
							"currentUser",
							JSON.stringify({ email, id: itemStr })
						);
						userState = {
							...initialState,
							isLoading: false,
							isAuth: true,
							email,
							id: itemStr
						};
						isMatched = true;
						break;
					}
				}
				if (!isMatched) {
					userState = {
						...initialState,
						error: "Wrong email or password"
					};
				}
				return userState;
			},
			{
				fulfilled: (state, action) => {
					state.isLoading = false;
					state.isAuth = action.payload.isAuth;
					state.email = action.payload.email;
					state.id = action.payload.id;
					state.error = action.payload.error;
				}
			}
		),
		userSignUpLS: create.asyncThunk(
			({
				email,
				password
			}: {
				email: string;
				password: string;
			}): UserSliceState => {
				let userState: UserSliceState;
				for (let itemStr in localStorage) {
					const storageItem = localStorage.getItem(itemStr);
					const parsedItem = parseLSItem(storageItem);
					if (parsedItem && parsedItem.credentials.email === email) {
						return {
							...initialState,
							error: "Account already exists"
						};
					}
				}
				const id = nanoid();
				localStorage.setItem(
					id,
					JSON.stringify({
						credentials: {
							email,
							password
						},
						history: [],
						favorites: []
					})
				);
				localStorage.setItem("currentUser", JSON.stringify({ email, id }));
				userState = {
					...initialState,
					isLoading: false,
					isAuth: true,
					email,
					id
				};
				return userState;
			},
			{
				fulfilled: (state, action) => {
					state.isLoading = false;
					state.isAuth = action.payload.isAuth;
					state.email = action.payload.email;
					state.id = action.payload.id;
					state.error = action.payload.error;
				}
			}
		)
	}),
	selectors: {
		selectIsAuth: user => user.isAuth,
		selectId: user => user.id,
		selectEmail: user => user.email,
		selectIsLoading: user => user.isLoading,
		selectError: user => user.error
	}
});

export const {
	userSignUp,
	userSignIn,
	userSignOut,
	userSignInLS,
	userSignUpLS,
	getCurrentUser,
	setLoadingOff
} = userSlice.actions;
export const {
	selectError,
	selectIsLoading,
	selectIsAuth,
	selectId,
	selectEmail
} = userSlice.selectors;
