import { Button } from "@mui/material";
import FlexContainer from "components/FlexContainer.jsx";
import useClasses from "hooks/useClasses.js";
import React, { useEffect, useReducer, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import registerStyles from "styles/pages/Register.style.js";
import Header from "components/Header.jsx";
import RegisterStepper from "components/RegisterStepper.jsx";
import DefaultStep from "components/registerSteps/DefaultStep.jsx";
import EmployeeStep1 from "components/registerSteps/EmployeeStep1.jsx";
import EmployeeStep2 from "components/registerSteps/EmployeeStep2.jsx";

const EMPLOYEE_STEPS = 3;
const STORE_STEPS = 3;

const Register = () => {
	const classes = useClasses(registerStyles);
	const [signUpCode, setSignUpCode] = useState(new Array(6).fill(""));
	const [activeStep, setActiveStep] = useState(0);
	const [signUpCodeVerified, setSignUpCodeVerified] = useState(true); //todo: change back to false after
	const [accountType, setAccountType] = useState(0);

	const phoneRegExp =
		/^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

	const schema = yup.object().shape({
		firstname: yup.string().required("First name is required"),
		lastname: yup.string().required("Last name is required"),
		email: yup
			.string()
			.email("Invalid email address")
			.required("Email address is required"),
		phoneNumber: yup
			.string()
			.max(12, "Phone number cannot exceed 12 characters")
			.required("Phone number is required")
			.matches(phoneRegExp, "Invalid phone number"),
	});

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

	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			firstname: "",
			lastname: "",
			email: "",
			phoneNumber: "",
		},
		resolver: yupResolver(schema),
	});

	const handleNext = () => {
		setActiveStep(activeStep + 1);
	};
	const handleBack = () =>
		setActiveStep((prevActiveStep) => prevActiveStep - 1);

	const getDefaultStep = () => (
		<DefaultStep
			accountType={accountType}
			setAccountType={setAccountType}
		/>
	);

	useEffect(() => console.log(errors), [errors]);

	return (
		<FlexContainer
			page
			justifyContentCenter
			alignItemsCenter
			col
			styles={classes.registerContainer}
		>
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
								{activeStep ===
								(employeeType
									? EMPLOYEE_STEPS - 1
									: STORE_STEPS - 1) ? (
									<Button
										className={classes.nextBtn}
										variant="contained"
										type="submit"
									>
										Submit
									</Button>
								) : (
									<Button
										className={classes.nextBtn}
										onClick={handleNext}
										variant="contained"
									>
										Next Step
									</Button>
								)}
							</div>
						)}
					</FlexContainer>

					{/* {!defaultView && (
						<div className={classes.buttonWrap}>
							<Button
								startIcon={<ArrowBackIcon />}
								className={classes.backBtn}
								onClick={handleBack}
								variant="text"
							>
								Back
							</Button>
							{activeStep ===
							(employeeType
								? EMPLOYEE_STEPS - 1
								: STORE_STEPS - 1) ? (
								<Button
									className={classes.nextBtn}
									variant="contained"
									type="submit"
								>
									Submit
								</Button>
							) : (
								<Button
									className={classes.nextBtn}
									onClick={handleNext}
									variant="contained"
								>
									Next Step
								</Button>
							)}
						</div>
					)} */}

					<div className={classes.stepperWrap}>
						<RegisterStepper
							activeStep={activeStep}
							steps={employeeType ? EMPLOYEE_STEPS : STORE_STEPS}
						/>
					</div>
				</form>
			</FlexContainer>
		</FlexContainer>
	);
};

export default Register;
