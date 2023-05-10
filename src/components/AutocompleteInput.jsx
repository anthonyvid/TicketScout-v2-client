import styled from "@emotion/styled";
import {
	Autocomplete,
	InputAdornment,
	InputLabel,
	TextField,
} from "@mui/material";
import useClasses from "hooks/useClasses.js";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import autocompleteInputStyles from "styles/components/AutocompleteInput.style.js";
import PropTypes from "prop-types";
import SearchIcon from "@mui/icons-material/Search";
import { Controller } from "react-hook-form";

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
}) => {
	const classes = useClasses(autocompleteInputStyles);
	const navigate = useNavigate();
	const [open, setOpen] = useState(false);

	if (inForm) {
		return (
			<div className={classes.autocompleteInputWrap}>
				<div className={classes.labelWrap}>
					{staticLabel && <InputLabel>{label}</InputLabel>}
				</div>

				<Controller
					render={({ onChange, ...props }) => (
						<Autocomplete
							fullWidth={fullWidth}
							open={open}
							disablePortal
							options={options.map((option) => option)}
							onChange={(event, option) => {
								if (option?.link) navigate(option.link);
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
							className={classes.autocomplete}
							popupIcon={""}
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
									InputProps={{
										...params.InputProps,
										startAdornment: (
											<InputAdornment position="start">
												{icon}
											</InputAdornment>
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
			className={classes.autocomplete}
			popupIcon={""}
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
					placeholder={label}
					InputProps={{
						...params.InputProps,
						startAdornment: (
							<InputAdornment position="start">
								{icon}
							</InputAdornment>
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
	onChangeHandler: () => {},
	inForm: false,
	name: "",
	icon: <SearchIcon />,
	fullWidth: false,
	staticLabel: false,
	control: {},
	errors: {},
};

AutocompleteInput.propTypes = {
	options: PropTypes.array.isRequired,
	groupBy: PropTypes.string,
	name: PropTypes.string,
	label: PropTypes.string.isRequired,
	onChangeHandler: PropTypes.func,
	inForm: PropTypes.bool,
	fullWidth: PropTypes.bool,
};

export default AutocompleteInput;
