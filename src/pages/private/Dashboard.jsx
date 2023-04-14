import FlexContainer from "components/FlexContainer.jsx";
import PageTitle from "components/PageTitle.jsx";
import SidebarMenu from "components/SidebarMenu.jsx";
import useClasses from "hooks/useClasses.js";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import dashboardStyles from "styles/pages/Dashboard.style.js";
import { formatName } from "utils/helper.js";
import ActionBarWidget from "widgets/ActionBarWidget.jsx";
import DisplayStatWidget from "widgets/DisplayStatWidget.jsx";

import moment from "moment";
import { getTickets } from "services/ticket.service.js";
import { getPayments } from "services/payment.service.js";
import { ticketStatus } from "constants/client.constants.js";
import { set } from "lodash";
import { getCustomers } from "services/customer.service.js";

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

	const getWeeklyDataCount = (data) => {
		return [...Array(7)]
			.map((_, i) => {
				const date = moment().subtract(i, "days");
				const dateString = date.format("L");

				const count = data.reduce((total, d) => {
					const dataDate = moment(d.createdAt).format("L");
					if (dataDate === dateString) {
						return total + 1;
					} else {
						return total;
					}
				}, 0);

				return count;
			})
			.reverse();
	};

	useEffect(() => {
		(async () => {
			const options = {
				filter: {
					createdAt: {
						gte: moment().subtract(6, "days").format("YYYY-MM-DD"),
						lt: moment().add(1, "days").format("YYYY-MM-DD"),
					},
				},
			};
			const result = await getPayments(options);
			setNumberOfSales(result.data.total);
			setSales(result.data.results);
		})();
	}, []);

	useEffect(() => {
		(async () => {
			const options = {
				filter: {
					createdAt: {
						gte: moment().subtract(6, "days").format("YYYY-MM-DD"),
						lt: moment().add(1, "days").format("YYYY-MM-DD"),
					},
				},
			};
			const result = await getTickets(options);
			setNumberOfTickets(result.data.total);
			setTickets(result.data.results);
		})();
	}, []);

	useEffect(() => {
		(async () => {
			const options = {
				filter: {
					createdAt: {
						gte: moment().subtract(6, "days").format("YYYY-MM-DD"),
						lt: moment().add(1, "days").format("YYYY-MM-DD"),
					},
				},
			};
			const result = await getCustomers(options);
			setNumberOfCustomers(result.data.total);
			setCustomers(result.data.results);
		})();
	}, []);

	useEffect(() => {
		(async () => {
			const options = {
				page: 1,
				limit: 3,
				sort: { createdAt: "asc" },
				filter: { status: ticketStatus.PRIORITY },
			};
			const result = await getTickets(options);
			setPriorityTickets(result.data.results);
		})();
	}, []);

	const weeklySales = getWeeklyDataCount(sales);
	const weeklyTickets = getWeeklyDataCount(tickets);
	const weeklyCustomers = getWeeklyDataCount(customers);

	return (
		<FlexContainer page styles={classes.page}>
			<SidebarMenu />
			<div className={classes.container}>
				<ActionBarWidget />
				<PageTitle
					title={`${getTimeOfDay()}, ${formatName(user.firstname)}`}
					subtitle={"Let's get back to work"}
				/>
				<div className={classes.statWrap}>
					<DisplayStatWidget
						sparklineData={weeklySales}
						totalData={numberOfSales}
						newData={weeklySales[weeklySales.length - 1]}
						oldData={weeklySales[weeklySales.length - 2]}
						width={"33%"}
						height={"auto"}
						title={"Sales"}
					/>
					<DisplayStatWidget
						sparklineData={weeklyTickets}
						totalData={numberOfTickets}
						newData={weeklyTickets[weeklyTickets.length - 1]}
						oldData={weeklyTickets[weeklyTickets.length - 2]}
						width={"33%"}
						height={"auto"}
						title={"Tickets"}
					/>
					<DisplayStatWidget
						sparklineData={weeklyCustomers}
						totalData={numberOfCustomers}
						newData={weeklyCustomers[weeklyCustomers.length - 1]}
						oldData={weeklyCustomers[weeklyCustomers.length - 2]}
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
										<div className={classes.ticketRow}>
											<h4>{ticket.title}</h4>
										</div>
									);
							  })
							: ""}
					</div>
				</div>
			</div>
		</FlexContainer>
	);
};

export default Dashboard;
