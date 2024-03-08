// This file serves as a central hub for re-exporting pre-typed Redux hooks.
// These imports are restricted elsewhere to ensure consistent
// usage of typed hooks throughout the application.
// We disable the ESLint rule here because this is the designated place
// for importing and re-exporting the typed versions of hooks.
/* eslint-disable @typescript-eslint/no-restricted-imports */
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import type { AsyncThunk } from "@reduxjs/toolkit";
import { selectIsAuth } from "../features/user/userSlice";
import type { AppDispatch, RootState } from "./store";

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();

export const useDebounce = <T>(value: T, delay: number): T => {
	const [debouncedValue, setDebouncedValue] = useState<T>(value);

	useEffect(() => {
		const timoutId = setTimeout(() => {
			setDebouncedValue(value);
		}, delay);

		return () => {
			clearTimeout(timoutId);
		};
	}, [value, delay]);

	return debouncedValue;
};

export const useGetData = <T>(
	arg: string | null,
	action: AsyncThunk<T, any, any> //взять нужные типы не получилось, поэтому any
): void => {
	const dispatch = useAppDispatch();
	const isAuth = useAppSelector(selectIsAuth);
	useEffect(() => {
		if (isAuth) {
			dispatch(action(arg));
		}
	}, [dispatch, action, arg, isAuth]);
};
