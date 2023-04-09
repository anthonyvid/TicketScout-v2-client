import { statusCodes } from "constants/statusCodes.constants.js";
import { isEmpty } from "lodash";
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
			// await createTicket({
			// 	title: "test ticket title1",
			// 	description: "test ticket description1.......",
			// 	customerId: customers[0]._id,
			// 	userId: user._id,
			// });
			// await createTicket({
			// 	title: "test ticket title2",
			// 	description: "test ticket description2.......",
			// 	customerId: customers[1]._id,
			// 	userId: user._id,
			// });
			//todo: when a ticket is created i need to add it to the users tickets array,
			//see with chatgpt how to do
			//todo see why its creating a counters collection in my db
			//todo: add default sorting by most recent to my get calls, add other sorting options
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
