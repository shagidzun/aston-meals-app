import { doc, getDoc, updateDoc } from "firebase/firestore";
import { createAppSlice } from "../../app/createAppSlice";
import { db } from "../../firebase/firebase";
import { removeDuplicates } from "../../utils/removeDuplicates";

interface FavoritesSliceState {
	favorites: string[];
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
					return removeDuplicates(userSnap.data().favorites);
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
			async ({ meal, userId }: { meal: string; userId: string | null }) => {
				const userRef = doc(db, `users/${userId}`);
				const userSnap = await getDoc(userRef);
				if (userSnap.exists()) {
					let favorites: string[] = userSnap.data().favorites;
					if (favorites.includes(meal)) {
						favorites = favorites.filter(fav => fav !== meal);
					} else {
						favorites.push(meal);
					}
					removeDuplicates(favorites);
					await updateDoc(userRef, {
						meal: favorites
					});
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
