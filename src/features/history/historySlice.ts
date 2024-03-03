import { doc, getDoc, updateDoc } from "firebase/firestore";
import { createAppSlice } from "../../app/createAppSlice";
import { db } from "../../firebase/firebase";

export const historySlice = createAppSlice({
	name: "history",
	initialState: [],
	reducers: create => ({
		updateHistory: create.asyncThunk(
			async ({ q, userId }: { q: string; userId: string }) => {
				const userRef = doc(db, `users/${userId}`);
				const userSnap = await getDoc(userRef);
				if (userSnap.exists()) {
					const history = userSnap.data().history;
					history.push(q);
					await updateDoc(userRef, {
						history: history
					});
					return history;
				}
				return [];
			},
			{
				fulfilled: (state, action) => {
					state = action.payload;
				}
			}
		),
		getHistory: create.asyncThunk(
			async (userId: string) => {
				const userRef = doc(db, `users/${userId}`);
				const userSnap = await getDoc(userRef);
				if (userSnap.exists()) {
					return userSnap.data().history;
				}
			},
			{
				fulfilled: (state, action) => {
					state = action.payload;
				}
			}
		)
	}),
	selectors: {
		selectHistory: state => state
	}
});

export const { updateHistory } = historySlice.actions;
export const { selectHistory } = historySlice.selectors;
