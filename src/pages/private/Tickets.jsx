import FlexContainer from "components/FlexContainer.jsx";
import PageTitle from "components/PageTitle.jsx";
import SidebarMenu from "components/SidebarMenu.jsx";
import useClasses from "hooks/useClasses.js";
import React, { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import ticketsStyles from "styles/pages/Tickets.style.js";
import ActionBarWidget from "widgets/ActionBarWidget.jsx";
import { DataGrid } from "@mui/x-data-grid";
import moment from "moment";

const Tickets = () => {
	const classes = useClasses(ticketsStyles);
	const { tickets } = useSelector((state) => state.resourceReducer);
	const [pageSize, setPageSize] = useState(15);
	const [rowId, setRowId] = useState(null);

	const columns = useMemo(
		() => [
			{
				field: "id",
				headerName: "Ticket Id",
				width: "max-content",
				flex: 1,
			},
			{
				field: "customer",
				headerName: "Customer",
				width: "max-content",
				flex: 1,
			},
			{
				field: "title",
				headerName: "Title",
				width: "max-content",
				flex: 1,
			},
			{
				field: "status",
				headerName: "Status",
				width: "max-content",
				flex: 1,
				type: "singleSelect",
				valueOptions: ["new", "reply", "priority"],
				editable: true,
			},
			{
				field: "updatedAt",
				headerName: "Last Updated",
				width: "max-content",
				flex: 1,
				renderCell: (params) =>
					moment(params.row.updatedAt).format("YYYY-MM-DD HH:MM:SS"),
			},
			{
				field: "createdAt",
				headerName: "Created At",
				width: "max-content",
				flex: 1,
				renderCell: (params) =>
					moment(params.row.createdAt).format("YYYY-MM-DD HH:MM:SS"),
			},
		],
		[rowId]
	);

	const rows = tickets.map((t) => {
		return {
			id: t.ticketId,
			customer: "test",
			title: t.title,
			status: t.status,
			updatedAt: t.updatedAt,
			createdAt: t.createdAt,
		};
	});

	return (
		<FlexContainer page styles={classes.page}>
			<SidebarMenu />
			<div className={classes.container}>
				<ActionBarWidget />
				<PageTitle
					title={"Tickets"}
					subtitle={"View your recent tickets"}
				/>
				<div className={classes.tableWrap}>
					<DataGrid
						className={classes.grid}
						columns={columns}
						rows={rows}
						getRowId={(row) => row.id}
						onCellEditCommit={(params) => setRowId(params.id)}
						onRowsScrollEnd={() => console.log("asd")}
						// checkboxSelection
						// loading
					/>
				</div>
			</div>
		</FlexContainer>
	);
};

export default Tickets;
