import React, { useEffect, useState } from "react";

import userStep2Styles from "styles/components/registerSteps/UserStep2.style.js";
import useClasses from "hooks/useClasses.js";

import OtpInput from "components/OtpInput.jsx";
import { Button, CircularProgress } from "@mui/material";
import { statusCodes } from "constants/statusCodes.constants.js";
import { createNotification } from "utils/notification.js";
import { verifySignUpCode } from "services/auth.service.js";

const UserStep2 = ({ code, setCode, setVerified, setEmployerData }) => {
	const classes = useClasses(userStep2Styles);
	const [disabled, setDisabled] = useState(true);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		setDisabled(code.includes(""));
	}, [code]);

	const onVerify = async () => {
		if (loading) return;
		setLoading(true);
		try {
			const response = await verifySignUpCode(code.join(""));

			if (response.status !== statusCodes.OK) {
				setCode(new Array(6).fill(""));
				throw new Error(response.data.message || response.statusText);
			}

			createNotification(
				"success",
				"Successfully verified sign up code."
			);
			setVerified(true);
			setEmployerData(response.data);
		} catch (error) {
			createNotification("error", error.message);
			console.error(error.message);
		} finally {
			setLoading(false);
		}
	};

	return (
		<>
			<div className={classes.titleWrap}>
				<h1 className={classes.title}>Enter your sign up code</h1>
				<p className={classes.subtitle}>
					Dont have a sign up code? Find out more
				</p>
			</div>
			<div className={classes.contentWrap}>
				<div className={classes.otpWrap}>
					<OtpInput code={code} setCode={setCode} />
				</div>
				<Button
					onClick={() => onVerify()}
					variant="contained"
					disabled={disabled}
					style={{ marginBottom: "15px" }}
				>
					{loading ? <CircularProgress /> : "Verify Code"}
				</Button>
			</div>
		</>
	);
};

export default UserStep2;
