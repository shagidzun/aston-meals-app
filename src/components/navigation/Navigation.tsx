import { AppBar, Box, Button, Switch, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
	selectEmail,
	selectIsAuth,
	userSignOut
} from "../../features/user/userSlice";
import { useTheme } from "../../context/context";
export const Navigation = () => {
	const { theme, toggleTheme } = useTheme();
	const isAuth = useAppSelector(selectIsAuth);
	const email = useAppSelector(selectEmail);
	const dispatch = useAppDispatch();
	const handleOnSignOut = (): void => {
		dispatch(userSignOut());
	};
	return (
		<AppBar
			color={theme}
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
				<Switch
					color="warning"
					onChange={toggleTheme}
					checked={theme === "success"}
				/>
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
