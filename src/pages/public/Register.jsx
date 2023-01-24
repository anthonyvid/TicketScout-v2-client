import {
	Button,
	Grid,
	Step,
	StepButton,
	StepLabel,
	Stepper,
	Typography,
} from "@mui/material";
import FlexContainer from "components/FlexContainer.jsx";
import useClasses from "hooks/useClasses.js";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

// Icons

// Styles
import registerStyles from "styles/pages/Register.style.js";

import Header from "components/Header.jsx";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import TextInput from "components/TextInput.jsx";
import Footer from "components/Footer.jsx";
import { Box } from "@mui/system";

import RegisterStepper from "components/RegisterStepper.jsx";

const page1 = () => {
	return <>Page1</>;
};
const page2 = () => {
	return <>Page1</>;
};
const page3 = () => {
	return <>Page1</>;
};

const Register = () => {
	const classes = useClasses(registerStyles);
	const [inProgress, setInProgress] = useState(false);
	const [activeStep, setActiveStep] = useState(1);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	let { token, user } = useSelector((state) => state);

	const handleNext = () => setActiveStep(activeStep + 1);
	const handleBack = () =>
		setActiveStep((prevActiveStep) => prevActiveStep - 1);

	const schema = yup.object().shape({
		email: yup.string().email().required(),
		password: yup
			.string()
			.min(5)
			.max(64)
			.required()
			.matches(/^(?=.*[a-z])/, "password must include lowercase letter")
			.matches(/^(?=.*[A-Z])/, "password must include uppercase letter")
			.matches(/^(?=.*[0-9])/, "password must include digit")
			.matches(
				/^(?=.*[!@#\$%\^&\*])/,
				"password must include special character"
			),
	});

	const sendRegisterRequest = () => {};

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
	return (
		<FlexContainer page justifyContentCenter alignItemsCenter col>
			<Header showLogin />
			<RegisterStepper activeStep={activeStep} />
			<form
				onSubmit={handleSubmit(sendRegisterRequest)}
				className={classes.registerFormWrap}
			>
				<FlexContainer
					gap="15px"
					justifyContentCenter
					alignItemsCenter
					col
				>
					<div className={classes.welcomeMsg}>
						<Typography variant="h2">
							<strong>
								How are you planning to use TicketScout?
							</strong>
						</Typography>
						<Typography variant="h6">
							{/* Welcome! Lets get started. */}
						</Typography>
					</div>
					<div>
						<Box
							sx={{
								display: "flex",
								flexDirection: "row",
								pt: 2,
							}}
						>
							<Button
								color="inherit"
								disabled={activeStep === 1}
								onClick={handleBack}
								sx={{ mr: 1 }}
							>
								Back
							</Button>
							<Box sx={{ flex: "1 1 auto" }} />
							<Button
								disabled={activeStep === 3}
								onClick={handleNext}
								sx={{ mr: 1 }}
							>
								Next
							</Button>
						</Box>
					</div>
				</FlexContainer>
			</form>
			<Footer />
		</FlexContainer>
	);
};

export default Register;
