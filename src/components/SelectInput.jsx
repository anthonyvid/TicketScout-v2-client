import { InputLabel, MenuItem, Select } from "@mui/material";
import useClasses from "hooks/useClasses.js";
import React from "react";
import selectInputStyles from "styles/components/SelectInput.style.js";

import { Controller } from "react-hook-form";
import PropTypes from "prop-types";

const SelectInput = ({
	staticLabel,
	label,
	control,
	errors,
	rules,
	fullWidth,
	name,
	onChangeHandler,
	autoFocus,
	disabled,
	options,
}) => {
	const classes = useClasses(selectInputStyles);
	return (
		<div className={classes.selectInputWrap}>
			<div className={classes.labelWrap}>
				{staticLabel && <InputLabel>{label}</InputLabel>}
			</div>

			<Controller
				control={control}
				rules={rules}
				render={({ field: { onChange, onBlur, value } }) => (
					<Select
						autoFocus={autoFocus}
						fullWidth={fullWidth}
						onBlur={onBlur}
						onChange={(value) => {
							onChange(value);
							onChangeHandler(value);
						}}
						disabled={disabled}
						error={errors[name] !== undefined}
						value={value}
						label={staticLabel ? null : label}
					>
						{options.map((option, i) => (
							<MenuItem key={`${option}-${i}`} value={option}>
								{option}
							</MenuItem>
						))}
					</Select>
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

SelectInput.defaultProps = {
	staticLabel: false,
	rules: {},
	fullWidth: false,
	name: "",
	onChangeHandler: () => {},
	autoFocus: false,
	disabled: false,
};

SelectInput.propTypes = {
	staticLabel: PropTypes.bool,
	fullWidth: PropTypes.bool,
	autoFocus: PropTypes.bool,
	disabled: PropTypes.bool,
	rules: PropTypes.object,
	onChangeHandler: PropTypes.func,
	name: PropTypes.string,
	label: PropTypes.string.isRequired,
	errors: PropTypes.object,
	control: PropTypes.object,
};

export default SelectInput;
