import { statusCodes } from "constants/statusCodes.constants.js";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { setLogin } from "reducers/auth/index.js";
import { isAuthenticated } from "services/auth.service.js";
import { getCached } from "./helper.js";
import { createNotification } from "./notification.js";

const PrivateRoutes = () => {
	let { token, user } = useSelector((state) => state);
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
