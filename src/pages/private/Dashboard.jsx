import { cx } from "@emotion/css";

import FlexContainer from "components/FlexContainer.jsx";
import PageTitle from "components/PageTitle.jsx";
import SidebarMenu from "components/SidebarMenu.jsx";
import useClasses from "hooks/useClasses.js";
import React, { useEffect, useReducer } from "react";
import { useSelector } from "react-redux";
import { reducer } from "reducers/index.js";
import dashboardStyles from "styles/pages/Dashboard.style.js";
import { formatName, getCached } from "utils/helper.js";
import ActionBarWidget from "widgets/ActionBarWidget.jsx";
import DisplayStatWidget from "widgets/DisplayStatWidget.jsx";
import AttachMoneyRoundedIcon from "@mui/icons-material/AttachMoneyRounded";
import PaidOutlinedIcon from "@mui/icons-material/PaidOutlined";

const Dashboard = () => {
	const classes = useClasses(dashboardStyles);
	const { user } = useSelector((state) => state.authReducer);

	const getTimeOfDay = () => {
		const today = new Date();
		const curHr = today.getHours();

		if (curHr < 12) {
			return "Good morning";
		} else if (curHr < 18) {
			return "Good afternoon";
		} else {
			return "Good evening";
		}
	};

	return (
		<FlexContainer page styles={classes.page}>
			<SidebarMenu />
			<div className={classes.container}>
				<ActionBarWidget />
				<PageTitle
					title={`${getTimeOfDay()}, ${formatName(user.firstname)}`}
					subtitle={"Let's get back to work"}
				/>
				<div className={classes.statWrap}>
					<DisplayStatWidget
						width={"33%"}
						height={"200px"}
						title={"Daily Sales"}
						icon={<PaidOutlinedIcon sx={{ fontSize: "25px" }} />}
					/>
					{/* <DisplayStatWidget
						width={"33%"}
						height={"200px"}
						title={"Daily Sales"}
						icon={<PaidOutlinedIcon sx={{ fontSize: "25px" }} />}
					/>
					<DisplayStatWidget
						width={"33%"}
						height={"200px"}
						title={"Daily Sales"}
						icon={<PaidOutlinedIcon sx={{ fontSize: "25px" }} />}
					/> */}
				</div>
			</div>
		</FlexContainer>
	);
};

export default Dashboard;
