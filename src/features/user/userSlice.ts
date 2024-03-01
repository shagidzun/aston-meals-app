import type { PayloadAction } from "@reduxjs/toolkit";
import { createSelector } from "@reduxjs/toolkit";
import { createAppSlice } from "../../app/createAppSlice";

export interface UserSliceState {
	email: string | null;
	token: string | null;
	id: string | null;
}

const initialState: UserSliceState = {
	email: null,
	token: null,
	id: null
};
export const userSlice = createAppSlice({
	name: "user",
	initialState,
	reducers: create => ({
		setUser: (state, action: PayloadAction<UserSliceState>) => {
			state.email = action.payload.email;
			state.token = action.payload.token;
			state.id = action.payload.id;
		},
		removeUser: state => {
			state.email = null;
			state.token = null;
			state.id = null;
		}
	})
});

export const { setUser, removeUser } = userSlice.actions;
