import { cx } from "@emotion/css";
import FlexContainer from "components/FlexContainer.jsx";
import SidebarMenu from "components/SidebarMenu.jsx";
import useClasses from "hooks/useClasses.js";
import React, { useEffect, useReducer } from "react";
import { reducer } from "reducers/index.js";
import dashboardStyles from "styles/pages/Dashboard.style.js";
import { getCached } from "utils/helper.js";

const Dashboard = () => {
	const classes = useClasses(dashboardStyles);

	return (
		<FlexContainer page styles={classes.test}>
			<SidebarMenu />
		</FlexContainer>
	);
};

export default Dashboard;
