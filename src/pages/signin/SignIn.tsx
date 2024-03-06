import Container from "@mui/material/Container";
import { Navigate, useNavigate } from "react-router-dom";
import { LinearProgress } from "@mui/material";
import { Navigation } from "../../components/navigation/Navigation";
import { Form } from "../../components/form/Form";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
	selectIsAuth,
	selectIsLoading,
	userSignIn
} from "../../features/user/userSlice";

export const SignIn = () => {
	const dispatch = useAppDispatch();
	const isAuth = useAppSelector(selectIsAuth);
	const isUserLoading = useAppSelector(selectIsLoading);
	const navigate = useNavigate();
	const handleSignIn = (email: string, password: string) => {
		dispatch(userSignIn({ email, password }));
		navigate("/");
	};
	return (
		<>
			{isUserLoading && <LinearProgress />}
			{!isUserLoading && !isAuth ? (
				<>
					<Navigation />
					<Container maxWidth="sm">
						<Form title={"Sign in"} handleSubmit={handleSignIn} />
					</Container>
				</>
			) : (
				<Navigate to="/" />
			)}
		</>
	);
};
