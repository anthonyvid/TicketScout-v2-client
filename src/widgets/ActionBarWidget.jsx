import { Autocomplete, Avatar, Badge, Divider, TextField } from "@mui/material";
import AutocompleteInput from "components/AutocompleteInput.jsx";
import CalendarPreview from "components/CalendarPreview.jsx";
import MessagePreview from "components/MessagePreview.jsx";
import useClasses from "hooks/useClasses.js";
import React, { useCallback, useContext, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { formatName, formatPhone, stringAvatar } from "utils/helper.js";
import actionBarWidgetStyles from "styles/widgets/ActionBarWidget.style.js";
import { useHotkeys } from "react-hotkeys-hook";
import { openModal } from "reducers/modal.js";
// import AccountCircleTwoToneIcon from "@mui/icons-material/AccountCircleTwoTone";
const ActionBarWidget = () => {
	const classes = useClasses(actionBarWidgetStyles);
	const { user } = useSelector((state) => state.authReducer);
	const inputRef = useRef();

	useHotkeys("ctrl+s", (e) => {
		e.preventDefault();
		inputRef.current.focus();
	});

	const { tickets, customers, payments } = useSelector(
		(state) => state.resourceReducer
	);

	const options = [
		...tickets.map((t) => ({
			label: t.ticketId,
			id: t._id,
			link: `/tickets/${t.ticketId}`,
			type: "Tickets",
		})),
		...customers.map((c) => ({
			label: `${c.firstname} ${c.lastname} (${c.phone})`,
			id: c._id,
			link: `/customers/${c._id}`,
			type: "Customers",
		})),
		...payments.map((p) => ({
			label: p.paymentId,
			id: p._id,
			link: `/payments/${p.paymentId}`,
			type: "Payments",
		})),
	];

	// const handleKeyPress = useCallback((event) => {
	// 	let charCode = String.fromCharCode(event.which).toLowerCase();
	// 	if ((event.ctrlKey || event.metaKey) && charCode === "x") {
	// 		inputRef.current.focus();
	// 	}
	// }, []);

	return (
		<div className={classes.actionBar}>
			<AutocompleteInput
				options={options}
				groupBy={"type"}
				label={"Search for something"}
				inputRef={inputRef}
			/>
			<div className={classes.infoWrap}>
				<CalendarPreview />
				<MessagePreview />
				<Divider orientation="vertical" flexItem />
				<div className={classes.userWrap}>
					<div className={classes.nameWrap}>
						<h4>{formatName(user.firstname, user.lastname)}</h4>
						<p>Phone Technician</p>
					</div>
					<Badge
						className={classes.avatarBadge}
						overlap="circular"
						anchorOrigin={{
							vertical: "bottom",
							horizontal: "right",
						}}
						variant="dot"
					>
						<Avatar
							{...stringAvatar(
								`${user.firstname} ${user.lastname}`
							)}
						/>
					</Badge>
				</div>
			</div>
		</div>
	);
};

export default ActionBarWidget;
