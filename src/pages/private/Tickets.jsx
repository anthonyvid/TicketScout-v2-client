import FlexContainer from "components/FlexContainer.jsx";
import PageTitle from "components/PageTitle.jsx";
import SidebarMenu from "components/SidebarMenu.jsx";
import useClasses from "hooks/useClasses.js";
import React, { useEffect, useMemo, useState } from "react";
import ticketsStyles from "styles/pages/Tickets.style.js";
import ActionBarWidget from "widgets/ActionBarWidget.jsx";
import { DataGrid } from "@mui/x-data-grid";
import moment from "moment";
import { getTickets } from "services/ticket.service.js";
import { useQuery } from "react-query";
import { handleError } from "utils/helper.js";
import useTickets from "hooks/useTickets.js";
import { socket } from "socket.js";
import Table from "components/Table.jsx";

const Tickets = () => {
	const classes = useClasses(ticketsStyles);

	const [paginationModel, setPaginationModel] = useState({
		pageSize: 25,
		page: 0,
	});

	const [rowId, setRowId] = useState(null);

	const { tickets, total, isFetching, error, isError, isLoading } =
		useTickets(paginationModel);

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

	const rows = useMemo(() => {
		return tickets.map((t) => {
			return {
				id: t.ticketId,
				customer: "test",
				title: t.title,
				status: t.status,
				updatedAt: t.updatedAt,
				createdAt: t.createdAt,
				incomingWS: t?.incomingWS || false,
			};
		});
	}, [tickets]);

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
					<Table
						columns={columns}
						rows={rows}
						paginationModel={paginationModel}
						getRowId={(row) => row.id}
						onCellEditCommit={(params) => setRowId(params.id)}
						rowCount={total}
						onPaginationModelChange={(model) => {
							console.log(model);
							setPaginationModel(model);
						}}
						loading={isLoading || isFetching}
					/>
				</div>
			</div>
		</FlexContainer>
	);
};

export default Tickets;
