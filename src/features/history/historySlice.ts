import { doc, getDoc, updateDoc } from "firebase/firestore";
import { createAppSlice } from "../../app/createAppSlice";
import { db } from "../../firebase/firebase";
import type { RootState } from "../../app/store";

interface HistorySliceState {
	history: string[];
	isLoading: boolean;
}

const initialState: HistorySliceState = {
	history: [],
	isLoading: false
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
				//здесь as, т.к. не передается тип + так советуют делать создатели в асинк санках
				const state = getState() as RootState;
				let history = state.history.history;
				const userRef = doc(db, `users/${userId}`);
				if (state.user.mode === "firebase") {
					try {
						const userSnap = await getDoc(userRef);
						if (userSnap.exists()) {
							if (userSnap.data().history) {
								const fetchedHistory = userSnap.data().history;
								fetchedHistory.push(url);
								await updateDoc(userRef, {
									history: fetchedHistory
								});
								history = fetchedHistory;
							} else {
								await updateDoc(userRef, {
									history: [url]
								});
								history = [url];
							}
						}
						//any т.к. сам ts советует давать any ошибке
					} catch (err: any) {
						console.error(err.message);
					}
				} else {
					const userStr = localStorage.getItem(`${userId}`);
					const userLS = JSON.parse(userStr ? userStr : "");
					if (userStr) {
						const historyLS: string[] = userLS.history;
						history = historyLS ? historyLS.concat(url) : [url];
					}
					localStorage.setItem(
						`${userId}`,
						JSON.stringify({
							...userLS,
							history,
							favorites: state.favorites.favorites
						})
					);
				}

				return { ...state.history, history };
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
				//здесь as, т.к. не передается тип + так советуют делать создатели в асинк санках
				const state = getState() as RootState;
				let history = state.history.history;
				const userRef = doc(db, `users/${userId}`);
				if (state.user.mode === "firebase") {
					try {
						const userSnap = await getDoc(userRef);
						if (userSnap.exists()) {
							return { ...state.history, history: userSnap.data().history };
						}
						//any т.к. сам ts советует давать any ошибке
					} catch (err: any) {
						console.error(err.message);
					}
				} else {
					const userStr = localStorage.getItem(`${userId}`);
					if (userStr) {
						const historyLS: string[] = JSON.parse(userStr).history;
						history = historyLS ? historyLS : history;
					}
				}
				return { ...state.history, history };
			},
			{
				pending: state => {
					state.isLoading = true;
				},
				fulfilled: (state, action) => {
					state.history = action.payload.history;
					state.isLoading = false;
				},
				rejected: state => {
					state.isLoading = false;
				}
			}
		),
		clearHistory: create.reducer(state => {
			state.history = [];
		})
	}),
	selectors: {
		selectHistory: state => state.history,
		selectHistoryIsLoading: state => state.isLoading
	}
});

export const { updateHistory, getHistory, clearHistory } = historySlice.actions;
export const { selectHistory, selectHistoryIsLoading } = historySlice.selectors;
