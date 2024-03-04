import { doc, getDoc, updateDoc } from "firebase/firestore";
import { createAppSlice } from "../../app/createAppSlice";
import { db } from "../../firebase/firebase";

interface HistorySliceState {
	history: string[];
}

const initialState: HistorySliceState = {
	history: []
};
export const historySlice = createAppSlice({
	name: "history",
	initialState,
	reducers: create => ({
		updateHistory: create.asyncThunk(
			async ({
				url,
				userId
			}: {
				url: string | null;
				userId: string | null;
			}) => {
				const userRef = doc(db, `users/${userId}`);
				const userSnap = await getDoc(userRef);
				if (userSnap.exists()) {
					const history = userSnap.data().history;
					history.push(url);
					await updateDoc(userRef, {
						history: history
					});
					return history;
				}
				return [];
			},
			{
				fulfilled: (state, action) => {
					state.history = action.payload;
				},
				rejected: (state, action) => {} //TODO: придумать, что делать с ошибкой
			}
		),
		getHistory: create.asyncThunk(
			async (userId: string | null) => {
				const userRef = doc(db, `users/${userId}`);
				const userSnap = await getDoc(userRef);
				if (userSnap.exists()) {
					return userSnap.data().history;
				}
				return [];
			},
			{
				fulfilled: (state, action) => {
					state.history = action.payload;
				},
				rejected: state => {
					//TODO: придумать, что делать с ошибкой
					console.error("Error");
				}
			}
		),
		clearHistory: create.reducer(state => {
			state.history = [];
		})
	}),
	selectors: {
		selectHistory: state => state.history
	}
});

export const { updateHistory, getHistory, clearHistory } = historySlice.actions;
export const { selectHistory } = historySlice.selectors;
