import Container from "@mui/material/Container";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { Navigation } from "../../components/navigation/Navigation";
import { Form } from "../../components/form/Form";
import { useAppDispatch } from "../../app/hooks";
import { setUser } from "../../features/user/userSlice";

export const SignIn = () => {
	const dispatch = useAppDispatch();
	const auth = getAuth();
	const navigate = useNavigate();
	const handleSignIn = (email: string, password: string) => {
		signInWithEmailAndPassword(auth, email, password)
			.then(userCredential => {
				const user = userCredential.user;
				user.getIdToken().then(token => {
					dispatch(setUser(user.email, token, user.uid));
				});
				navigate("/");
			})
			.catch(console.log); //временно, позже будет показ ошибки в ui
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
