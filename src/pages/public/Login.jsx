import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	Link,
	useLocation,
	useNavigate,
	useSearchParams,
} from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

// Services
import { login } from "services/auth.service.js";

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

import userLottie from "../../assets/lotties/login.json";
import Lottie from "react-lottie-player";
import LoginUser from "assets/svg/LoginUser.js";

const Login = () => {
	const classes = useClasses(loginStyles);
	const [loading, setLoading] = useState(false);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [width, setWidth] = useState(window.innerWidth);
	const [searchParams, setSearchParams] = useSearchParams();
	const isMobile = width <= 768;
	const [play, setPlay] = useState(false);

	const handleWindowSizeChange = () => {
		setWidth(window.innerWidth);
	};

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

				if (response.status !== statusCodes.OK) {
					setFocus("email");
					if (response.data.key === "no_account") reset();
					throw new Error(
						response.data.message || response.statusText
					);
				}
				reset();
				dispatch(
					setLogin({
						user: response.data.user,
						token: response.data.token,
					})
				);
				navigate(`/${response.data.user.storeUrl}/dashboard`);
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

	useEffect(() => {
		window.addEventListener("resize", handleWindowSizeChange);
		return () => {
			window.removeEventListener("resize", handleWindowSizeChange);
		};
	}, []);

	return (
		<FlexContainer page justifyContentCenter alignItemsCenter col>
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
					<div className={classes.lottieWrap}>
						{loading ? (
							<Lottie
								animationData={userLottie}
								loop={false}
								play
								rendererSettings={{
									preserveAspectRatio: "xMidYMid slice",
								}}
							/>
						) : (
							<LoginUser />
						)}
					</div>
					<div>
						<h1 className={classes.heading}>
							<strong>Account Log In</strong>
						</h1>
						<h3 className={classes.subheading}>
							Welcome back! Please enter your details.
						</h3>
					</div>
					<TextInput
						staticLabel
						autoFocus={!isMobile}
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
				<div className={classes.signUp}>
					Dont have an account yet? &nbsp;&nbsp;
					<Link tabIndex="-1" to="/account/register">
						Sign up
					</Link>
				</div>
			</form>
		</FlexContainer>
	);
};

export default Login;
