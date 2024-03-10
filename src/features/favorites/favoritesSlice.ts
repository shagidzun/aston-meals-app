import {
	collection,
	deleteDoc,
	doc,
	getDoc,
	getDocs,
	setDoc
} from "firebase/firestore";
import type { PayloadAction } from "@reduxjs/toolkit";
import { createAppSlice } from "../../app/createAppSlice";
import { db } from "../../firebase/firebase";
import type { RootState } from "../../app/store";
import { REMOTE_STORE } from "../../remote-config";

export interface FavoriteItem {
	strMeal?: string | null | undefined;
	idMeal?: string | null | undefined;
	strMealThumb?: string | null | undefined;
}

export interface FavoritesSliceState {
	favorites: FavoriteItem[];
	isLoading: boolean;
}

const initialState: FavoritesSliceState = {
	favorites: [],
	isLoading: false
};
export const favoritesSlice = createAppSlice({
	name: "favorites",
	initialState,
	reducers: create => ({
		getFavorites: create.asyncThunk(
			async (
				userId: string | null | undefined,
				{ getState }
			): Promise<FavoritesSliceState> => {
				//здесь as, т.к. не передается тип + так советуют делать создатели в асинк санках
				const state = getState() as RootState;
				let favorites: FavoriteItem[] = state.favorites.favorites;
				const userRef = doc(db, `users/${userId}`);
				try {
					const userSnap = await getDoc(userRef);
					if (userSnap.exists()) {
						const fetchedFavorites: FavoriteItem[] = [];
						const favoriteRef = collection(db, `users/${userId}/favorites`);
						const favoriteSnap = await getDocs(favoriteRef);
						favoriteSnap.forEach(doc => {
							//.data() возращает свой встроенный тип, поэтому тут as
							const fetchedItem = doc.data() as FavoriteItem;
							fetchedFavorites.push(fetchedItem);
						});
						favorites = fetchedFavorites;
					}
					//any т.к. сам ts советует давать any ошибке
				} catch (err: any) {
					console.error(err.message);
				}

				return {
					...state.favorites,
					favorites
				};
			},
			{
				pending: state => {
					state.isLoading = true;
				},
				fulfilled: (state, action) => {
					state.favorites = action.payload.favorites;
					state.isLoading = false;
				},
				rejected: state => {
					state.isLoading = false;
				}
			}
		),
		updateFavorites: create.asyncThunk(
			async (
				{
					strMeal,
					idMeal,
					strMealThumb,
					userId
				}: {
					strMeal: string | null | undefined;
					idMeal: string | null | undefined;
					strMealThumb: string | null | undefined;
					userId: string | null | undefined;
				},
				{ getState }
			): Promise<FavoritesSliceState> => {
				//здесь as, т.к. не передается тип + так советуют делать создатели в асинк санках
				const state = getState() as RootState;
				let favorites: FavoriteItem[] = state.favorites.favorites;
				const userRef = doc(db, `users/${userId}`);
				try {
					const userSnap = await getDoc(userRef);
					if (userSnap.exists()) {
						const favoriteItemRef = doc(
							db,
							`users/${userId}/favorites/${strMeal}`
						);
						const favoriteItemSnap = await getDoc(favoriteItemRef);
						if (favoriteItemSnap.exists()) {
							await deleteDoc(favoriteItemRef);
							favorites = favorites.filter(
								item => item.strMeal !== strMeal && item.idMeal !== idMeal
							);
						} else {
							await setDoc(doc(db, `users/${userId}/favorites/${strMeal}`), {
								strMeal: strMeal,
								idMeal: idMeal,
								strMealThumb: strMealThumb
							});
							favorites = favorites.concat({
								strMeal: strMeal,
								idMeal: idMeal,
								strMealThumb: strMealThumb
							});
						}
					}
					//any т.к. сам ts советует давать any ошибке
				} catch (err: any) {
					console.error(err.message);
				}

				return {
					...state.favorites,
					favorites
				};
			},
			{
				fulfilled: (state, action) => {
					state.favorites = action.payload.favorites;
				}
			}
		),
		clearFavorites: create.reducer(state => {
			state.favorites = [];
		}),
		getFavoritesLS: create.asyncThunk(
			(userId): FavoritesSliceState => {
				let favorites: FavoriteItem[] = initialState.favorites;
				const userStr = localStorage.getItem(`${userId}`);
				if (userStr) {
					const favoritesLS: FavoriteItem[] = JSON.parse(userStr).favorites;
					favorites = favoritesLS ? favoritesLS : favorites;
				}
				return { ...initialState, favorites };
			},
			{
				fulfilled: (state, action) => {
					state.favorites = action.payload.favorites;
				}
			}
		),
		updateFavoritesLS: create.asyncThunk(
			(
				{
					strMeal,
					idMeal,
					strMealThumb,
					userId
				}: {
					strMeal: string | null | undefined;
					idMeal: string | null | undefined;
					strMealThumb: string | null | undefined;
					userId: string | null | undefined;
				},
				{ getState }
			): { favorites: FavoriteItem[]; isLoading: boolean } => {
				//здесь as, т.к. не передается тип + так советуют делать создатели в асинк санках
				const state = getState() as RootState;
				let favorites: FavoriteItem[] = state.favorites.favorites;
				const userStr = localStorage.getItem(`${userId}`);
				const userLS = JSON.parse(userStr ? userStr : "");
				if (userStr) {
					const favoritesLS: FavoriteItem[] = userLS.favorites;
					if (
						favoritesLS &&
						favoritesLS.some(
							item => item.idMeal === idMeal && item.strMeal === strMeal
						)
					) {
						favorites = favoritesLS.filter(
							item => item.idMeal !== idMeal && item.strMeal !== strMeal
						);
					} else if (favoritesLS) {
						favorites = favoritesLS.concat({
							strMeal: strMeal,
							idMeal: idMeal,
							strMealThumb: strMealThumb
						});
					} else {
						localStorage.setItem(
							`${userId}`,
							JSON.stringify({
								...userLS,
								favorites: [{ strMeal, idMeal, strMealThumb }],
								history: state.history.history
							})
						);
					}
				}
				localStorage.setItem(
					`${userId}`,
					JSON.stringify({
						...userLS,
						favorites,
						history: state.history.history
					})
				);
				return {
					...state.favorites,
					favorites
				};
			},
			{
				fulfilled: (state, action) => {
					state.favorites = action.payload.favorites;
				}
			}
		)
	}),
	selectors: {
		selectFavorites: state => state.favorites,
		selectFavIsLoading: state => state.isLoading
	}
});

export const {
	getFavorites,
	updateFavorites,
	getFavoritesLS,
	updateFavoritesLS,
	clearFavorites
} = favoritesSlice.actions;
export const { selectFavorites, selectFavIsLoading } = favoritesSlice.selectors;
