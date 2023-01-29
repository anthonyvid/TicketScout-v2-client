import React, { useEffect, useState } from "react";
import { cx } from "@emotion/css";
import employeeStep1Styles from "styles/components/registerSteps/EmployeeStep1.style.js";
import useClasses from "hooks/useClasses.js";
import ReactCodeInput from "react-code-input";
import TextInput from "components/TextInput.jsx";
import OtpInput from "components/OtpInput.jsx";
import { Button, CircularProgress } from "@mui/material";
import { statusCodes } from "constants/statusCodes.constants.js";
import { createNotification } from "utils/notification.js";
import { verifySignUpCode } from "services/account.service.js";

const EmployeeStep1 = ({ code, setCode, setVerified }) => {
	const classes = useClasses(employeeStep1Styles);
	const [disabled, setDisabled] = useState(true);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		setDisabled(code.includes(""));
	}, [code]);

	const onVerify = async () => {
		try {
			setLoading(true);

			const response = await verifySignUpCode(code);

			if (response.status !== statusCodes.OK) {
				const errMsg = response.data.msg;
				const key = response.data.key;
				createNotification("error", errMsg);
				console.error(errMsg);
				return;
			}

			setCode(new Array(6).fill(""));
			createNotification("success", "Success");
			setVerified(true);
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

export default EmployeeStep1;
