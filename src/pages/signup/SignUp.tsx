import Container from "@mui/material/Container";
import { useNavigate } from "react-router-dom";
import { Navigation } from "../../components/navigation/Navigation";
import { Form } from "../../components/form/Form";
import { useAppDispatch } from "../../app/hooks";
import { userSignUp } from "../../features/user/userSlice";

export const SignUp = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const handleSignUp = (email: string, password: string) => {
		dispatch(userSignUp({ email, password }));
		navigate("/");
	};
	return (
		<>
			<Navigation />
			<Container maxWidth="sm">
				<Form title={"Sign up"} handleSubmit={handleSignUp} />
			</Container>
		</>
	);
};
