import Container from "@mui/material/Container";
import { Navigate } from "react-router-dom";
import { LinearProgress } from "@mui/material";
import { useCallback } from "react";
import { Navigation } from "../../components/navigation/Navigation";
import { Form } from "../../components/form/Form";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
	selectError,
	selectIsAuth,
	selectIsLoading,
	userSignIn
} from "../../features/user/userSlice";

export const SignIn = () => {
	const dispatch = useAppDispatch();
	const isAuth = useAppSelector(selectIsAuth);
	const isUserLoading = useAppSelector(selectIsLoading);
	const error = useAppSelector(selectError);
	const handleSignIn = useCallback(
		(email: string, password: string) => {
			dispatch(userSignIn({ email, password }));
		},
		[dispatch]
	);
	return isUserLoading ? (
		<LinearProgress />
	) : !isUserLoading && !isAuth ? (
		<>
			<Navigation />
			<Container maxWidth="sm">
				<Form title={"Sign in"} handleSubmit={handleSignIn} error={error} />
			</Container>
		</>
	) : (
		<Navigate to="/" />
	);
};
