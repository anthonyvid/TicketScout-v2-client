import React, { useEffect, useState } from "react";
import moment from "moment";
import { useSelector } from "react-redux";

// Hooks
import useClasses from "hooks/useClasses.js";

// Styles
import dashboardStyles from "styles/pages/Dashboard.style.js";

// Widgets
import ActionBarWidget from "widgets/ActionBarWidget.jsx";
import DisplayStatWidget from "widgets/DisplayStatWidget.jsx";

// Services
import { getWeeklyTicketCount } from "services/ticket.service.js";
import { getWeeklyPaymentCount } from "services/payment.service.js";
import { getWeeklyCustomerCount } from "services/customer.service.js";

// Components
import PageLayout from "components/PageLayout.jsx";
import PageTitle from "components/PageTitle.jsx";

const previousWeekOptions = {
	filter: {
		createdAt: {
			gte: moment().subtract(6, "days").format("YYYY-MM-DD"),
			lt: moment().add(1, "days").format("YYYY-MM-DD"),
		},
	},
};

const Dashboard = () => {
	const classes = useClasses(dashboardStyles);
	const { user } = useSelector((state) => state.authReducer);

	const [customers, setCustomers] = useState([]);
	const [sales, setSales] = useState([]);
	const [tickets, setTickets] = useState([]);
	const [customerReplies, setCustomerReplies] = useState([]);
	const [priorityTickets, setPriorityTickets] = useState([]);
	const [numberOfSales, setNumberOfSales] = useState(0);
	const [numberOfTickets, setNumberOfTickets] = useState(0);
	const [numberOfCustomers, setNumberOfCustomers] = useState(0);

	const getTimeOfDay = () => {
		const today = new Date();
		const curHr = today.getHours();

		if (curHr < 12) {
			return "Good morning";
		} else if (curHr < 18) {
			return "Good afternoon";
		} else {
			return "Good evening";
		}
	};

	useEffect(() => {
		(async () => {
			const result = await getWeeklyPaymentCount(previousWeekOptions);
			setNumberOfSales(result.data.total);
			setSales(result.data.results);
		})();
	}, []);

	useEffect(() => {
		(async () => {
			const result = await getWeeklyTicketCount(previousWeekOptions);
			setNumberOfTickets(result.data.total);
			setTickets(result.data.results);
		})();
	}, []);

	useEffect(() => {
		(async () => {
			const result = await getWeeklyCustomerCount(previousWeekOptions);
			setNumberOfCustomers(result.data.total);
			setCustomers(result.data.results);
		})();
	}, []);

	// useEffect(() => {
	// 	(async () => {
	// 		const options = {
	// 			page: 1,
	// 			limit: 3,
	// 			sort: { createdAt: "asc" },
	// 			filter: { status: ticketStatus.PRIORITY },
	// 		};
	// 		const result = await getTickets(options);
	// 		setPriorityTickets(result.data.results);
	// 	})();
	// }, []);

	return (
		<PageLayout>
			<ActionBarWidget />
			<PageTitle
				title={"Tickets"}
				subtitle={"View your recent tickets"}
			/>
			<div className={classes.statWrap}>
				<DisplayStatWidget
					sparklineData={sales}
					totalData={numberOfSales}
					newData={sales.length > 0 ? sales[sales.length - 1] : 0}
					oldData={sales.length > 0 ? sales[sales.length - 2] : 0}
					width={"33%"}
					height={"auto"}
					title={"Sales"}
				/>
				<DisplayStatWidget
					sparklineData={tickets}
					totalData={numberOfTickets}
					newData={
						tickets.length > 0 ? tickets[tickets.length - 1] : 0
					}
					oldData={
						tickets.length > 0 ? tickets[tickets.length - 2] : 0
					}
					width={"33%"}
					height={"auto"}
					title={"Tickets"}
				/>
				<DisplayStatWidget
					sparklineData={customers}
					totalData={numberOfCustomers}
					newData={
						customers.length > 0
							? customers[customers.length - 1]
							: 0
					}
					oldData={
						customers.length > 0
							? customers[customers.length - 2]
							: 0
					}
					width={"33%"}
					height={"auto"}
					title={"Customers"}
				/>
			</div>
			<div className={classes.priorityTickets}>
				<h3>Customer Replies</h3>
			</div>
			<div className={classes.priorityTickets}>
				<h3>Outstanding Priority Tickets</h3>
				<div className={classes.ticketWrap}>
					{priorityTickets.length > 0
						? priorityTickets.map((ticket) => {
								return (
									<div
										key={ticket._id}
										className={classes.ticketRow}
									>
										<h4>{ticket.title}</h4>
									</div>
								);
						  })
						: ""}
				</div>
			</div>
		</PageLayout>
	);
};

export default Dashboard;
