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

const Dashboard = () => {
	const classes = useClasses(dashboardStyles);
	const { user } = useSelector((state) => state.authReducer);
	const { payments, tickets } = useSelector((state) => state.resourceReducer);
	const [filteredPayments, setFilteredPayments] = useState([]);
	const [filteredTickets, setFilteredTickets] = useState([]);
	const [priorityTickets, setPriorityTickets] = useState([]);

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
				sortOrder: 1,
				filter: {
					createdAt: {
						gte: moment().subtract(6, "days").format("YYYY-MM-DD"),
						lt: moment().add(1, "days").format("YYYY-MM-DD"),
					},
				},
			};
			const result = await getTickets(options);
			setFilteredTickets(result.data.results);
		})();
	}, []);

	useEffect(() => {
		(async () => {
			const options = {
				sortOrder: 1,
				filter: {
					createdAt: {
						gte: moment().subtract(6, "days").format("YYYY-MM-DD"),
						lt: moment().add(1, "days").format("YYYY-MM-DD"),
					},
				},
			};
			const result = await getPayments(options);
			setFilteredPayments(result.data.results);
		})();
	}, []);

	const weeklyTickets = getWeeklyDataCount(filteredTickets);
	const weeklyPayments = getWeeklyDataCount(filteredPayments);

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
						sparklineData={weeklyPayments}
						totalData={payments.length}
						newData={weeklyPayments[weeklyPayments.length - 1]}
						oldData={weeklyPayments[weeklyPayments.length - 2]}
						width={"33%"}
						height={"auto"}
						title={"Total Sales"}
					/>
					<DisplayStatWidget
						sparklineData={weeklyTickets}
						totalData={tickets.length}
						newData={weeklyTickets[weeklyTickets.length - 1]}
						oldData={weeklyTickets[weeklyTickets.length - 2]}
						width={"33%"}
						height={"auto"}
						title={"Tickets"}
					/>
					{/* <DisplayStatWidget
						sparklineData={weeklyPayments}
						totalData={payments.length}
						newData={weeklyPayments[weeklyPayments.length - 1]}
						oldData={weeklyPayments[weeklyPayments.length - 2]}
						width={"33%"}
						height={"auto"}
						title={"Priority Tickets"}
					/> */}
				</div>
			</div>
		</FlexContainer>
	);
};

export default Dashboard;
