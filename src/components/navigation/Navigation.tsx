import { AppBar, Box, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
	selectEmail,
	selectIsAuth,
	userSignOut
} from "../../features/user/userSlice";
export const Navigation = () => {
	const isAuth = useAppSelector(selectIsAuth);
	const email = useAppSelector(selectEmail);
	const dispatch = useAppDispatch();
	const handleOnSignOut = () => {
		dispatch(userSignOut());
	};
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
					display: { xs: "flex", md: "flex", alignItems: "center" }
				}}
			>
				<Link style={{ textDecoration: "none", color: "inherit" }} to={"/"}>
					<Button sx={{ my: 2, color: "white", display: "block" }}>Home</Button>
				</Link>
			</Box>
			<Box
				sx={{
					flexGrow: 0,
					display: { xs: "flex", md: "flex", alignItems: "center" }
				}}
			>
				{isAuth ? (
					<>
						<Link
							style={{ textDecoration: "none", color: "inherit" }}
							to={"/favorites"}
						>
							<Button sx={{ my: 2, color: "white", display: "block" }}>
								Favorites
							</Button>
						</Link>
						<Link
							style={{ textDecoration: "none", color: "inherit" }}
							to={"/history"}
						>
							<Button sx={{ my: 2, color: "white", display: "block" }}>
								History
							</Button>
						</Link>
						<Typography>{email}</Typography>
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
