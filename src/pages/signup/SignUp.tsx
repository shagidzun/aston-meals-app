import Container from "@mui/material/Container";
import {
	FormControl,
	IconButton,
	InputAdornment,
	InputLabel,
	OutlinedInput,
	Stack,
	Typography
} from "@mui/material";
import { useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { Navigation } from "../../components/navigation/Navigation";

export const SignUp = () => {
	const [showPassword, setShowPassword] = useState<boolean>(false);
	const handleClickShowPassword = () => setShowPassword(show => !show);
	const handleMouseDownPassword = (
		event: React.MouseEvent<HTMLButtonElement>
	) => {
		event.preventDefault();
	};
	return (
		<>
			<Navigation />
			<Container maxWidth="sm">
				<Stack>
					<FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
						<InputLabel htmlFor="login">Login</InputLabel>
						<OutlinedInput id="login" label="Login" />
					</FormControl>
					<FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
						<InputLabel htmlFor="password">Password</InputLabel>
						<OutlinedInput
							id="password"
							type={showPassword ? "text" : "password"}
							endAdornment={
								<InputAdornment position="end">
									<IconButton
										aria-label="toggle password visibility"
										onClick={handleClickShowPassword}
										onMouseDown={handleMouseDownPassword}
										edge="end"
									>
										{showPassword ? <VisibilityOff /> : <Visibility />}
									</IconButton>
								</InputAdornment>
							}
							label="Password"
						/>
					</FormControl>
					<Typography>
						Already have an account? <Link to="/signin">Sign in</Link>
					</Typography>
				</Stack>
			</Container>
		</>
	);
};
