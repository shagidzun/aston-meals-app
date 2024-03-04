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

export interface FavoriteItem {
	meal: string;
	mealId: string;
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
			async (userId: string | null) => {
				const userRef = doc(db, `users/${userId}`);
				const userSnap = await getDoc(userRef);
				if (userSnap.exists()) {
					const favorites: FavoriteItem[] = [];
					const favoriteRef = collection(db, `users/${userId}/favorites`);
					const favoriteSnap = await getDocs(favoriteRef);
					favoriteSnap.forEach(doc => {
						favorites.push(doc.data() as FavoriteItem);
					});
					return favorites;
				}
				return [];
			},
			{
				fulfilled: (state, action) => {
					state.favorites = action.payload;
				},
				rejected: state => {
					//TODO: придумать, что делать с ошибкой
					console.error("Error");
				}
			}
		),
		updateFavorites: create.asyncThunk(
			async ({
				meal,
				mealId,
				userId
			}: {
				meal: string;
				mealId: string;
				userId: string;
			}) => {
				const userRef = doc(db, `users/${userId}`);
				const userSnap = await getDoc(userRef);
				if (userSnap.exists()) {
					const favorites: FavoriteItem[] = [];
					const favoriteItemRef = doc(db, `users/${userId}/favorites/${meal}`);
					const favoriteRef = collection(db, `users/${userId}/favorites`);
					const favoriteItemSnap = await getDoc(favoriteItemRef);
					const favoriteSnap = await getDocs(favoriteRef);
					favoriteSnap.forEach(doc => {
						favorites.push(doc.data() as FavoriteItem);
					});
					if (favoriteItemSnap.exists()) {
						await deleteDoc(favoriteItemRef);
						favorites.filter(
							item => item.meal !== meal && item.mealId !== mealId
						);
					} else {
						//используется as, т.к. третий аргумент setDoc требует именно string
						await setDoc(doc(db, `users/${userId}/favorites`, meal as string), {
							meal,
							mealId
						});
						favorites.push({
							meal,
							mealId
						});
					}
					return favorites;
				}
				return [];
			},
			{
				fulfilled: (state, action) => {
					state.favorites = action.payload;
				},
				rejected: (state, action) => {} //TODO: придумать, что делать с ошибкой
			}
		)
	}),
	selectors: {
		selectFavorites: state => state.favorites
	}
});

export const { getFavorites, updateFavorites } = favoritesSlice.actions;
export const { selectFavorites } = favoritesSlice.selectors;
