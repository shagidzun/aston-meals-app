import Container from "@mui/material/Container";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { doc, setDoc } from "firebase/firestore";
import { Navigation } from "../../components/navigation/Navigation";
import { Form } from "../../components/form/Form";
import { useAppDispatch } from "../../app/hooks";
import { setUser } from "../../features/user/userSlice";
import { db } from "../../firebase/firebase";

export const SignUp = () => {
	const dispatch = useAppDispatch();
	const auth = getAuth();
	const navigate = useNavigate();
	//TODO: перенести в слайс
	const handleSignUp = (email: string, password: string) => {
		createUserWithEmailAndPassword(auth, email, password)
			.then(userCredential => {
				const user = userCredential.user;
				const userRef = doc(db, "users", user.uid);
				user.getIdToken().then(token => {
					dispatch(setUser(user.email, token, user.uid));
				});
				setDoc(userRef, {
					email: user.email,
					id: user.uid,
					history: [],
					favorites: [],
					date: new Date().toISOString()
				});

				navigate("/");
			})
			.catch(console.log); //временно, позже будет показ ошибки в ui
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
