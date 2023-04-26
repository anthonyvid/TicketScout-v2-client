import FlexContainer from "components/FlexContainer.jsx";
import PageTitle from "components/PageTitle.jsx";
import SidebarMenu from "components/SidebarMenu.jsx";
import useClasses from "hooks/useClasses.js";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import ticketsStyles from "styles/pages/Tickets.style.js";
import ActionBarWidget from "widgets/ActionBarWidget.jsx";
import { DataGrid } from "@mui/x-data-grid";
import moment from "moment";
import {
	deleteTicket,
	deleteTickets,
	getTickets,
	updateTicket,
} from "services/ticket.service.js";
import { useQuery, useQueryClient } from "react-query";
import { deepDiff, handleError } from "utils/helper.js";
import useTickets from "hooks/useTickets.js";
import { socket } from "socket.js";
import Table from "components/Table.jsx";
import { Link } from "react-router-dom";
import PageLayout from "components/PageLayout.jsx";
import { useSelector } from "react-redux";
import {
	defaultTicketStatuses,
	statusCodes,
} from "constants/client.constants.js";
import { Alert, Chip, Snackbar } from "@mui/material";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import { createNotification } from "utils/notification.js";
import SnackBar from "components/SnackBar.jsx";
const Tickets = () => {
	const classes = useClasses(ticketsStyles);
	const queryClient = useQueryClient();

	const [paginationModel, setPaginationModel] = useState({
		pageSize: 25,
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
				editable: true,
				preProcessEditCellProps: (params) => {
					const hasError = params.props.value.length < 1;
					return { ...params.props, error: hasError };
				},
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
					return statuses.map((status) => ({
						value: status.split(",")[0],
						data: status,
					}));
				},
				getOptionLabel: (params) => params.value,
				getOptionValue: (params) => params.data,
				editable: true,
				renderCell: (params) => {
					const [label, color] = params.value.split(",");
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

	const handleCreateTicket = () => {};

	const handleDeleteTicket = async (ids) => {
		if (!ids || ids.length < 1) return;
		try {
			let response = null;

			if (ids.length === 1) {
				response = await deleteTicket(ids);
			} else {
				response = await deleteTickets(ids);
			}

			if (response.status !== statusCodes.NO_CONTENT)
				throw new Error(response.data.message || response.statusText);

			createNotification("success", "Successfully deleted ticket(s)");
		} catch (error) {
			createNotification("error", error.message);
			console.error(error.message);
		}
	};

	const handleUpdateTicket = useCallback(async (newRow, oldRow) => {
		const data = deepDiff(oldRow, newRow);
		data.new.updatedAt = new Date().toISOString();

		try {
			const response = await updateTicket(newRow.id, data.new);
			if (response.status !== statusCodes.OK)
				throw new Error(response.data.message || response.statusText);

			createNotification("success", "Successfully updated ticket(s)");
		} catch (error) {
			createNotification("error", error.message);
			console.error(error.message);
		}

		// Return new row to the table
		return newRow;
	}, []);

	const onRowUpdateError = (error) => {
		console.log(error);
	};

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
					rowCount={total}
					onPaginationModelChange={(model) =>
						setPaginationModel(model)
					}
					loading={isLoading || isFetching}
					queryKey={["tickets", paginationModel]}
					handleNewRow={() => handleCreateTicket()}
					handleDeleteRow={handleDeleteTicket}
					processRowUpdate={handleUpdateTicket}
					onProcessRowUpdateError={onRowUpdateError}
					onCellEditCommit={(params) => setRowId(params.id)}
				/>
			</div>
		</PageLayout>
	);
};

export default Tickets;
