import Footer from "components/Footer.jsx";
import FlexContainer from "components/FlexContainer.jsx";
import useClasses from "hooks/useClasses.js";
import loginStyles from "styles/pages/Login.style.js";
import {
	Button,
	FormLabel,
	Grid,
	InputLabel,
	TextField,
	Typography,
} from "@mui/material";
import Logo from "assets/svg/logo.js";
import { Controller, useForm } from "react-hook-form";
import TextInput from "components/TextInput.jsx";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";

const Login = () => {
	const classes = useClasses(loginStyles);

	yup.addMethod(yup.string, "strongPassword", strongPasswordMethod);

	function strongPasswordMethod() {
		return this.test("strongPasswordTest", (value) => {
			const { path, createError } = this;
			switch (Boolean(value)) {
				case !/^(?=.*[a-z])/.test(value):
					return createError({
						path,
						message: "password must include lowercase letter",
					});
				case !/^(?=.*[A-Z])/.test(value):
					return createError({
						path,
						message: "password must include uppercase letter",
					});
				case !/^(?=.*[0-9])/.test(value):
					return createError({
						path,
						message: "password must include digit",
					});
				case !/^(?=.*[!@#\$%\^&\*])/.test(value):
					return createError({
						path,
						message: "password must include special character",
					});
				default:
					return true;
			}
		});
	}

	const schema = yup.object().shape({
		email: yup.string().email().required(),
		password: yup.string().min(5).max(64).required().strongPassword(),
	});

	const {
		control,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm({
		defaultValues: {
			email: "",
			password: "",
		},
		resolver: yupResolver(schema),
	});

	useEffect(() => console.log(errors), [errors]);

	const onSubmit = (data) => {
		console.log({ data });
		reset();
	};

	return (
		<FlexContainer page justifyContentCenter alignItemsCenter col>
			<FlexContainer style={classes.loginContainer}>
				<Grid className={classes.header} item xs={12}>
					<Logo width={50} height={50} />
					<div className={classes.registerWrap}>
						<p>New to TicketScout?</p>
						<Button
							className={classes.registerButton}
							variant="contained"
							color="background"
						>
							Register
						</Button>
					</div>
				</Grid>
			</FlexContainer>
			<form
				onSubmit={handleSubmit(onSubmit)}
				className={classes.loginFormWrap}
			>
				<FlexContainer
					gap="15px"
					justifyContentCenter
					alignItemsCenter
					col
				>
					<div className={classes.welcomeMsg}>
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
						errorText="Please enter a valid email"
						control={control}
						errors={errors}
						rules={{ required: true }}
					/>

					<TextInput
						altLabel
						staticLabel
						fullWidth
						peekPassword
						label="Password"
						name="password"
						type="password"
						errorText="Please enter a valid password"
						control={control}
						errors={errors}
						rules={{ required: true }}
					/>

					<Button variant="contained" fullWidth type="submit">
						Submit
					</Button>
				</FlexContainer>
			</form>
			<Footer />
		</FlexContainer>
	);
};

export default Login;
