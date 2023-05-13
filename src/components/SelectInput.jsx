import { Controller } from "react-hook-form";
import PropTypes from "prop-types";

// Components
import { InputLabel, MenuItem, Select } from "@mui/material";

// Hooks
import useClasses from "hooks/useClasses.js";

// Styles
import selectInputStyles from "styles/components/SelectInput.style.js";

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
	required,
}) => {
	const classes = useClasses(selectInputStyles);
	return (
		<div className={classes.selectInputWrap}>
			<div className={classes.labelWrap}>
				{staticLabel && (
					<InputLabel required={required}>{label}</InputLabel>
				)}
			</div>

			<Controller
				control={control}
				rules={rules}
				render={({ field: { onChange, onBlur, value } }) => (
					<Select
						required={required}
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
	required: false,
};

SelectInput.propTypes = {
	staticLabel: PropTypes.bool,
	fullWidth: PropTypes.bool,
	required: PropTypes.bool,
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
