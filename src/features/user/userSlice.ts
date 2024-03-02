import type { PayloadAction } from "@reduxjs/toolkit";
import { createAppSlice } from "../../app/createAppSlice";

export interface UserSliceState {
	isAuth: boolean;
	email: string | null;
	token: string | null;
	id: string | null;
}

const initialState: UserSliceState = {
	isAuth: false,
	email: null,
	token: null,
	id: null
};
export const userSlice = createAppSlice({
	name: "user",
	initialState,
	reducers: create => ({
		setUser: create.preparedReducer(
			(email: string | null, token: string, id: string) => {
				return {
					payload: { isAuth: true, email, token, id }
				};
			},
			(state, action: PayloadAction<UserSliceState>) => {
				state.isAuth = action.payload.isAuth;
				state.email = action.payload.email;
				state.token = action.payload.token;
				state.id = action.payload.id;
			}
		),
		removeUser: create.reducer(state => {
			state.isAuth = false;
			state.email = null;
			state.token = null;
			state.id = null;
		})
	}),
	selectors: {
		selectIsAuth: user => user.isAuth
	}
});

export const { setUser, removeUser } = userSlice.actions;
export const { selectIsAuth } = userSlice.selectors;
