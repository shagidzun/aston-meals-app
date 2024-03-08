import { useState } from "react";
import PropTypes from "prop-types";
import {
	Button,
	FormControl,
	FormHelperText,
	IconButton,
	InputAdornment,
	InputLabel,
	OutlinedInput,
	Stack,
	Typography
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { isValidEmail } from "../../utils/isValidEmail";

interface FormProps {
	title: "Sign up" | "Sign in";
	handleSubmit: (email: string, password: string) => void;
	error: string | undefined;
}
export const Form = ({ title, handleSubmit, error }: FormProps) => {
	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const [showPassword, setShowPassword] = useState<boolean>(false);
	const [showErrorEmail, setShowErrorEmail] = useState<boolean>(false);
	const [showErrorPass, setShowErrorPass] = useState<boolean>(false);
	const handleClickShowPassword = (): void => setShowPassword(show => !show);
	const handleMouseDownPassword = (
		event: React.MouseEvent<HTMLButtonElement>
	) => {
		event.preventDefault();
	};
	const handleClickSubmit = (): void => {
		if (isValidEmail(email) && password.length >= 6) {
			handleSubmit(email, password);
		}
		if (password.length < 6) {
			setShowErrorPass(true);
		}
		if (!isValidEmail(email)) {
			setShowErrorEmail(true);
		}
	};
	return (
		<Stack justifyContent="center" alignItems="center" sx={{ marginTop: 20 }}>
			<Typography variant="h6">{title}</Typography>
			<FormControl
				sx={{ m: 1, width: "25ch" }}
				variant="outlined"
				error={showErrorEmail}
			>
				<InputLabel htmlFor="email">Email</InputLabel>
				<OutlinedInput
					id="email"
					type="email"
					label="Email"
					required
					onChange={(e): void => setEmail(e.target.value)}
				/>
				<FormHelperText>{showErrorEmail && "Invalid email"}</FormHelperText>
			</FormControl>
			<FormControl
				sx={{ m: 1, width: "25ch" }}
				variant="outlined"
				error={showErrorPass}
			>
				<InputLabel htmlFor="password">Password</InputLabel>
				<OutlinedInput
					id="password"
					required
					type={showPassword ? "text" : "password"}
					inputProps={{ minLength: 6 }}
					onChange={(e): void => setPassword(e.target.value)}
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
				<FormHelperText>
					{showErrorPass && "Password must be 6 characters or more"}
				</FormHelperText>
			</FormControl>
			<Button sx={{ m: 1, width: "25ch" }} onClick={handleClickSubmit}>
				{title}
			</Button>
			<Typography color="red">{error}</Typography>
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

// Form.propTypes = {
// 	title: PropTypes.oneOf(["Sign up", "Sign in"]).isRequired,
// 	handleSubmit: PropTypes.func.isRequired,
// 	error: PropTypes.string.isRequired
// };
