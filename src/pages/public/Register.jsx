import { Button } from "@mui/material";
import FlexContainer from "components/FlexContainer.jsx";
import useClasses from "hooks/useClasses.js";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import registerStyles from "styles/pages/Register.style.js";
import Header from "components/Header.jsx";
import RegisterStepper from "components/RegisterStepper.jsx";
import DefaultStep from "components/registerSteps/DefaultStep.jsx";
import EmployeeStep1 from "components/registerSteps/EmployeeStep2.jsx";
import EmployeeStep2 from "components/registerSteps/EmployeeStep1.jsx";
import StoreStep1 from "components/registerSteps/StoreStep1.jsx";
import StoreStep2 from "components/registerSteps/StoreStep2.jsx";
import StoreStep3 from "components/registerSteps/StoreStep3.jsx";

const EMPLOYEE_STEPS = 3;
// const STORE_STEPS = 3;
const planType = {
	BASIC: 0,
	STANDARD: 1,
	PRO: 2,
};

const plan = {
	0: {
		price: "Free",
		name: "Basic",
		perks: [
			"50 Tickets & Invoices / Month",
			"5 Employee Accounts",
			"Outbound Emails",
			"Time Clock",
			"SMS",
		],
	},
	1: {
		price: "$19.99",
		name: "Standard",
		perks: [
			"Unlimited Tickets & Invoices / Month",
			"20 Employee Accounts",
			"Outbound Emails",
			"Time Clock",
			"SMS",
		],
	},
	2: {
		price: "$29.99",
		name: "Pro",
		perks: [
			"Unlimited Tickets & Invoices / Month",
			"Unlimited Employee Accounts",
			"Outbound Emails",
			"Time Clock",
			"SMS",
		],
	},
};

const Register = () => {
	const classes = useClasses(registerStyles);
	const [signUpCode, setSignUpCode] = useState(new Array(6).fill(""));
	const [activeStep, setActiveStep] = useState(0);
	const [STORE_STEPS, setSTORE_STEPS] = useState(3);
	const [subscriptionType, setSubscriptionType] = useState(0);
	const [storeUrl, setStoreUrl] = useState("");
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

	const storeSchema = yup.object().shape({
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
		storeName: yup.string().required("Store name is required"),
	});

	const getEmployeeSteps = () => {
		switch (activeStep) {
			case 0:
				return getDefaultStep();
			case 2:
				return (
					<EmployeeStep1
						code={signUpCode}
						setCode={setSignUpCode}
						setVerified={setSignUpCodeVerified}
					/>
				);
			case 1:
				return <EmployeeStep2 control={control} errors={errors} />;
		}
	};

	const getStoreSteps = () => {
		switch (activeStep) {
			case 0:
				return getDefaultStep();
			case 1:
				return (
					<StoreStep1
						control={control2}
						errors={errors2}
						storeUrl={storeUrl}
					/>
				);
			case 2:
				return (
					<StoreStep2
						setSubscriptionType={setSubscriptionType}
						subscriptionType={subscriptionType}
						planType={planType}
						plan={plan}
					/>
				);
			case 3:
				return (
					<StoreStep3
						subscriptionType={subscriptionType}
						plan={plan}
					/>
				);
			default:
				return getDefaultStep();
		}
	};

	const employeeSubmit = (data) => console.log(data);
	const storeSubmit = (data) => console.log(data);
	const defaultView = activeStep === 0;
	const employeeType = accountType === 0;
	const storeType = accountType === 1;

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

	const {
		watch: watch2,
		control: control2,
		formState: { errors: errors2 },
		handleSubmit: handleSubmit2,
	} = useForm({
		defaultValues: {
			firstname: "",
			lastname: "",
			email: "",
			phoneNumber: "",
			storeName: "",
		},
		resolver: yupResolver(storeSchema),
	});

	useEffect(() => {
		let storeName = watch2("storeName");
		storeName = storeName.replace(/\s+/g, "-");
		setStoreUrl(storeName);
	}, [watch2("storeName")]);

	useEffect(() => {
		if (subscriptionType !== planType.BASIC) {
			setSTORE_STEPS(4);
		} else {
			setSTORE_STEPS(3);
		}
	}, [subscriptionType]);

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
					onSubmit={
						employeeType
							? handleSubmit(employeeSubmit)
							: handleSubmit2(storeSubmit)
					}
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
										Complete Registration
									</Button>
								) : (
									<Button
										className={classes.nextBtn}
										onClick={handleNext}
										variant="contained"
									>
										{storeType &&
										subscriptionType !== planType.BASIC
											? "Continue to payment"
											: "Next Step"}
									</Button>
								)}
							</div>
						)}
					</FlexContainer>

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
