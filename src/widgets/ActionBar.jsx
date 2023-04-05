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

	const searchOptions = [
		...Object.values(tickets).map((t) => ({ label: t.ticketId, id: t._id })),
		...Object.values(customers).map((c) => ({
			label: `${c.firstname} ${c.lastname}`,
			id: c._id,
		})),
		...Object.values(payments).map((p) => ({
			label: p.paymentId,
			id: p._id,
		})),
	];

	return (
		<div className={classes.actionBar}>
			<Autocomplete
				disablePortal
				id="combo-box-demo"
				options={searchOptions}
				sx={{ width: 300 }}
				renderInput={(params) => (
					<TextField {...params} label="Movie" />
				)}
			/>
		</div>
	);
};

export default ActionBar;
