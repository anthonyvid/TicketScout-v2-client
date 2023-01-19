import {
	IconButton,
	InputAdornment,
	InputLabel,
	TextField,
} from "@mui/material";
import React, { useState } from "react";
import { Controller } from "react-hook-form";
import PropTypes from "prop-types";
import useClasses from "hooks/useClasses.js";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Link } from "react-router-dom";

const PLACEHOLDER = {
	EMAIL: "john@email.com",
	PASSWORD: "••••••••",
};

const textInputStyles = (theme) => ({
	errorText: {
		marginTop: "3px",
		marginBottom: "-17px",
		color: theme.palette.primary.error,
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
});

const TextInput = ({
	type,
	placeholder,
	errors,
	control,
	label,
	staticLabel,
	name,
	errorText,
	autoFocus,
	fullWidth,
	rules,
	peekPassword,
	altLabel,
}) => {
	const classes = useClasses(textInputStyles);
	const [showPassword, setShowPassword] = useState(false);
	const handleClickShowPassword = () => setShowPassword((show) => !show);
	if (type === "email") {
		placeholder = PLACEHOLDER.EMAIL;
	} else if (type === "password") {
		placeholder = PLACEHOLDER.PASSWORD;
	}

	return (
		<div className={classes.textInputWrap}>
			<div className={classes.labelWrap}>
				{staticLabel && <InputLabel>{label}</InputLabel>}
				{altLabel && (
					<Link to="/account/reset-password">
						<InputLabel>Forgot Password?</InputLabel>
					</Link>
				)}
			</div>
			<Controller
				control={control}
				rules={rules}
				render={({ field: { onChange, onBlur, value } }) => (
					<TextField
						onBlur={onBlur}
						onChange={onChange}
						value={value}
						placeholder={placeholder}
						type={peekPassword && showPassword ? "text" : type}
						autoFocus={autoFocus}
						fullWidth={fullWidth}
						label={staticLabel ? null : label}
						error={errors[name] !== undefined}
						InputProps={{
							endAdornment: peekPassword && (
								<InputAdornment position="end">
									<IconButton
										aria-label="toggle password visibility"
										onClick={handleClickShowPassword}
										edge="end"
									>
										{showPassword ? (
											<VisibilityOff />
										) : (
											<Visibility />
										)}
									</IconButton>
								</InputAdornment>
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
	errorText: "Required",
	staticLabel: false,
	autoFocus: false,
	fullWidth: false,
	peekPassword: false,
	altLabel: false,
	rules: {},
};

TextInput.propTypes = {
	placeholder: PropTypes.string,
	inputText: PropTypes.string,
	name: PropTypes.string,
	errorText: PropTypes.string,
	staticLabel: PropTypes.bool,
	autoFocus: PropTypes.bool,
	fullWidth: PropTypes.bool,
	peekPassword: PropTypes.bool,
	altLabel: PropTypes.bool,
	rules: PropTypes.object,
	errors: PropTypes.object,
	control: PropTypes.object,
};

export default TextInput;
