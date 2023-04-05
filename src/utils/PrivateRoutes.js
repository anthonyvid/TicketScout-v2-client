import { statusCodes } from "constants/statusCodes.constants.js";
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
import { getCustomers } from "services/customer.service.js";
import {
	getOrganizationById,
	getOrganizations,
} from "services/organization.service.js";
import { getPayments } from "services/payment.service.js";
import { getTickets } from "services/ticket.service.js";
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

			if (!Object.values(organization).length) fetchOrganization();
			if (!Object.values(tickets).length) fetchTickets();
			if (!Object.values(customers).length) fetchCustomers();
			if (!Object.values(payments).length) fetchPayments();
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
		try {
			const response = await getTickets();
			if (response.status !== statusCodes.OK)
				throw new Error(response.data.message || response.statusText);

			dispatch(setTickets({ tickets: response.data.tickets }));
		} catch (error) {
			createNotification("error", error.message);
			console.error(error.message);
		}
	};

	const fetchCustomers = async () => {
		try {
			const response = await getCustomers();

			if (response.status !== statusCodes.OK)
				throw new Error(response.data.message || response.statusText);

			dispatch(setCustomers({ customers: response.data.customers }));
		} catch (error) {
			createNotification("error", error.message);
			console.error(error.message);
		}
	};

	const fetchPayments = async () => {
		try {
			const response = await getPayments();
			if (response.status !== statusCodes.OK)
				throw new Error(response.data.message || response.statusText);

			dispatch(setPayments({ payments: response.data.payments }));
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
