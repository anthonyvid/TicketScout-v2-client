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
import React, { useReducer, useState } from "react";
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
import DefaultStep from "components/registerSteps/DefaultStep.jsx";
import EmployeeStep1 from "components/registerSteps/EmployeeStep1.jsx";
import EmployeeStep2 from "components/registerSteps/EmployeeStep2.jsx";

const employeeSteps = ["Enter Code", "Personal Info", "Code", "submit"];
const storeSteps = ["Personal store Info", "Team Info", "Code", "submit"];

const Register = () => {
	const classes = useClasses(registerStyles);
	const [signUpCode, setSignUpCode] = useState(new Array(6).fill(""));
	const [activeStep, setActiveStep] = useState(0);
	const [signUpCodeVerified, setSignUpCodeVerified] = useState(true); //todo: change back to false after
	const [accountType, setAccountType] = useState(0);

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

	const handleNext = () => setActiveStep(activeStep + 1);
	const handleBack = () =>
		setActiveStep((prevActiveStep) => prevActiveStep - 1);

	const getDefaultStep = () => (
		<DefaultStep
			accountType={accountType}
			setAccountType={setAccountType}
		/>
	);

	const getEmployeeSteps = () => {
		switch (activeStep) {
			case 0:
				return getDefaultStep();
			case 1:
				return (
					<EmployeeStep1
						code={signUpCode}
						setCode={setSignUpCode}
						setVerified={setSignUpCodeVerified}
					/>
				);
			case 2:
				return <EmployeeStep2 control={control} errors={errors} />;
			default:
				return getDefaultStep();
		}
	};

	const getStoreSteps = () => {
		switch (activeStep) {
			case 0:
				return getDefaultStep();
			case 1:
				return storeStep1();
			case 2:
				return storeStep2();
			default:
				return getDefaultStep();
		}
	};

	const storeStep1 = () => <>Store1</>;
	const storeStep2 = () => <>Store2</>;
	const sendRegisterRequest = (data) => console.log(data);
	const defaultView = activeStep === 0;
	const employeeType = accountType === 0;
	const storeType = accountType === 1;

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
					<FlexContainer
						alignItemsCenter
						justifyContentCenter
						col
						maxHeight
						styles={classes.pageWrap}
					>
						{employeeType
							? getEmployeeSteps(activeStep)
							: getStoreSteps(activeStep)}
						{defaultView && (
							<Button
								sx={{ borderRadius: "8px" }}
								className={classes.continueBtn}
								onClick={handleNext}
								variant="contained"
							>
								Continue
							</Button>
						)}
					</FlexContainer>

					{!defaultView && (
						<div className={classes.buttonWrap}>
							<Button
								startIcon={<ArrowBackIcon />}
								className={classes.backBtn}
								onClick={handleBack}
								variant="text"
							>
								Back
							</Button>
							<Button
								className={classes.nextBtn}
								disabled={
									!signUpCodeVerified ||
									activeStep ===
										(employeeType
											? employeeSteps.length + 1
											: storeSteps.length + 1)
								}
								onClick={handleNext}
								variant="contained"
							>
								Next Step
							</Button>
						</div>
					)}

					<div className={classes.stepperWrap}>
						<RegisterStepper
							activeStep={activeStep}
							steps={
								employeeType
									? employeeSteps.length
									: storeSteps.length
							}
						/>
					</div>
				</form>
			</FlexContainer>
		</FlexContainer>
	);
};

export default Register;
