import { AppBar, Box, Button } from "@mui/material";
import { Link } from "react-router-dom";

export const Navigation = () => {
	return (
		<AppBar
			sx={{
				height: 50,
				justifyContent: "center",
				position: "static",
				padding: "20px"
			}}
		>
			<Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
				<Link style={{ textDecoration: "none", color: "inherit" }} to={"/"}>
					<Button sx={{ my: 2, color: "white", display: "block" }}>Home</Button>
				</Link>
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
			</Box>
		</AppBar>
	);
};
