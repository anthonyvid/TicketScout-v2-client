import { Divider } from "@mui/material";
import PageLayout from "components/PageLayout.jsx";
import PageTitle from "components/PageTitle.jsx";
import { statusCodes } from "constants/client.constants.js";
import useClasses from "hooks/useClasses.js";
import React, { useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import { getTicketById } from "services/ticket.service.js";
import ticketStyles from "styles/pages/Ticket.style.js";
import { createNotification } from "utils/notification.js";
import ActionBarWidget from "widgets/ActionBarWidget.jsx";

const Ticket = () => {
	const classes = useClasses(ticketStyles);
	const location = useLocation();
	const ticketId = location?.pathname.match(/\d+$/)[0];

	const [ticket, setTicket] = useState(location?.state?.ticket);

	const fetchTicket = async () => {
		try {
			const response = await getTicketById(ticketId);
			setTicket(response.data.ticket);
			if (response.status !== statusCodes.OK)
				throw new Error(response.data.message || response.statusText);
		} catch (error) {
			createNotification("error", error.message);
			console.error(error.message);
		}
	};

	if (!ticket) {
		fetchTicket();
		//todo: return skeleton here
		return <div>loading ticket</div>;
	}

	return (
		<PageLayout>
			<ActionBarWidget />

			<div className={classes.chatWrap}>
				<PageTitle
					title={`Ticket #${ticket.ticketId}`}
					subtitle={ticket.title}
				/>
			</div>
		</PageLayout>
	);
};

export default Ticket;
