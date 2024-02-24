import { combineSlices, configureStore } from "@reduxjs/toolkit";

const rootReducer = combineSlices();

export type RootState = ReturnType<typeof rootReducer>

export const store = configureStore({
	reducer: rootReducer,
	middleware: getDefaultMiddleware => {
		return getDefaultMiddleware().concat();
	}
});

export type AppStore = typeof store
export type AppDispatch = AppStore["dispatch"]