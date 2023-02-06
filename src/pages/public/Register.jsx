import {
	employeeSchema,
	planType,
	storeSchema,
} from "constants/register.constants.js";
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
import { isEmpty } from "lodash";
import { createCheckoutSession } from "services/stripe.service.js";
import { createNotification } from "utils/notification.js";
import { statusCodes } from "constants/statusCodes.constants.js";
import { register } from "services/account.service.js";
import { createStore } from "services/store.service.js";

const EMPLOYEE_STEPS = 3;
const STORE_STEPS = 3;

const Register = () => {
	const classes = useClasses(registerStyles);
	const [loading, setLoading] = useState(false);

	const [signUpCode, setSignUpCode] = useState(new Array(6).fill(""));
	const [activeStep, setActiveStep] = useState(0);
	const [subscriptionType, setSubscriptionType] = useState(0);
	const [storeUrl, setStoreUrl] = useState("");
	const [signUpCodeVerified, setSignUpCodeVerified] = useState(true); //todo: change back to false after
	const [accountType, setAccountType] = useState(0);
	const defaultView = activeStep === 0;
	const employeeType = accountType === 0;

	const {
		control,
		handleSubmit,
		getValues,
		formState: { errors },
	} = useForm({
		defaultValues: {
			firstname: "",
			lastname: "",
			email: "",
			phoneNumber: "",
			password: "",
			confirmPassword: "",
		},
		mode: "onChange",
		resolver: yupResolver(employeeSchema),
	});

	const {
		watch: watch2,
		control: control2,
		getValues: getValues2,
		formState: { errors: errors2 },
		handleSubmit: handleSubmit2,
	} = useForm({
		defaultValues: {
			firstname: "",
			lastname: "",
			email: "",
			phoneNumber: "",
			storeName: "",
			password: "",
			confirmPassword: "",
		},
		mode: "onChange",
		resolver: yupResolver(storeSchema),
	});

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
					/>
				);
			case 3:
				return <StoreStep3 subscriptionType={subscriptionType} />;
		}
	};

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

	const employeeSubmit = (data) => {};

	const storeSubmit = (data) => {
		console.log(data);
		if (loading) return;
		setLoading(true);
		try {
			// const response = await createStore();
		} catch (error) {
			createNotification("error", error.message);
			console.error(error.message);
		} finally {
			setLoading(false);
		}

		if (subscriptionType !== 0) {
			handleCheckoutPage();
		}
	};

	useEffect(() => {
		let storeName = watch2("storeName");
		storeName = storeName.replace(/\s+/g, "-");
		setStoreUrl(storeName);
	}, [watch2("storeName")]);

	const handleCheckoutPage = async () => {
		try {
			const response = await createCheckoutSession(subscriptionType);

			if (response.status !== statusCodes.OK) {
				const errMsg = response.data.msg;
				createNotification("error", errMsg);
				console.error(errMsg);
				return;
			}

			const url = response.data.url;
			window.open(url, "_blank");
		} catch (error) {
			createNotification("error", error.message);
			console.error(error.message);
		}
	};

	const handleNext = () => {
		setActiveStep(activeStep + 1);
	};
	const handleBack = () => {
		setActiveStep((prevActiveStep) => prevActiveStep - 1);
	};

	const getDefaultStep = () => (
		<DefaultStep
			accountType={accountType}
			setAccountType={setAccountType}
		/>
	);

	const isFormValid = (errors, values) => {
		let valid = true;
		for (const value of Object.values(values))
			if (value.length === 0) valid = false;

		if (!isEmpty(errors)) valid = false;
		return valid;
		// return true;
	};

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
									type="button"
								>
									Back
								</Button>
								{activeStep === 2 ? (
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
										type="button"
										variant="contained"
										disabled={
											employeeType
												? !isFormValid(
														errors,
														getValues()
												  )
												: !isFormValid(
														errors2,
														getValues2()
												  )
										}
									>
										Next Step
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
