import { doc, getDoc, updateDoc } from "firebase/firestore";
import { createAppSlice } from "../../app/createAppSlice";
import { db } from "../../firebase/firebase";
import type { RootState } from "../../app/store";

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
			async (
				{
					url,
					userId
				}: {
					url: string;
					userId: string | null;
				},
				{ getState }
			): Promise<HistorySliceState> => {
				const state = getState() as RootState;
				const history = state.history.history;
				const userRef = doc(db, `users/${userId}`);
				try {
					const userSnap = await getDoc(userRef);
					if (userSnap.exists()) {
						if (userSnap.data().history) {
							const fetchedHistory = userSnap.data().history;
							fetchedHistory.push(url);
							await updateDoc(userRef, {
								history: fetchedHistory
							});
							return { history: fetchedHistory };
						}
						await updateDoc(userRef, {
							history: [url]
						});
						return { history: [url] };
					}
					//any т.к. сам ts советует давать any ошибке
				} catch (err: any) {
					console.error(err.message);
				}

				return {
					history
				};
			},
			{
				fulfilled: (state, action) => {
					state.history = action.payload.history;
				}
			}
		),
		getHistory: create.asyncThunk(
			async (
				userId: string | null,
				{ getState }
			): Promise<HistorySliceState> => {
				const state = getState() as RootState;
				const history = state.history.history;
				const userRef = doc(db, `users/${userId}`);
				try {
					const userSnap = await getDoc(userRef);
					if (userSnap.exists()) {
						return { history: userSnap.data().history };
					}
					//any т.к. сам ts советует давать any ошибке
				} catch (err: any) {
					console.error(err.message);
				}
				return {
					history
				};
			},
			{
				fulfilled: (state, action) => {
					state.history = action.payload.history;
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
