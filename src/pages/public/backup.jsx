import {
	phoneRegExp,
	planTypes,
	registerTypes,
} from "constants/register.constants.js";
import { debounce, isNumber } from "lodash";
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
import UserStep1 from "components/registerSteps/UserStep1.jsx";
import UserStep2 from "components/registerSteps/UserStep2.jsx";

import { isEmpty } from "lodash";
import { createCheckoutSession } from "services/stripe.service.js";
import { createNotification } from "utils/notification.js";
import { useNavigate, useSearchParams } from "react-router-dom";
import { statusCodes } from "constants/statusCodes.constants.js";

import { createOrganization } from "services/organization.service.js";
import OrganizationStep1 from "components/registerSteps/OrganizationStep1.jsx";
import OrganizationStep2 from "components/registerSteps/OrganizationStep2.jsx";
import {
	register,
	isUniqueEmail,
	isUniqueStoreName,
} from "services/auth.service.js";
import { reducer } from "reducers/index.js";

const USER_STEPS = 3;
const STORE_STEPS = 3;
const REBOUNCE_DELAY = 750;

const initialState = {
	loading: false,
	uniqueStoreName: "",
	uniqueEmail: "",
	signUpCode: new Array(6).fill(""),
	activeStep: 0,
	planType: planTypes.BASIC,
	storeUrl: "",
	signUpCodeVerified: false,
	accountType: registerTypes.USER,
	storeNameRebounce: "",
	emailRebounce: "",
};

const Register = () => {
	const classes = useClasses(registerStyles);
	const [state, setState] = useReducer(reducer, initialState);

	const setLoading = (value) => setState({ loading: value });
	const setUniqueStoreName = (value) => setState({ uniqueStoreName: value });
	const setUniqueEmail = (value) => setState({ uniqueEmail: value });
	const setSignUpCode = (value) => setState({ signUpCode: value });
	const setActiveStep = (value) => setState({ activeStep: value });
	const setPlanType = (value) => setState({ planType: value });
	const setStoreUrl = (value) => setState({ storeUrl: value });
	const setSignUpCodeVerified = (value) =>
		setState({ signUpCodeVerified: value });
	const setAccountType = (value) => setState({ accountType: value });
	const setStoreNameRebounce = (value) =>
		setState({ storeNameRebounce: value });
	const setEmailRebounce = (value) => setState({ emailRebounce: value });

	const [searchParams] = useSearchParams();
	const defaultView = state.activeStep === 0;
	const userType = state.accountType === registerTypes.USER;
	const storeNameRebounced = (e) => setStoreNameRebounce(e?.target?.value);
	const emailRebounced = (e) => setEmailRebounce(e?.target?.value);

	const storeNameDebounceOnChange = debounce(
		storeNameRebounced,
		REBOUNCE_DELAY
	);
	const emailDebounceOnChange = debounce(emailRebounced, REBOUNCE_DELAY);

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

	const userSchema = yup.object().shape({
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
		resolver: yupResolver(userSchema),
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
		switch (state.activeStep) {
			case 0:
				return getDefaultStep();
			case 1:
				return (
					<OrganizationStep1
						control={control2}
						errors={errors2}
						storeUrl={state.storeUrl}
						debouncedOnChange={[
							storeNameDebounceOnChange,
							emailDebounceOnChange,
						]}
						uniqueStoreName={state.uniqueStoreName}
						uniqueEmail={state.uniqueEmail}
						storeNameRebounce={state.storeNameRebounce}
						emailRebounce={state.emailRebounce}
					/>
				);
			case 2:
				return (
					<OrganizationStep2
						setPlanType={setPlanType}
						planType={state.planType}
					/>
				);
		}
	};

	const getUserSteps = () => {
		switch (state.activeStep) {
			case 0:
				return getDefaultStep();
			case 1:
				return (
					<UserStep1
						control={control}
						errors={errors}
						debouncedOnChange={[emailDebounceOnChange]}
						emailRebounce={state.emailRebounce}
						uniqueEmail={state.uniqueEmail}
					/>
				);
			case 2:
				return (
					<UserStep2
						code={state.signUpCode}
						setCode={setSignUpCode}
						setVerified={setSignUpCodeVerified}
					/>
				);
		}
	};

	const userSubmit = async (data) => {
		if (state.loading) return;
		setLoading(true);

		const userData = {
			...data,
			signUpCode: state.signUpCode,
			signUpCodeVerified: state.signUpCodeVerified,
			// organizationId: employerData.store_id,
		};

		try {
			const response = await register(userData);
			console.log(response);
			if (response.status !== statusCodes.OK) {
				setError(
					response.data.key,
					{ type: "focus", message: response.data.message },
					{ shouldFocus: true }
				);
				if (response.data.key === "email") setUniqueEmail(false);
				if (response.data.key !== "planType") setActiveStep(1);
				throw new Error(response.data.message);
			}
		} catch (error) {
			createNotification("error", error.message);
			console.error(error.message);
		} finally {
			setLoading(false);
		}
	};

	const organizationSubmit = async (data) => {
		if (state.loading) return;
		setLoading(true);

		const storeData = {
			...data,
			planType: state.planType,
			storeUrl: state.storeUrl,
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

			if (state.planType !== planTypes.BASIC) {
				handleCheckoutPage();
			}
		} catch (error) {
			createNotification("error", error.message);
			console.error(error.message);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => console.log(state), []);

	useEffect(() => {
		if (userType) {
			clearErrors2();
			reset2();
		} else {
			clearErrors();
			reset();
		}
		setUniqueStoreName("");
		setUniqueEmail("");
		setStoreNameRebounce("");
		setEmailRebounce("");
	}, [state.accountType]);

	useEffect(() => {
		let storeName = watch2("storeName");
		storeName = storeName.replace(/\s+/g, "-");

		if (storeName.slice(-1) === "-") storeName = storeName.slice(0, -1);
		if (storeName.charAt(0) === "-") storeName = storeName.substring(1);

		setStoreUrl(storeName);
	}, [watch2("storeName")]);

	useEffect(() => {
		if (state.activeStep !== 1 || state.storeNameRebounce === "") return;
		const fetchData = async () => {
			try {
				const response = await isUniqueStoreName(
					state.storeNameRebounce
				);
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
	}, [state.storeNameRebounce]);

	useEffect(() => {
		if (
			state.activeStep !== 1 ||
			state.emailRebounce === "" ||
			(userType ? errors.email : errors2.email)
		)
			return;
		const fetchData = async () => {
			try {
				const response = await isUniqueEmail(state.emailRebounce);
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
	}, [state.emailRebounce]);

	useEffect(() => {
		const type = parseInt(searchParams.get("type"));
		const step = parseInt(searchParams.get("step"));

		if (!type && !step) return;
		if (type !== registerTypes.USER && type !== registerTypes.ORGANIZATION)
			return;

		if (step < 0 || step > (userType ? USER_STEPS - 1 : STORE_STEPS - 1))
			return;

		setAccountType(type);
		setActiveStep(step);
	}, [searchParams.get("type"), searchParams.get("step")]);

	const handleCheckoutPage = async () => {
		try {
			const response = await createCheckoutSession(
				state.planType,
				getValues2("email")
			);

			if (response.status !== statusCodes.OK) {
				throw new Error(response.data.message);
			}

			const url = response.data.url;

			window.open(url, "_self");
		} catch (error) {
			createNotification("error", error.message);
			console.error(error.message);
		}
	};

	const handleNext = (e) => {
		e.preventDefault();
		setActiveStep(state.activeStep + 1);
	};
	const handleBack = () => {
		setActiveStep(state.activeStep - 1);
	};

	const getDefaultStep = () => (
		<DefaultStep
			accountType={state.accountType}
			setAccountType={setAccountType}
		/>
	);

	const isFormValid = (errors, values) => {
		let valid = true;
		for (const value of Object.values(values))
			if (value.length === 0) valid = false;

		if (!isEmpty(errors) || !state.uniqueEmail) valid = false;

		if (!userType && !state.uniqueStoreName) {
			valid = false;
		}

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
						userType
							? handleSubmit(userSubmit)
							: handleSubmit2(organizationSubmit)
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
						{userType
							? getUserSteps(state.activeStep)
							: getStoreSteps(state.activeStep)}
						{defaultView && (
							<Button
								sx={{ borderRadius: "8px" }}
								className={classes.continueBtn}
								onClick={(e) => {
									handleNext(e);
								}}
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
								{state.activeStep === 2 ? (
									<Button
										className={classes.nextBtn}
										variant="contained"
										type="submit"
										disabled={
											userType
												? !state.signUpCodeVerified
												: false
										}
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
											userType
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
							activeStep={state.activeStep}
							steps={userType ? USER_STEPS : STORE_STEPS}
						/>
					</div>
				</form>
			</FlexContainer>
		</FlexContainer>
	);
};

export default Register;
