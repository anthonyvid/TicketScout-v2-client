import {
	employeeSchema,
	planTypes,
	storeSchema,
} from "constants/register.constants.js";
import { debounce } from "lodash";
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

import { isEmpty } from "lodash";
import { createCheckoutSession } from "services/stripe.service.js";
import { createNotification } from "utils/notification.js";
import { useSearchParams } from "react-router-dom";
import { statusCodes } from "constants/statusCodes.constants.js";
import { isUniqueEmail, register } from "services/user.service.js";
import {
	createOrganization,
	getOrganization,
	getOrganizations,
	isUniqueStoreName,
} from "services/organization.service.js";
import OrganizationStep1 from "components/registerSteps/OrganizationStep1.jsx";
import OrganizationStep2 from "components/registerSteps/OrganizationStep2.jsx";

const EMPLOYEE_STEPS = 3;
const STORE_STEPS = 3;
const REBOUNCE_DELAY = 750;

const Register = () => {
	const classes = useClasses(registerStyles);
	const [loading, setLoading] = useState(false);

	const [uniqueStoreName, setUniqueStoreName] = useState("");
	const [uniqueEmail, setUniqueEmail] = useState("");
	const [signUpCode, setSignUpCode] = useState(new Array(6).fill(""));
	const [activeStep, setActiveStep] = useState(0);
	const [planType, setPlanType] = useState(0);
	const [storeUrl, setStoreUrl] = useState("");
	const [signUpCodeVerified, setSignUpCodeVerified] = useState(true); //todo: change back to false after
	const [accountType, setAccountType] = useState(0);
	const [storeNameRebounce, setStoreNameRebounce] = useState("");
	const [emailRebounce, setEmailRebounce] = useState("");
	const defaultView = activeStep === 0;
	const employeeType = accountType === 0;

	const storeNameRebounced = (e) => setStoreNameRebounce(e?.target?.value);
	const emailRebounced = (e) => setEmailRebounce(e?.target?.value);

	const storeNameDebounceOnChange = debounce(
		storeNameRebounced,
		REBOUNCE_DELAY
	);
	const emailDebounceOnChange = debounce(emailRebounced, REBOUNCE_DELAY);

	const phoneRegExp =
		/^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

	const storeSchema = yup.object().shape({
		firstname: yup.string().required("First name is required."),
		lastname: yup.string().required("Last name is required."),
		email: yup
			.string()
			.email("Invalid email address.")
			.required("Email address is required."),
		phoneNumber: yup
			.string()
			.max(12, "Phone number cannot exceed 12 characters.")
			.required("Phone number is required.")
			.matches(phoneRegExp, "Invalid phone number."),
		storeName: yup
			.string()
			.required("Store name is required.")
			.matches(/^(?!\s+$).*/, "Invalid store name."),
		password: yup.string(),
		// .min(5, "Password must be at least 5 characters.")
		// .max(64, "Password cannot exceed 64 characters.")
		// .required("Password is required.")
		// .matches(/^(?=.*[a-z])/, "Password must include lowercase letter.")
		// .matches(/^(?=.*[A-Z])/, "Password must include uppercase letter.")
		// .matches(/^(?=.*[0-9])/, "Password must include digit.")
		// .matches(
		// 	/^(?=.*[!@#\$%\^&\*])/,
		// 	"Password must include special character."
		// ),
		confirmPassword: yup
			.string()
			.required("Please retype your password.")
			.oneOf([yup.ref("password")], "Your passwords do not match."),
	});

	const employeeSchema = yup.object().shape({
		firstname: yup.string().required("First name is required."),
		lastname: yup.string().required("Last name is required."),
		email: yup
			.string()
			.email("Invalid email address.")
			.required("Email address is required."),
		phoneNumber: yup
			.string()
			.max(12, "Phone number cannot exceed 12 characters.")
			.required("Phone number is required.")
			.matches(phoneRegExp, "Invalid phone number."),
		password: yup
			.string()
			.min(5, "Password must be at least 5 characters.")
			.max(64, "Password cannot exceed 64 characters.")
			.required("Password is required.")
			.matches(/^(?=.*[a-z])/, "Password must include lowercase letter.")
			.matches(/^(?=.*[A-Z])/, "Password must include uppercase letter.")
			.matches(/^(?=.*[0-9])/, "Password must include digit.")
			.matches(
				/^(?=.*[!@#\$%\^&\*])/,
				"Password must include special character."
			),
		confirmPassword: yup
			.string()
			.required("Please retype your password.")
			.oneOf([yup.ref("password")], "Your passwords do not match."),
	});

	const {
		control,
		handleSubmit,
		getValues,
		reset: reset,
		setError: setError,
		clearErrors: clearErrors,
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
		setError: setError2,
		reset: reset2,
		clearErrors: clearErrors2,
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
					<OrganizationStep1
						control={control2}
						errors={errors2}
						storeUrl={storeUrl}
						debouncedOnChange={[
							storeNameDebounceOnChange,
							emailDebounceOnChange,
						]}
						uniqueStoreName={uniqueStoreName}
						uniqueEmail={uniqueEmail}
						storeNameRebounce={storeNameRebounce}
						emailRebounce={emailRebounce}
					/>
				);
			case 2:
				return (
					<OrganizationStep2
						setPlanType={setPlanType}
						planType={planType}
					/>
				);
		}
	};

	const getEmployeeSteps = () => {
		switch (activeStep) {
			case 0:
				return getDefaultStep();
			case 1:
				return <EmployeeStep2 control={control} errors={errors} />;
			case 2:
				return (
					<EmployeeStep1
						code={signUpCode}
						setCode={setSignUpCode}
						setVerified={setSignUpCodeVerified}
					/>
				);
		}
	};

	const employeeSubmit = (data) => {};

	const storeSubmit = async (data) => {
		if (loading) return;
		setLoading(true);

		const storeData = {
			...data,
			planType,
			storeUrl,
		};

		try {
			const response = await createOrganization(storeData);
			console.log(response);
			if (response.status !== statusCodes.OK) {
				setError2(
					response.data.key,
					{ type: "focus", message: response.data.message },
					{ shouldFocus: true }
				);
				if (response.data.key === "storeName")
					setUniqueStoreName(false);
				if (response.data.key === "email") setUniqueEmail(false);
				if (response.data.key !== "planType") setActiveStep(1);
				throw new Error(response.data.message);
			}

			if (planType !== planTypes.BASIC) {
				handleCheckoutPage();
			}
		} catch (error) {
			createNotification("error", error.message);
			console.error(error.message);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		let storeName = watch2("storeName");
		storeName = storeName.replace(/\s+/g, "-");

		if (storeName.slice(-1) === "-") storeName = storeName.slice(0, -1);
		if (storeName.charAt(0) === "-") storeName = storeName.substring(1);

		setStoreUrl(storeName);
	}, [watch2("storeName")]);

	useEffect(() => {
		if (activeStep !== 1 || storeNameRebounce === "") return;
		const fetchData = async () => {
			try {
				const response = await isUniqueStoreName(storeNameRebounce);
				if (response.status !== statusCodes.OK)
					throw new Error(response.data.message);

				const isUnique = response.data.isUnique;
				setUniqueStoreName(isUnique);
			} catch (error) {
				createNotification("error", error.message);
				console.error(error.message);
			}
		};

		fetchData().catch(console.error);
	}, [storeNameRebounce]);

	useEffect(() => {
		if (activeStep !== 1 || emailRebounce === "" || errors2.email) return;
		const fetchData = async () => {
			try {
				const response = await isUniqueEmail(emailRebounce);
				if (response.status !== statusCodes.OK)
					throw new Error(response.data.message);

				const isUnique = response.data.isUnique;
				setUniqueEmail(isUnique);
			} catch (error) {
				createNotification("error", error.message);
				console.error(error.message);
			}
		};

		fetchData().catch(console.error);
	}, [emailRebounce]);

	const handleCheckoutPage = async () => {
		try {
			const response = await createCheckoutSession(planType);

			if (response.status !== statusCodes.OK) {
				throw new Error(response.data.msg);
			}

			const url = response.data.url;
			window.open(url, "_blank");
		} catch (error) {
			createNotification("error", error.message);
			console.error(error.message);
		}
	};

	const handleNext = (e) => {
		e.preventDefault();
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

		if (!isEmpty(errors) || !uniqueStoreName || !uniqueEmail) valid = false;

		return valid;
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
								onClick={(e) => handleNext(e)}
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
										style={{
											display:
												activeStep !== 2
													? "block"
													: "hidden",
										}}
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
