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
];
const privateRoutes = [{ component: <Dashboard />, path: "/dashboard" }];

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
			</Routes>
		</Router>
	);
};

export default AppRoutes;
