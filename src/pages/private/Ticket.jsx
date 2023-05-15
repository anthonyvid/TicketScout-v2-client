import PageLayout from "components/PageLayout.jsx";
import PageTitle from "components/PageTitle.jsx";
import useClasses from "hooks/useClasses.js";
import React from "react";
import { useLocation } from "react-router-dom";
import ticketStyles from "styles/pages/Ticket.style.js";
import ActionBarWidget from "widgets/ActionBarWidget.jsx";

const Ticket = () => {
	const classes = useClasses(ticketStyles);
	const location = useLocation();
	const { fromTickets, ticket } = location.state;

	if (!fromTickets || !ticket) {
		return <div>Error loading ticket</div>;
	}

	return (
		<PageLayout>
			<ActionBarWidget />
			<PageTitle
				title={`Ticket #${ticket.id}`}
				subtitle={ticket.title}
			/>
			<div className={classes.tableWrap}></div>
		</PageLayout>
	);
};

export default Ticket;
