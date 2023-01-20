import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoutes = () => {
	let { token, user } = useSelector((state) => state);
	return token && token !== null && token !== undefined ? (
		<Outlet />
	) : (
		<Navigate to="/account/login" />
	);
};

export default PrivateRoutes;
