import Container from "@mui/material/Container";
import { Navigate, useNavigate } from "react-router-dom";
import { Navigation } from "../../components/navigation/Navigation";
import { Form } from "../../components/form/Form";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectIsAuth, userSignUp } from "../../features/user/userSlice";

export const SignUp = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const isAuth = useAppSelector(selectIsAuth);
	const handleSignUp = (email: string, password: string) => {
		dispatch(userSignUp({ email, password }));
		navigate("/");
	};
	return (
		<>
			{isAuth && <Navigate to={"/"} />}
			<>
				<Navigation />
				<Container maxWidth="sm">
					<Form title={"Sign up"} handleSubmit={handleSignUp} />
				</Container>
			</>
		</>
	);
};
