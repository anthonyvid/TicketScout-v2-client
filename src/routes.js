import CheckoutSuccess from "pages/public/CheckoutSuccess.jsx";
import ForgotPassword from "pages/public/ForgotPassword.jsx";
import NotFound from "pages/public/NotFound.jsx";
import ResetPassword from "pages/public/ResetPassword.jsx";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/private/Dashboard.jsx";
import Home from "./pages/public/Home.jsx";
import Login from "./pages/public/Login.jsx";
import Register from "./pages/public/Register.jsx";
import PrivateRoutes from "./utils/PrivateRoutes.js";

const publicRoutes = [
	{ component: <Home />, path: "/" },
	{ component: <Login />, path: "/account/login" },
	{ component: <Register />, path: "/account/register" },
	{ component: <CheckoutSuccess />, path: "/checkout/success" },
	{ component: <ForgotPassword />, path: "/account/forgot-password" },
	{ component: <NotFound />, path: "/404" },
	{
		component: <ResetPassword />,
		path: "/account/reset-password/:id/:token",
	},
];
const privateRoutes = [
	{ component: <Dashboard />, path: `/:organization/dashboard` },
];

const AppRoutes = () => {
	return (
		<Router>
			<Routes>
				<Route element={<PrivateRoutes />}>
					{privateRoutes.map(({ component, path }) => (
						<Route key={path} path={path} element={component} />
					))}
				</Route>
				{publicRoutes.map(({ component, path }) => (
					<Route key={path} path={path} element={component} />
				))}
				<Route path="*" element={<NotFound />} />
			</Routes>
		</Router>
	);
};

export default AppRoutes;
