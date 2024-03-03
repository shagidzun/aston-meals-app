import { AppBar, Box, Button, Typography } from "@mui/material";
import { getAuth, signOut } from "firebase/auth";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
	removeUser,
	selectIsAuth,
	setUser
} from "../../features/user/userSlice";
// временно нагрузил навигацию, на стадии рефакторинга исправлю
export const Navigation = () => {
	const isAuth = useAppSelector(selectIsAuth);
	const auth = getAuth();
	const dispatch = useAppDispatch();
	const handleOnSignOut = () => {
		signOut(auth)
			.then(() => {
				dispatch(removeUser());
			})
			.catch(error => {
				console.log(error); //временно, позже будет показ ошибки в ui
			});
	};
	useEffect(() => {
		const auth = getAuth();
		auth.onAuthStateChanged(user => {
			if (user) {
				user.getIdToken().then(token => {
					dispatch(setUser(user.email, token, user.uid));
				});
			}
		});
	}, [dispatch]);
	return (
		<AppBar
			sx={{
				height: 50,
				display: "flex",
				flexDirection: "row",
				justifyContent: "space-between",
				position: "static",
				padding: "20px"
			}}
		>
			<Box
				sx={{
					flexGrow: 1,
					display: { xs: "none", md: "flex", alignItems: "center" }
				}}
			>
				<Link style={{ textDecoration: "none", color: "inherit" }} to={"/"}>
					<Button sx={{ my: 2, color: "white", display: "block" }}>Home</Button>
				</Link>
			</Box>
			<Box
				sx={{
					flexGrow: 0,
					display: { xs: "none", md: "flex", alignItems: "center" }
				}}
			>
				{isAuth ? (
					<>
						<Link
							style={{ textDecoration: "none", color: "inherit" }}
							to={"/history"}
						>
							<Button sx={{ my: 2, color: "white", display: "block" }}>
								History
							</Button>
						</Link>
						<Typography>{auth.currentUser?.email}</Typography>
						<Button
							sx={{ my: 2, color: "white", display: "block" }}
							onClick={handleOnSignOut}
						>
							Sign out
						</Button>
					</>
				) : (
					<>
						<Link
							style={{ textDecoration: "none", color: "inherit" }}
							to={"/signup"}
						>
							<Button sx={{ my: 2, color: "white", display: "block" }}>
								Sign up
							</Button>
						</Link>
						<Link
							style={{ textDecoration: "none", color: "inherit" }}
							to={"/signin"}
						>
							<Button sx={{ my: 2, color: "white", display: "block" }}>
								Sign in
							</Button>
						</Link>
					</>
				)}
			</Box>
		</AppBar>
	);
};
