import { Avatar, Badge, Divider } from "@mui/material";
import AutocompleteInput from "components/AutocompleteInput.jsx";
import CalendarPreview from "components/CalendarPreview.jsx";
import MessagePreview from "components/MessagePreview.jsx";
import useClasses from "hooks/useClasses.js";
import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";

import { formatName, stringAvatar } from "utils/helper.js";
import actionBarWidgetStyles from "styles/widgets/ActionBarWidget.style.js";
import { useHotkeys } from "react-hotkeys-hook";
import { search } from "services/search.service.js";
import { createNotification } from "utils/notification.js";
import { statusCodes } from "constants/client.constants.js";

const ActionBarWidget = () => {
	const classes = useClasses(actionBarWidgetStyles);
	const { user } = useSelector((state) => state.authReducer);
	const inputRef = useRef();
	const [options, setOptions] = useState([]);

	useHotkeys("ctrl+s", (e) => {
		e.preventDefault();
		inputRef.current.focus();
	});

	const fetchData = async (value) => {
		const options = {
			tickets: true,
			customers: true,
			payments: true,
			value,
		};

		try {
			const response = await search(options);

			const {
				data: { tickets, customers, payments },
			} = response;

			if (response.status !== statusCodes.OK)
				throw new Error(response.data.message || response.statusText);

			setOptions([
				...tickets.map((t) => ({
					label: `${t.ticketId}`,
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
			]);
		} catch (error) {
			createNotification("error", error.message);
			console.error(error.message);
		}
	};

	return (
		<div className={classes.actionBar}>
			<AutocompleteInput
				options={options}
				groupBy={"type"}
				label={"Search for something"}
				inputRef={inputRef}
				onChangeHandler={fetchData}
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
