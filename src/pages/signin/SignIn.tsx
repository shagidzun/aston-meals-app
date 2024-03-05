import Container from "@mui/material/Container";
import { useNavigate } from "react-router-dom";
import { Navigation } from "../../components/navigation/Navigation";
import { Form } from "../../components/form/Form";
import { useAppDispatch } from "../../app/hooks";
import { userSignIn } from "../../features/user/userSlice";

export const SignIn = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const handleSignIn = (email: string, password: string) => {
		dispatch(userSignIn({ email, password }));
		navigate("/");
	};
	return (
		<>
			<Navigation />
			<Container maxWidth="sm">
				<Form title={"Sign in"} handleSubmit={handleSignIn} />
			</Container>
		</>
	);
};
