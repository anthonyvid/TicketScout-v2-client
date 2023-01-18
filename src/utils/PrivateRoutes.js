import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoutes = () => {
	let token = useSelector((state) => state.token);
	return token && token !== null && token !== undefined ? (
		<Outlet />
	) : (
		<Navigate to="/login" />
	);
};

export default PrivateRoutes;
