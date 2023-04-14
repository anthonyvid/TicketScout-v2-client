import FlexContainer from "components/FlexContainer.jsx";
import PageTitle from "components/PageTitle.jsx";
import SidebarMenu from "components/SidebarMenu.jsx";
import useClasses from "hooks/useClasses.js";
import React from "react";
import { useSelector } from "react-redux";
import ticketsStyles from "styles/pages/Tickets.style.js";
import ActionBarWidget from "widgets/ActionBarWidget.jsx";
import { DataGrid } from "@mui/x-data-grid";

const Tickets = () => {
	const classes = useClasses(ticketsStyles);
	const { user } = useSelector((state) => state.authReducer);

	return (
		<FlexContainer page styles={classes.page}>
			<SidebarMenu />
			<div className={classes.container}>
				<ActionBarWidget />
				<PageTitle
					title={"Tickets"}
					subtitle={"View your recent tickets"}
				/>
				<div className={classes.tableWrap}></div>
			</div>
		</FlexContainer>
	);
};

export default Tickets;
