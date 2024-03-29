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
	selectIsLoading
} from "../../features/user/userSlice";
import { userSignUp } from "../../features/actions-exports";

const SignUp = () => {
	const dispatch = useAppDispatch();
	const isUserLoading = useAppSelector(selectIsLoading);
	const isAuth = useAppSelector(selectIsAuth);
	const error = useAppSelector(selectError);
	const handleSignUp = useCallback(
		(email: string, password: string) => {
			dispatch(userSignUp({ email, password }));
		},
		[dispatch]
	);
	return isUserLoading ? (
		<LinearProgress />
	) : !isUserLoading && !isAuth ? (
		<>
			<Navigation />
			<Container maxWidth="sm">
				<Form title={"Sign up"} handleSubmit={handleSignUp} error={error} />
			</Container>
		</>
	) : (
		<Navigate to="/" />
	);
};

export default SignUp;
