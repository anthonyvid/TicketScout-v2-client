import { statusCodes } from "constants/statusCodes.constants.js";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { setLogin } from "reducers/auth/index.js";
import { setOrganization, setTickets } from "reducers/resources/index.js";
import { isAuthenticated } from "services/auth.service.js";
import { getOrganizationById } from "services/organization.service.js";
import { getTickets } from "services/ticket.service.js";
import { getCached } from "./helper.js";
import { createNotification } from "./notification.js";

const PrivateRoutes = () => {
	let { token, user } = useSelector((state) => state.authReducer);
	let { organization, tickets } = useSelector(
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
			// Fetch organization data
			console.log(organization);
			console.log(tickets);
            //todo: get payments, customers, any other data that an organization employee will need
			if (!organization) fetchOrganization();
			if (!tickets) fetchTickets();
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
			console.log(response);
			if (response.status !== statusCodes.OK)
				throw new Error(response.data.message || response.statusText);

			dispatch(setTickets({ tickets: response.data.tickets }));
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
