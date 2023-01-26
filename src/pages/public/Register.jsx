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
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

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
import { cx } from "@emotion/css";

const employeeSteps = ["Enter Code", "Personal Info", "Code", "submit"];
const storeSteps = ["Personal store Info", "Team Info", "Code", "submit"];

const Register = () => {
	const classes = useClasses(registerStyles);
	const [inProgress, setInProgress] = useState(false);
	const [activeStep, setActiveStep] = useState(1);
	const [accountType, setAccountType] = useState(0);
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

	const getEmployeeSteps = () => {
		switch (activeStep) {
			case 1:
				return defaultStep();
			case 2:
				return employeeStep1();
			case 3:
				return employeeStep2();
			default:
				return defaultStep();
		}
	};

	const getStoreSteps = () => {
		switch (activeStep) {
			case 1:
				return defaultStep();
			case 2:
				return storeStep1();
			case 3:
				return storeStep2();
			default:
				return defaultStep();
		}
	};

	const defaultStep = () => {
		return <FlexContainer col maxHeight>
            <h1>Let's Get Started</h1>
            <p>Choose the type of account you are creating</p>
        </FlexContainer>;
	};

	const employeeStep1 = () => {
		return <>Emp1</>;
	};

	const employeeStep2 = () => {
		return <>Emp2</>;
	};

	const storeStep1 = () => {
		return <>Store1</>;
	};

	const storeStep2 = () => {
		return <>Store2</>;
	};

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
			<Header showLogo={false} showLogin />
			<FlexContainer
				gap="15px"
				justifyContentCenter
				alignItemsCenter
				col
				maxHeight
				styles={classes.relative}
			>
				<form
					onSubmit={handleSubmit(sendRegisterRequest)}
					className={classes.registerFormWrap}
				>
					<div
						className={cx(classes.stepperWrap, {
							[classes.hidden]: activeStep === 1,
						})}
					>
						<RegisterStepper
							activeStep={activeStep}
							steps={
								accountType === 0 ? employeeSteps : storeSteps
							}
						/>
					</div>
					<div className={classes.pageWrap}>
						{accountType === 0
							? getEmployeeSteps(activeStep)
							: getStoreSteps(activeStep)}
					</div>
					<div className={classes.buttonWrap}>
						<Button
							startIcon={<ArrowBackIcon />}
							className={classes.backBtn}
							disabled={activeStep === 1}
							onClick={handleBack}
							variant="text"
						>
							Back
						</Button>
						<Button
							className={classes.nextBtn}
							disabled={
								activeStep ===
								(accountType === 0
									? employeeSteps.length
									: storeSteps.length)
							}
							onClick={handleNext}
							variant="contained"
						>
							Next Step
						</Button>
					</div>
				</form>
			</FlexContainer>
			<Footer />
		</FlexContainer>
	);
};

export default Register;
