import { Button, InputLabel, TextField } from "@mui/material";
import FlexContainer from "components/FlexContainer.jsx";
import TextInput from "components/TextInput.jsx";
import useClasses from "hooks/useClasses.js";
import React, { useState } from "react";
import Lottie from "react-lottie-player";
import { useNavigate } from "react-router-dom";
import resetPasswordStyles from "styles/pages/ResetPassword.style.js";
import lockLottie from "../../assets/lotties/lock.json";
import successLottie from "../../assets/lotties/checkoutSuccess.json";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { createNotification } from "utils/notification.js";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { resetPassword } from "services/user.service.js";
import { statusCodes } from "constants/statusCodes.constants.js";
import { cx } from "@emotion/css";

const ResetPassword = () => {
	const classes = useClasses(resetPasswordStyles);
	const navigate = useNavigate();
	const [loading, setLoading] = useState(false);
	const [isReset, setIsReset] = useState(false);
	const handleReset = () => {
		createNotification(
			"success",
			"Your password has been successfully reset."
		);
	};

	const schema = yup.object().shape({
		password: yup
			.string()
			.min(5, "Password must be at least 5 characters")
			.max(64, "Password cannot exceed 64 characters")
			.required("Password is required")
			.matches(/^(?=.*[a-z])/, "Password must include lowercase letter")
			.matches(/^(?=.*[A-Z])/, "Password must include uppercase letter")
			.matches(/^(?=.*[0-9])/, "Password must include digit")
			.matches(
				/^(?=.*[!@#\$%\^&\*])/,
				"Password must include special character"
			),
		confirmPassword: yup
			.string()
			.required("Please retype your password.")
			.oneOf([yup.ref("password")], "Your passwords do not match."),
	});

	const {
		control,
		handleSubmit,
		reset,
		setFocus,
		setValue,
		getValues,
		formState: { errors },
	} = useForm({
		defaultValues: {
			password: "",
			confirmPassword: "",
		},
		mode: "onChange",
		resolver: yupResolver(schema),
	});
	const handleResetPassword = async (data) => {
		if (loading) return;
		setLoading(true);

		try {
			// const response = await resetPassword(data);
			// console.log(response);
			// if (response.status !== statusCodes.OK)
			// 	throw new Error(response.data.message);

			setIsReset(true);
		} catch (error) {
			createNotification("error", error.message);
			console.error(error.message);
		} finally {
			setLoading(false);
		}
	};

	return (
		<FlexContainer col page justifyContentCenter alignItemsCenter>
			<div className={classes.wrap}>
				<div
					className={cx({
						[classes.lottieWrap]: !isReset,
						[classes.successLottieWrap]: isReset,
					})}
				>
					{!isReset ? (
						<Lottie
							animationData={lockLottie}
							loop={false}
							play
							rendererSettings={{
								preserveAspectRatio: "xMidYMid slice",
							}}
						/>
					) : (
						<Lottie
							animationData={successLottie}
							loop={false}
							play={isReset ? true : false}
							rendererSettings={{
								preserveAspectRatio: "xMidYMid slice",
							}}
						/>
					)}
				</div>
				<h1 className={classes.heading}>
					{!isReset ? `Set New Password` : `Password Reset`}
				</h1>
				<h3 className={classes.subheading}>
					{!isReset
						? `Your new password must be different from previously used
					passwords.`
						: `Your password has been successfully reset. Click below to log in magically.`}
				</h3>
				<form onSubmit={handleSubmit(handleResetPassword)}>
					{!isReset && (
						<>
							<TextInput
								staticLabel
								fullWidth
								peekPassword
								label="Password"
								name="password"
								type="password"
								control={control}
								errors={errors}
							/>
							<br />
							<TextInput
								staticLabel
								fullWidth
								peekPassword
								label="Confirm password"
								name="confirmPassword"
								type="password"
								control={control}
								errors={errors}
							/>
						</>
					)}
					{!isReset ? (
						<Button
							sx={{ marginTop: "15px" }}
							onClick={handleReset}
							className={classes.resetButton}
							variant="contained"
							type="submit"
							disabled={
								Object.values(errors).length > 0 ||
								!getValues("password") ||
								!getValues("confirmPassword")
							}
						>
							Reset password
						</Button>
					) : (
						<Button
							onClick={() => navigate("/dashboard")}
							className={classes.resetButton}
							variant="contained"
							type="button"
						>
							Continue
						</Button>
					)}
				</form>
				<Button
					startIcon={<ArrowBackIcon />}
					onClick={() => navigate("/account/login")}
					className={classes.resetButton}
					variant="text"
				>
					Back to login
				</Button>
			</div>
		</FlexContainer>
	);
};

export default ResetPassword;