import {
	collection,
	deleteDoc,
	doc,
	getDoc,
	getDocs,
	setDoc
} from "firebase/firestore";
import { createAppSlice } from "../../app/createAppSlice";
import { db } from "../../firebase/firebase";
import type { RootState } from "../../app/store";

export interface FavoriteItem {
	strMeal: string | null;
	idMeal: string | null;
	strMealThumb: string | null;
}

interface FavoritesSliceState {
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
				const state = getState() as RootState;
				let favorites: FavoriteItem[] = state.favorites.favorites;
				const userRef = doc(db, `users/${userId}`);
				if (import.meta.env.VITE_REMOTE_STORE === "firebase") {
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
				} else {
					const userStr = localStorage.getItem(`${userId}`);
					if (userStr) {
						const favoritesLS = JSON.parse(userStr).favorites as FavoriteItem[];
						favorites = favoritesLS ? favoritesLS : favorites;
					} else {
						localStorage.setItem(
							`${userId}`,
							JSON.stringify({
								favorites,
								history: state.history.history
							})
						);
					}
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
					strMeal: string | null;
					idMeal: string | null;
					strMealThumb: string | null;
					userId: string | null;
				},
				{ getState }
			): Promise<FavoritesSliceState> => {
				const state = getState() as RootState;
				let favorites: FavoriteItem[] = state.favorites.favorites;
				const userRef = doc(db, `users/${userId}`);
				if (import.meta.env.VITE_REMOTE_STORE === "firebase") {
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
				} else {
					const userStr = localStorage.getItem(`${userId}`);
					if (userStr) {
						const favoritesLS = JSON.parse(userStr).favorites as FavoriteItem[];
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
									favorites: [{ strMeal, idMeal, strMealThumb }],
									history: state.history.history
								})
							);
						}
					}
					localStorage.setItem(
						`${userId}`,
						JSON.stringify({
							favorites,
							history: state.history.history
						})
					);
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
		})
	}),
	selectors: {
		selectFavorites: state => state.favorites,
		selectFavIsLoading: state => state.isLoading
	}
});

export const { getFavorites, updateFavorites, clearFavorites } =
	favoritesSlice.actions;
export const { selectFavorites, selectFavIsLoading } = favoritesSlice.selectors;
