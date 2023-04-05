import { Autocomplete, TextField } from "@mui/material";
import useClasses from "hooks/useClasses.js";
import React from "react";
import { useSelector } from "react-redux";
import actionBarStyles from "styles/widgets/ActionBar.style.js";
const options = [
	{ label: "The Godfather", id: 1 },
	{ label: "Pulp Fiction", id: 2 },
];
const ActionBar = () => {
	const classes = useClasses(actionBarStyles);
	const { tickets, customers, payments } = useSelector(
		(state) => state.resourceReducer
	);

	return (
		<div className={classes.actionBar}>
			<Autocomplete
				disablePortal
				id="combo-box-demo"
				options={options}
				sx={{ width: 300 }}
				renderInput={(params) => (
					<TextField {...params} label="Movie" />
				)}
			/>
		</div>
	);
};

export default ActionBar;
