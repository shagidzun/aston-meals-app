import { AppBar } from "@mui/material";
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
			<Link to={"/"}>Home</Link>
		</AppBar>
	);
};
