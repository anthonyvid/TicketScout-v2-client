import {
	CircularProgress,
	IconButton,
	InputAdornment,
	InputLabel,
	TextField,
} from "@mui/material";
import React, { useCallback, useState } from "react";
import { Controller } from "react-hook-form";
import PropTypes from "prop-types";
import useClasses from "hooks/useClasses.js";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import KeyboardCapslockIcon from "@mui/icons-material/KeyboardCapslock";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ErrorIcon from "@mui/icons-material/Error";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import { cx } from "@emotion/css";

const PLACEHOLDER = {
	EMAIL: "john@email.com",
	PASSWORD: "••••••••",
};

const textInputStyles = (theme) => ({
	errorText: {
		marginTop: "3px",
		marginBottom: "-17px",
		color: theme.palette.primary.error,
		textAlign: "left",
	},
	textInputWrap: {
		width: "100%",
		marginBottom: "10px",
	},
	labelWrap: {
		display: "flex",
		marginBottom: "5px",
		justifyContent: "space-between",
	},
	errorIcon: {
		color: theme.palette.primary.error,
	},
	successIcon: {
		color: theme.palette.primary.success,
	},

	input: {
		borderRadius: "10px",
	},
	startIcon: {
		color: theme.palette.neutral.main,
		marginRight: "7px",
	},
	// error: {
	// 	background: `${theme.palette.primary.error}20`,
	// },
	// success: {
	// 	background: `${theme.palette.primary.main}20`,
	// 	"& .MuiOutlinedInput-root": {
	// 		"& fieldset": {
	// 			borderColor: theme.palette.primary.main,
	// 		},
	// 	},
	// },
});

const TextInput = ({
	type,
	placeholder,
	errors,
	control,
	disabled,
	label,
	staticLabel,
	name,
	autoFocus,
	fullWidth,
	rules,
	peekPassword,
	altLabel,
	onChangeHandler,
	uniqueDataValidation,
	isDataUnique,
	uniqueData,
}) => {
	const classes = useClasses(textInputStyles);
	const [showPassword, setShowPassword] = useState(false);
	const [capsOn, setCapsOn] = useState(false);
	const handleClickShowPassword = () => setShowPassword((show) => !show);
	if (type === "email") {
		placeholder = PLACEHOLDER.EMAIL;
	} else if (type === "password") {
		placeholder = PLACEHOLDER.PASSWORD;
	}

	const getStartIcon = () => {
		switch (type) {
			case "email":
				return <EmailIcon className={classes.startIcon} />;
			case "password":
				return <LockIcon className={classes.startIcon} />;

			default:
				break;
		}
	};

	const checkForCaps = useCallback(
		(e) => {
			if (e.getModifierState("CapsLock")) {
				setCapsOn(true);
			} else {
				setCapsOn(false);
			}
		},
		[capsOn]
	);

	return (
		<div className={classes.textInputWrap}>
			<div className={classes.labelWrap}>
				{staticLabel && <InputLabel>{label}</InputLabel>}
				{altLabel && (
					<Link tabIndex="-1" to="/account/forgot-password">
						<InputLabel>Forgot Password</InputLabel>
					</Link>
				)}
			</div>
			<Controller
				control={control}
				rules={rules}
				render={({ field: { onChange, onBlur, value } }) => (
					<TextField
						className={cx(classes.input, {
							[classes.error]: errors[name],
							[classes.success]: !errors[name] && value,
						})}
						onBlur={onBlur}
						onChange={(value) => {
							onChange(value);
							onChangeHandler(value);
						}}
						value={value}
						placeholder={placeholder}
						type={peekPassword && showPassword ? "text" : type}
						onKeyUp={(e) => type === "password" && checkForCaps(e)}
						onKeyDown={(e) =>
							type === "password" && checkForCaps(e)
						}
						autoFocus={autoFocus}
						fullWidth={fullWidth}
						disabled={disabled}
						label={staticLabel ? null : label}
						error={errors[name] !== undefined}
						InputProps={{
							startAdornment: getStartIcon(),
							endAdornment: (
								<>
									{type === "password" && (
										<InputAdornment position="end">
											{capsOn ? (
												<KeyboardCapslockIcon />
											) : (
												""
											)}
										</InputAdornment>
									)}
									{peekPassword && (
										<InputAdornment position="start">
											<IconButton
												tabIndex={-1}
												aria-label="toggle password visibility"
												onClick={
													handleClickShowPassword
												}
												edge="end"
											>
												{showPassword ? (
													<VisibilityOff />
												) : (
													<Visibility />
												)}
											</IconButton>
										</InputAdornment>
									)}
									{uniqueDataValidation && (
										<InputAdornment position="end">
											{uniqueData !== "" ? (
												isDataUnique ? (
													<CheckCircleIcon
														className={
															classes.successIcon
														}
													/>
												) : (
													<ErrorIcon
														className={
															classes.errorIcon
														}
													/>
												)
											) : (
												""
											)}
										</InputAdornment>
									)}
								</>
							),
						}}
					/>
				)}
				name={name}
			/>
			{errors[name] && (
				<div className={classes.errorText}>
					<span>{errors[name].message}</span>
				</div>
			)}
		</div>
	);
};

TextInput.defaultProps = {
	placeholder: "",
	inputText: "",
	name: "",
	staticLabel: false,
	autoFocus: false,
	fullWidth: false,
	peekPassword: false,
	disabled: false,
	uniqueDataValidation: false,
	uniqueData: "",
	altLabel: false,
	rules: {},
	onChangeHandler: () => {},
};

TextInput.propTypes = {
	placeholder: PropTypes.string,
	uniqueData: PropTypes.string,
	inputText: PropTypes.string,
	name: PropTypes.string,
	staticLabel: PropTypes.bool,
	autoFocus: PropTypes.bool,
	uniqueDataValidation: PropTypes.bool,
	fullWidth: PropTypes.bool,
	peekPassword: PropTypes.bool,
	disabled: PropTypes.bool,
	altLabel: PropTypes.bool,
	rules: PropTypes.object,
	errors: PropTypes.object,
	control: PropTypes.object,
	onChangeHandler: PropTypes.func,
};

export default TextInput;
