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
					url: string | null;
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
						const fetchedHistory = userSnap.data().history;
						fetchedHistory.push(url);
						updateDoc(userRef, {
							history: fetchedHistory
						});
						return { history: fetchedHistory };
					}
				} catch (err) {
					console.error(err);
				}

				return {
					history
				};
			},
			{
				fulfilled: (state, action) => {
					state.history = action.payload.history;
				},
				rejected: (state, action) => {} //TODO: придумать, что делать с ошибкой
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
				} catch (err) {
					console.error(err);
				}
				return {
					history
				};
			},
			{
				fulfilled: (state, action) => {
					console.log(action.payload.history);
					state.history = action.payload.history;
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
