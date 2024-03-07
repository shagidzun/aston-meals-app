import Container from "@mui/material/Container";
import { Navigate, useNavigate } from "react-router-dom";
import { LinearProgress } from "@mui/material";
import { useCallback } from "react";
import { Navigation } from "../../components/navigation/Navigation";
import { Form } from "../../components/form/Form";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
	selectIsAuth,
	selectIsLoading,
	userSignUp
} from "../../features/user/userSlice";

export const SignUp = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const isUserLoading = useAppSelector(selectIsLoading);
	const isAuth = useAppSelector(selectIsAuth);
	const handleSignUp = useCallback(
		(email: string, password: string) => {
			dispatch(userSignUp({ email, password }));
			navigate("/");
		},
		[dispatch, navigate]
	);
	return isUserLoading ? (
		<LinearProgress />
	) : !isUserLoading && !isAuth ? (
		<>
			<Navigation />
			<Container maxWidth="sm">
				<Form title={"Sign up"} handleSubmit={handleSignUp} />
			</Container>
		</>
	) : (
		<Navigate to="/" />
	);
};
