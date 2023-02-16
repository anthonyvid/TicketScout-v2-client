import { Button, InputLabel, TextField } from "@mui/material";
import FlexContainer from "components/FlexContainer.jsx";
import TextInput from "components/TextInput.jsx";
import useClasses from "hooks/useClasses.js";
import React, { useState } from "react";
import Lottie from "react-lottie-player";
import { useNavigate } from "react-router-dom";
import forgotPasswordStyles from "styles/pages/ForgotPassword.style.js";
import lockLottie from "../../assets/lotties/lock.json";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { createNotification } from "utils/notification.js";
import { isEmail } from "utils/helper.js";
import { forgotPassword } from "services/auth.service.js";
import { statusCodes } from "constants/statusCodes.constants.js";

const ForgotPassword = () => {
	const classes = useClasses(forgotPasswordStyles);
	const [email, setEmail] = useState("");

	const navigate = useNavigate();
	const handleReset = async () => {
		try {
			if (isEmail(email)) {
				const response = await forgotPassword(email);
				console.log(response);

				if (response.status !== statusCodes.OK)
					throw new Error(
						response.data.message || response.statusText
					);
			}
		} catch (error) {
			createNotification("error", error.message);
			console.error(error.message);
		}

		createNotification(
			"success",
			"Your reset instructions have been send to your email."
		);
	};

	return (
		<FlexContainer col page justifyContentCenter alignItemsCenter>
			<div className={classes.wrap}>
				<div className={classes.lottieWrap}>
					<Lottie
						animationData={lockLottie}
						loop={false}
						play
						rendererSettings={{
							preserveAspectRatio: "xMidYMid slice",
						}}
					/>
				</div>
				<h1 className={classes.heading}>Forgot Password?</h1>
				<h3 className={classes.subheading}>
					No worries, we'll send you reset instructions.
				</h3>

				<InputLabel
					sx={{
						fontWeight: "600",
						marginBottom: "-20px",
						textAlign: "left",
					}}
				>
					Email
				</InputLabel>
				<TextField
					className={classes.emailInput}
					type="email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					placeholder="Enter your email"
				/>
				<Button
					onClick={handleReset}
					className={classes.resetButton}
					variant="contained"
				>
					Reset password
				</Button>
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

export default ForgotPassword;
