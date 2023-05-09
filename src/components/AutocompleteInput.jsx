import styled from "@emotion/styled";
import { Autocomplete, InputAdornment, TextField } from "@mui/material";
import useClasses from "hooks/useClasses.js";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import autocompleteInputStyles from "styles/components/AutocompleteInput.style.js";
import PropTypes from "prop-types";
import SearchIcon from "@mui/icons-material/Search";

const AutocompleteInput = ({
	options,
	groupBy,
	label,
	inputRef,
	onChangeHandler,
}) => {
	const classes = useClasses(autocompleteInputStyles);
	const navigate = useNavigate();
	const [open, setOpen] = useState(false);

	return (
		<Autocomplete
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
								<SearchIcon />
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
};

AutocompleteInput.propTypes = {
	options: PropTypes.array.isRequired,
	groupBy: PropTypes.string,
	label: PropTypes.string.isRequired,
	onChangeHandler: PropTypes.func
};

export default AutocompleteInput;
