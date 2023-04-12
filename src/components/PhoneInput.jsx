import {
	IconButton,
	InputAdornment,
	InputLabel,
	TextField,
} from "@mui/material";

import { Controller } from "react-hook-form";
import PropTypes from "prop-types";
import useClasses from "hooks/useClasses.js";
import { isNumber } from "utils/helper.js";

const PhoneInputStyles = (theme) => ({
	errorText: {
		marginTop: "3px",
		marginBottom: "-17px",
		color: theme.palette.error.custom,
		textAlign: "left",
	},
	PhoneInputWrap: {
		width: "100%",
		marginBottom: "10px",
	},
	labelWrap: {
		display: "flex",
		marginBottom: "5px",
		justifyContent: "space-between",
	},
});

const PhoneInput = ({
	placeholder,
	errors,
	control,
	label,
	staticLabel,
	name,
	autoFocus,
	fullWidth,
	rules,
}) => {
	const classes = useClasses(PhoneInputStyles);

	const handleKeyUp = (e) => {
		if (
			(e.key !== "Backspace" && e.target.value.length === 3) ||
			e.target.value.length === 7
		) {
			e.target.value += "-";
		}
	};

	return (
		<div className={classes.PhoneInputWrap}>
			<div className={classes.labelWrap}>
				{staticLabel && <InputLabel>{label}</InputLabel>}
			</div>
			<Controller
				control={control}
				rules={rules}
				render={({ field: { onChange, onBlur, value } }) => (
					<TextField
						inputProps={{ maxLength: 12 }}
						onBlur={onBlur}
						onChange={onChange}
						value={value}
						placeholder={placeholder}
						type={"text"}
						onKeyUp={(e) => handleKeyUp(e)}
						autoFocus={autoFocus}
						fullWidth={fullWidth}
						label={staticLabel ? null : label}
						error={errors[name] !== undefined}
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

export default PhoneInput;
