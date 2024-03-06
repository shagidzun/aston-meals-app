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
	meal: string | null;
	mealId: string | null;
}

interface FavoritesSliceState {
	favorites: FavoriteItem[];
}

const initialState: FavoritesSliceState = {
	favorites: []
};
export const favoritesSlice = createAppSlice({
	name: "favorites",
	initialState,
	reducers: create => ({
		getFavorites: create.asyncThunk(
			async (
				userId: string | null,
				{ getState }
			): Promise<FavoritesSliceState> => {
				const state = getState() as RootState;
				let favorites: FavoriteItem[] = state.favorites.favorites;
				const userRef = doc(db, `users/${userId}`);
				try {
					const userSnap = await getDoc(userRef);
					if (userSnap.exists()) {
						const favoriteRef = collection(db, `users/${userId}/favorites`);
						const favoriteSnap = await getDocs(favoriteRef);
						favoriteSnap.forEach(doc => {
							//.data() возращает свой встроенный тип, поэтому тут as
							favorites = favorites.concat(doc.data() as FavoriteItem);
						});
						return {
							favorites
						};
					}
					return {
						favorites: []
					};
				} catch (err) {
					console.error(err);
				}
				return {
					favorites
				};
			},
			{
				fulfilled: (state, action) => {
					state.favorites = action.payload.favorites;
				},
				rejected: state => {
					//TODO: придумать, что делать с ошибкой
					console.error("Error");
				}
			}
		),
		updateFavorites: create.asyncThunk(
			async (
				{
					meal,
					mealId,
					userId
				}: {
					meal: string | null;
					mealId: string | null;
					userId: string | null;
				},
				{ getState }
			): Promise<FavoritesSliceState> => {
				const state = getState() as RootState;
				let favorites: FavoriteItem[] = state.favorites.favorites;
				const userRef = doc(db, `users/${userId}`);
				try {
					const userSnap = await getDoc(userRef);
					if (userSnap.exists()) {
						const favoriteItemRef = doc(
							db,
							`users/${userId}/favorites/${meal}`
						);
						const favoriteRef = collection(db, `users/${userId}/favorites`);
						const favoriteItemSnap = await getDoc(favoriteItemRef);
						//const favoriteSnap = await getDocs(favoriteRef);
						// favoriteSnap.forEach(doc => {
						// 	//.data() возращает свой встроенный тип, поэтому тут as
						// 	[...favorites].push(doc.data() as FavoriteItem);
						// });
						if (favoriteItemSnap.exists()) {
							await deleteDoc(favoriteItemRef);
							favorites = favorites.filter(
								item => item.meal !== meal && item.mealId !== mealId
							);
						} else {
							//используется as, т.к. третий аргумент setDoc требует именно string
							await setDoc(
								doc(db, `users/${userId}/favorites`, meal as string),
								{
									meal,
									mealId
								}
							);
							favorites = favorites.concat({
								meal,
								mealId
							});
						}
						return { favorites };
					}
				} catch (err) {
					console.error(err);
				}
				return {
					favorites
				};
			},
			{
				fulfilled: (state, action) => {
					state.favorites = action.payload.favorites;
				},
				rejected: (state, action) => {} //TODO: придумать, что делать с ошибкой
			}
		),
		clearFavorites: create.reducer(state => {
			state.favorites = [];
		})
	}),
	selectors: {
		selectFavorites: state => state.favorites
	}
});

export const { getFavorites, updateFavorites, clearFavorites } =
	favoritesSlice.actions;
export const { selectFavorites } = favoritesSlice.selectors;
