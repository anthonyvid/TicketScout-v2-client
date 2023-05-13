import { useState } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { Controller } from "react-hook-form";

// Components
import {
	Autocomplete,
	InputAdornment,
	InputLabel,
	TextField,
} from "@mui/material";

// Hooks
import useClasses from "hooks/useClasses.js";

// Styles
import autocompleteInputStyles from "styles/components/AutocompleteInput.style.js";

const AutocompleteInput = ({
	options,
	groupBy,
	label,
	inputRef,
	onChangeHandler,
	inForm,
	name,
	fullWidth,
	control,
	icon,
	errors,
	staticLabel,
	placeholder,
	popupIcon,
	className,
	required,
	onSelect,
}) => {
	const classes = useClasses(autocompleteInputStyles);
	const navigate = useNavigate();
	const [open, setOpen] = useState(false);

	if (inForm) {
		return (
			<div className={classes.autocompleteInputWrap}>
				<div className={classes.labelWrap}>
					{staticLabel && (
						<InputLabel required={required}>{label}</InputLabel>
					)}
				</div>

				<Controller
					render={({ onChange, ...props }) => (
						<Autocomplete
							required={required}
							fullWidth={fullWidth}
							open={open}
							disablePortal
							options={options.map((option) => option)}
							onChange={(event, option) => {
								if (option?.link) navigate(option.link);
								onSelect(option.data);
							}}
							onInputChange={(_, value) => {
								if (value.length === 0) {
									if (open) setOpen(false);
								} else {
									if (!open) setOpen(true);
									onChangeHandler(value);
								}
							}}
							onClose={() => setOpen(false)}
							groupBy={groupBy && ((option) => option[groupBy])}
							className={className}
							popupIcon={popupIcon}
							renderGroup={
								groupBy &&
								((params) => (
									<li key={params.key}>
										<div className={classes.groupHeader}>
											{params.group}
										</div>
										<ul className={classes.groupItem}>
											{params.children}
										</ul>
									</li>
								))
							}
							renderInput={(params) => (
								<TextField
									{...params}
									error={errors[name] !== undefined}
									placeholder={placeholder}
									InputProps={{
										...params.InputProps,
										startAdornment: (
											<>
												{icon && (
													<InputAdornment position="start">
														{icon}
													</InputAdornment>
												)}
											</>
										),
									}}
									inputRef={inputRef}
								/>
							)}
						/>
					)}
					onChange={([, data]) => data}
					name={name}
					control={control}
				/>

				{errors[name] && (
					<div className={classes.errorText}>
						<span>{errors[name].message}</span>
					</div>
				)}
			</div>
		);
	}

	return (
		<Autocomplete
			fullWidth={fullWidth}
			open={open}
			disablePortal
			options={options.map((option) => option)}
			onChange={(event, option) => {
				navigate(option.link);
				onSelect(option.data);
			}}
			onInputChange={(_, value) => {
				if (value.length === 0) {
					if (open) setOpen(false);
				} else {
					if (!open) setOpen(true);
					onChangeHandler(value);
				}
			}}
			onClose={() => setOpen(false)}
			groupBy={groupBy && ((option) => option[groupBy])}
			className={className}
			popupIcon={popupIcon}
			renderGroup={
				groupBy &&
				((params) => (
					<li key={params.key}>
						<div className={classes.groupHeader}>
							{params.group}
						</div>
						<ul className={classes.groupItem}>{params.children}</ul>
					</li>
				))
			}
			renderInput={(params) => (
				<TextField
					{...params}
					placeholder={placeholder}
					error={errors[name] !== undefined}
					helperText={
						errors[name] !== undefined && errors[name].message
					}
					InputProps={{
						...params.InputProps,
						startAdornment: (
							<>
								{icon && (
									<InputAdornment position="start">
										{icon}
									</InputAdornment>
								)}
							</>
						),
					}}
					inputRef={inputRef}
				/>
			)}
		/>
	);
};

AutocompleteInput.defaultProps = {
	groupBy: null,
	icon: null,
	onChangeHandler: () => {},
	onSelect: () => {},
	inForm: false,
	name: "",
	fullWidth: false,
	staticLabel: false,
	required: false,
	control: {},
	errors: {},
};

AutocompleteInput.propTypes = {
	options: PropTypes.array.isRequired,
	groupBy: PropTypes.string,
	name: PropTypes.string,
	label: PropTypes.string,
	onChangeHandler: PropTypes.func,
	onSelect: PropTypes.func,
	inForm: PropTypes.bool,
	fullWidth: PropTypes.bool,
	required: PropTypes.bool,
};

export default AutocompleteInput;
