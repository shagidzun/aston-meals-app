import { useState } from "react";
import {
	Button,
	FormControl,
	IconButton,
	InputAdornment,
	InputLabel,
	OutlinedInput,
	Stack,
	Typography
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Link } from "react-router-dom";

interface FormProps {
	title: "Sign up" | "Sign in";
	handleSubmit: (email: string, password: string) => void;
}
export const Form = ({ title, handleSubmit }: FormProps) => {
	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const [showPassword, setShowPassword] = useState<boolean>(false);
	const handleClickShowPassword = () => setShowPassword(show => !show);
	const handleMouseDownPassword = (
		event: React.MouseEvent<HTMLButtonElement>
	) => {
		event.preventDefault();
	};
	return (
		<Stack>
			<Typography variant="h6">{title}</Typography>
			<FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
				<InputLabel htmlFor="email">Email</InputLabel>
				<OutlinedInput
					id="email"
					label="Email"
					onChange={e => setEmail(e.target.value)}
				/>
			</FormControl>
			<FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
				<InputLabel htmlFor="password">Password</InputLabel>
				<OutlinedInput
					id="password"
					type={showPassword ? "text" : "password"}
					onChange={e => setPassword(e.target.value)}
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
			<Button
				sx={{ m: 1, width: "25ch" }}
				onClick={() => handleSubmit(email, password)}
			>
				{title}
			</Button>
			<Typography>
				{title === "Sign up" ? (
					<>
						Already have an account? <Link to="/signin">Sign in</Link>
					</>
				) : (
					<>
						Don't have an account? <Link to="/signup">Sign up</Link>
					</>
				)}
			</Typography>
		</Stack>
	);
};
