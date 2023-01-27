import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

// Services
import { login } from "services/account.service.js";

// Utils/Hooks/Reducers
import { createNotification } from "utils/notification.js";
import useClasses from "hooks/useClasses.js";
import { setLogin } from "reducers/auth/index.js";

// Components
import Footer from "components/Footer.jsx";
import FlexContainer from "components/FlexContainer.jsx";
import LinkButton from "components/LinkButton.jsx";
import TextInput from "components/TextInput.jsx";

// Mui Components
import { Button, CircularProgress, Grid, Typography } from "@mui/material";

// Icons
import Logo from "assets/svg/logo.js";

// Constants
import { statusCodes } from "constants/statusCodes.constants.js";

// Styles
import loginStyles from "styles/pages/Login.style.js";
import Header from "components/Header.jsx";

const Login = () => {
	const classes = useClasses(loginStyles);
	const [loading, setLoading] = useState(false);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	let { token, user } = useSelector((state) => state);

	const schema = yup.object().shape({
		email: yup
			.string()
			.email("Invalid email address")
			.required("Email address is required"),
		password: yup
			.string()
			.min(5, "Password must be at least 5 characters")
			.max(64, "Password cannot exceed 64 characters")
			.required("Password is required")
			.matches(/^(?=.*[a-z])/, "Password must include lowercase letter")
			.matches(/^(?=.*[A-Z])/, "Password must include uppercase letter")
			.matches(/^(?=.*[0-9])/, "Password must include digit")
			.matches(
				/^(?=.*[!@#\$%\^&\*])/,
				"Password must include special character"
			),
	});

	const {
		control,
		handleSubmit,
		reset,
		setFocus,
		formState: { errors },
	} = useForm({
		defaultValues: {
			email: "",
			password: "",
		},
		resolver: yupResolver(schema),
	});

	const sendLoginRequest = useCallback(
		async (data) => {
			if (loading) return;

			setLoading(true);
			try {
				const response = await login(data);

				if (response.status !== statusCodes.OK) {
					const errMsg = response.data.msg;
					const key = response.data.key;
					createNotification("error", errMsg);
					console.error(errMsg);
					setFocus("email");
					if (key === "no_account") reset();

					return;
				}

				reset();
				dispatch(
					setLogin({
						// user: loggedIn.user,
						// token: loggedIn.token,
					})
				);
				navigate(`/${user}/dashboard`);
			} catch (error) {
				createNotification("error", error.message);
				console.error(error.message);
			} finally {
				setLoading(false);
			}
		},
		[loading]
	);

	return (
		<FlexContainer page justifyContentCenter alignItemsCenter col>
			<Header showRegister showLogo={true} />
			<form
				onSubmit={handleSubmit(sendLoginRequest)}
				className={classes.loginFormWrap}
			>
				<FlexContainer
					gap="15px"
					justifyContentCenter
					alignItemsCenter
					col
				>
					<div>
						<Typography variant="h2">
							<strong>Account Log In</strong>
						</Typography>
						<Typography variant="h6">
							Welcome back! Please enter your details.
						</Typography>
					</div>
					<TextInput
						staticLabel
						autoFocus
						fullWidth
						label="Email"
						name="email"
						type="email"
						control={control}
						errors={errors}
					/>

					<TextInput
						altLabel
						staticLabel
						fullWidth
						peekPassword
						label="Password"
						name="password"
						type="password"
						control={control}
						errors={errors}
					/>
					<Button
						variant="contained"
						fullWidth
						type="submit"
						className={classes.submitBtn}
					>
						{loading ? <CircularProgress /> : "Submit"}
					</Button>
				</FlexContainer>
			</form>
			<Footer />
		</FlexContainer>
	);
};

export default Login;
