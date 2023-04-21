import FlexContainer from "components/FlexContainer.jsx";
import PageTitle from "components/PageTitle.jsx";
import SidebarMenu from "components/SidebarMenu.jsx";
import useClasses from "hooks/useClasses.js";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import ticketsStyles from "styles/pages/Tickets.style.js";
import ActionBarWidget from "widgets/ActionBarWidget.jsx";
import { DataGrid } from "@mui/x-data-grid";
import moment from "moment";
import { getTickets } from "services/ticket.service.js";
import { useQuery, useQueryClient } from "react-query";
import { handleError } from "utils/helper.js";
import useTickets from "hooks/useTickets.js";
import { socket } from "socket.js";
import Table from "components/Table.jsx";
import { Link } from "react-router-dom";
import PageLayout from "components/PageLayout.jsx";
import { useSelector } from "react-redux";
import { defaultTicketStatuses } from "constants/client.constants.js";
import { Alert, Chip, Snackbar } from "@mui/material";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import { createNotification } from "utils/notification.js";
import SnackBar from "components/SnackBar.jsx";
const Tickets = () => {
	const classes = useClasses(ticketsStyles);
	const queryClient = useQueryClient();

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
			// {
			// 	field: "customer",
			// 	headerName: "Customer",
			// 	width: "200",
			// 	renderCell: (params) => (
			// 		<Link to={`/customers/${params.value}`}>
			// 			{params.value}
			// 		</Link>
			// 	),
			// },
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
			// {
			// 	field: "status",
			// 	headerName: "Status",
			// 	width: "130",
			// 	type: "singleSelect",
			// 	valueOptions: () => {
			// 		const statuses =
			// 			organization?.settings?.ticketStatuses ||
			// 			defaultTicketStatuses;
			// 		return statuses.map((status) => ({
			// 			value: status.split(",")[0],
			// 			data: status,
			// 		}));
			// 	},
			// 	getOptionLabel: (params) => params.value,
			// 	getOptionValue: (params) => params.data,
			// 	editable: true,
			// 	// valueGetter: (value) => console.log(value),
			// 	renderCell: (params) => {
			// 		const [label, color] = params.value.split(",");
			// 		return (
			// 			<Chip
			// 				size="small"
			// 				icon={
			// 					<FiberManualRecordIcon
			// 						style={{
			// 							color: color,
			// 						}}
			// 					/>
			// 				}
			// 				style={{
			// 					color: color,
			// 					backgroundColor: `${color}17`,
			// 				}}
			// 				label={label}
			// 			/>
			// 		);
			// 	},
			// },
			// {
			// 	field: "updatedAt",
			// 	headerName: "Last Updated",
			// 	width: "130",
			// 	renderCell: (params) => moment(params.row.updatedAt).fromNow(),
			// },
			// {
			// 	field: "createdAt",
			// 	headerName: "Created On",
			// 	width: "130",
			// 	renderCell: (params) =>
			// 		moment(params.row.createdAt).format("MMM Do YYYY"),
			// },
		],
		[rowId]
	);

	const rows = useMemo(() => {
		return tickets.map((t) => {
			return {
				id: t.ticketId || t.id,
				// customer: t.customer,
				title: t.title,
				// status: t.status,
				// updatedAt: t.updatedAt,
				// createdAt: t.createdAt,
				// incomingWS: t?.incomingWS || false,
			};
		});
	}, [tickets]);

	useEffect(() => console.log(rows), [rows]);

	const createTicket = () => {};
	const deleteTicket = () => {};

	// const onRowUpdate = useCallback(async (row) => {
	// 	// Update the ticket in cache
	// 	queryClient.setQueryData(
	// 		["tickets", paginationModel],
	// 		(existingData) => {
	// 			const newData = existingData;
	// 			const tickets = [...newData?.data?.results];
	// 			const index = tickets.findIndex((obj) => obj.id === row.id);
	// 			tickets[index] = row;
	// 			newData.data.results = tickets;
	// 			return newData;
	// 		}
	// 	);
	// }, []);

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
					handleNewRow={() => createTicket()}
					handleDeleteRow={() => deleteTicket()}
					// processRowUpdate={onRowUpdate}
					onProcessRowUpdateError={onRowUpdateError}
				/>
			</div>
		</PageLayout>
	);
};

export default Tickets;
