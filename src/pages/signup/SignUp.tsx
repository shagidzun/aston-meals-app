import Container from "@mui/material/Container";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { Navigation } from "../../components/navigation/Navigation";
import { Form } from "../../components/form/Form";
import { useAppDispatch } from "../../app/hooks";
import { setUser } from "../../features/user/userSlice";
import { db } from "../../firebase/firebase";

export const SignUp = () => {
	const dispatch = useAppDispatch();
	const auth = getAuth();
	const navigate = useNavigate();
	const handleSignUp = (email: string, password: string) => {
		createUserWithEmailAndPassword(auth, email, password)
			.then(userCredential => {
				const user = userCredential.user;
				user.getIdToken().then(token => {
					dispatch(setUser(user.email, token, user.uid));
				});
				setDoc(doc(db, "users", user.uid), {
					email: user.email,
					id: user.uid,
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
