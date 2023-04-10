import { statusCodes } from "constants/statusCodes.constants.js";
import { isEmpty } from "lodash";
import moment from "moment";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { setLogin } from "reducers/auth/index.js";
import {
	setOrganization,
	setTickets,
	setPayments,
	setCustomers,
} from "reducers/resources/index.js";
import { isAuthenticated } from "services/auth.service.js";
import { createCustomer, getCustomers } from "services/customer.service.js";
import {
	getOrganizationById,
	getOrganizations,
} from "services/organization.service.js";
import { createPayment, getPayments } from "services/payment.service.js";
import { createTicket, getTickets } from "services/ticket.service.js";
import { getCached } from "./helper.js";
import { createNotification } from "./notification.js";

const PrivateRoutes = () => {
	let { token, user } = useSelector((state) => state.authReducer);
	let { organization, tickets, customers, payments } = useSelector(
		(state) => state.resourceReducer
	);

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const runAuth = async () => {
		try {
			const response = await isAuthenticated({ user, token });

			if (response.status !== statusCodes.OK) {
				dispatch(
					setLogin({
						user: null,
						token: null,
					})
				);
				navigate("account/login");
				//todo: call logout function maybe
				throw new Error(response.data.message || response.statusText);
			}
			// if (isEmpty(organization)) fetchOrganization();
			// if (isEmpty(tickets)) fetchTickets();
			// if (isEmpty(customers)) fetchCustomers();
			// if (isEmpty(payments)) fetchPayments();
			fetchOrganization();
			fetchTickets();
			fetchCustomers();
			fetchPayments();
		} catch (error) {
			createNotification("error", error.message);
			console.error(error.message);
		}
	};

	const fetchOrganization = async () => {
		try {
			const response = await getOrganizationById(user.organizationId);
			if (response.status !== statusCodes.OK)
				throw new Error(response.data.message || response.statusText);

			dispatch(
				setOrganization({ organization: response.data.organization })
			);
		} catch (error) {
			createNotification("error", error.message);
			console.error(error.message);
		}
	};

	const fetchTickets = async () => {
		const options = {
			page: 1,
			limit: 25,
		};
		try {
			const response = await getTickets(options);
			if (response.status !== statusCodes.OK)
				throw new Error(response.data.message || response.statusText);

			dispatch(setTickets({ tickets: response.data.results }));
		} catch (error) {
			createNotification("error", error.message);
			console.error(error.message);
		}
	};

	const fetchCustomers = async () => {
		const options = {
			page: 1,
			limit: 25,
		};
		try {
			const response = await getCustomers(options);
			if (response.status !== statusCodes.OK)
				throw new Error(response.data.message || response.statusText);

			dispatch(setCustomers({ customers: response.data.results }));
		} catch (error) {
			createNotification("error", error.message);
			console.error(error.message);
		}
	};

	const fetchPayments = async () => {
		const options = {
			page: 1,
			limit: 25,
		};
		try {
			const response = await getPayments(options);
			if (response.status !== statusCodes.OK)
				throw new Error(response.data.message || response.statusText);

			dispatch(setPayments({ payments: response.data.results }));
		} catch (error) {
			createNotification("error", error.message);
			console.error(error.message);
		}
	};

	useEffect(() => {
		if (token && user) {
			runAuth();
		}
	}, [token, user]);

	return token && token !== null && token !== undefined ? (
		<Outlet />
	) : (
		<Navigate to="/account/login" />
	);
};

export default PrivateRoutes;

// // example
// const options = {
// 	page: 1,
// 	limit: 10,
// 	sort: "date",
// 	filter: {
// 		status: "paid",
// 		method: "credit_card",
// 	},
// };
// const options = {
// 	page: 1,
// 	limit: 10,
// 	sort: "name",
// filter: {
// 	createdAt: {
// 		gte: "2022-01-01",
// 		lte: "2022-01-31",
// 	},
// },
// };

// const date = moment("2023-04-10");
// date.set("hour", 12);
// date.set("minute", 30);

// const options = {
// 	page: 1,
// 	limit: 25,
// 	sort: "createdAt",
// 	filter: {
// 		createdAt: {
// 			gt: date.toISOString(),
// 		},
// 	},
// };
// 	},
// };
