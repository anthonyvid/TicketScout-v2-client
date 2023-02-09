import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

// Services
import { login } from "services/user.service.js";

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
import { loginSchema } from "constants/register.constants.js";

const Login = () => {
	const classes = useClasses(loginStyles);
	const [loading, setLoading] = useState(false);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [searchParams, setSearchParams] = useSearchParams();
	let { token, user } = useSelector((state) => state);

	const {
		control,
		handleSubmit,
		reset,
		setFocus,
		setValue,
		formState: { errors },
	} = useForm({
		defaultValues: {
			email: "",
			password: "",
		},
		mode: "onChange",
		resolver: yupResolver(loginSchema),
	});

	const sendLoginRequest = useCallback(
		async (data) => {


			setLoading(true);
			try {
				const response = await login(data);
				console.log(response);
				if (response.status !== statusCodes.OK) {
					setFocus("email");
					if (response.data.key === "no_account") reset();
					throw new Error(response.data.message);
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

	useEffect(() => {
		const from = searchParams.get("from");
		const email = searchParams.get("email");

		if (from === "checkout") {
			createNotification(
				"info",
				"Your account has been created and your current plan is Basic."
			);
			searchParams.delete("from");
		}

		if (email) {
			setValue("email", email);
			searchParams.delete("email");
		}
		setSearchParams(searchParams);
	}, []);

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
