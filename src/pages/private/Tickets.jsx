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
import { Link } from "react-router-dom";
import PageLayout from "components/PageLayout.jsx";
import { useSelector } from "react-redux";
import { defaultTicketStatuses } from "constants/client.constants.js";
import { Chip } from "@mui/material";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import { createNotification } from "utils/notification.js";
const Tickets = () => {
	const classes = useClasses(ticketsStyles);

	const [paginationModel, setPaginationModel] = useState({
		pageSize: 5,
		page: 0,
	});

	const [rowId, setRowId] = useState(null);

	const { tickets, total, isFetching, error, isError, isLoading } =
		useTickets(paginationModel);

	const { organization } = useSelector((state) => state.resourceReducer);

	const columns = useMemo(
		() => [
			{
				field: "id",
				headerName: "Ticket Id",
				width: "80",
				renderCell: (params) => (
					<Link to={`/tickets/${params.value}`}>{params.value}</Link>
				),
			},
			{
				field: "customer",
				headerName: "Customer",
				width: "200",
				renderCell: (params) => (
					<Link to={`/customers/${params.value}`}>
						{params.value}
					</Link>
				),
			},
			{
				field: "title",
				headerName: "Title",
				width: "250",
			},
			{
				field: "status",
				headerName: "Status",
				width: "130",
				type: "singleSelect",
				valueOptions: () => {
					const statuses =
						organization?.settings?.ticketStatuses ||
						defaultTicketStatuses;
					console.log([
						...statuses.map((status) => status.split(",")[0]),
					]);
					return [...statuses.map((status) => status.split(",")[0])];
				},
				editable: true,
				renderCell: (params) => {
					const statusInfo = params.row.status.split(",");
					const [label, color] = statusInfo;
					return (
						<Chip
							size="small"
							icon={
								<FiberManualRecordIcon
									style={{
										color: color,
									}}
								/>
							}
							style={{
								color: color,
								backgroundColor: `${color}17`,
							}}
							label={label}
						/>
					);
				},
			},
			{
				field: "updatedAt",
				headerName: "Last Updated",
				width: "130",
				renderCell: (params) => moment(params.row.updatedAt).fromNow(),
			},
			{
				field: "createdAt",
				headerName: "Created On",
				width: "130",
				renderCell: (params) =>
					moment(params.row.createdAt).format("MMM Do YYYY"),
			},
		],
		[rowId]
	);

	const rows = useMemo(() => {
		return tickets.map((t) => {
			return {
				id: t.ticketId || t.id,
				customer: t.customer,
				title: t.title,
				status: t.status,
				updatedAt: t.updatedAt,
				createdAt: t.createdAt,
				incomingWS: t?.incomingWS || false,
			};
		});
	}, [tickets]);

	const createTicket = () => {};
	const deleteTicket = () => {};

	return (
		<PageLayout>
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
					onPaginationModelChange={(model) =>
						setPaginationModel(model)
					}
					loading={isLoading || isFetching}
					queryKey={["tickets", paginationModel]}
					handleNewRow={() => createTicket()}
					handleDeleteRow={() => deleteTicket()}
				/>
			</div>
		</PageLayout>
	);
};

export default Tickets;
