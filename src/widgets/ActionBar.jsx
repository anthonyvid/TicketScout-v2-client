import { Autocomplete, Divider, TextField } from "@mui/material";
import AutocompleteInput from "components/AutocompleteInput.jsx";
import CalendarPreview from "components/CalendarPreview.jsx";
import MessagePreview from "components/MessagePreview.jsx";
import useClasses from "hooks/useClasses.js";
import React from "react";
import { useSelector } from "react-redux";
import actionBarStyles from "styles/widgets/ActionBar.style.js";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
// import AccountCircleTwoToneIcon from "@mui/icons-material/AccountCircleTwoTone";
const ActionBar = () => {
	const classes = useClasses(actionBarStyles);
	const { user } = useSelector((state) => state.authReducer);

	const { tickets, customers, payments } = useSelector(
		(state) => state.resourceReducer
	);

	const options = [
		...Object.values(tickets).map((t) => ({
			label: t.ticketId,
			id: t._id,
			link: `/tickets/${t.ticketId}`,
			type: "Tickets",
		})),
		...Object.values(customers).map((c) => ({
			label: `${c.firstname} ${c.lastname}`,
			id: c._id,
			link: `/customers/${c._id}`,
			type: "Customers",
		})),
		...Object.values(payments).map((p) => ({
			label: p.paymentId,
			id: p._id,
			link: `/payments/${p.paymentId}`,
			type: "Payments",
		})),
	];

	return (
		<div className={classes.actionBar}>
			<AutocompleteInput
				options={options}
				groupBy={"type"}
				label={"Search for something"}
			/>
			<div className={classes.infoWrap}>
				<CalendarPreview />
				<MessagePreview />
				<Divider orientation="vertical" flexItem />
				<div className={classes.userWrap}>
					<div className={classes.nameWrap}>
						<h4>Anthony Vidovic</h4>
						<p>Phone technician</p>
					</div>
					<div className={classes.profilePic}>{/* <p>{}</p> */}</div>
				</div>
			</div>
		</div>
	);
};

export default ActionBar;
