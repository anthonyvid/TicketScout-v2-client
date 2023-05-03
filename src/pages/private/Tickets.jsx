import PageTitle from "components/PageTitle.jsx";
import useClasses from "hooks/useClasses.js";
import React, {
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useState,
} from "react";
import ticketsStyles from "styles/pages/Tickets.style.js";
import ActionBarWidget from "widgets/ActionBarWidget.jsx";

import moment from "moment";
import {
	deleteTicket,
	deleteTickets,
	updateTicket,
} from "services/ticket.service.js";
import { useQueryClient } from "react-query";
import { deepDiff, formatName } from "utils/helper.js";
import useTickets from "hooks/useTickets.js";

import Table from "components/Table.jsx";
import { Link } from "react-router-dom";
import PageLayout from "components/PageLayout.jsx";
import { useDispatch, useSelector } from "react-redux";
import {
	defaultTicketStatuses,
	statusCodes,
} from "constants/client.constants.js";
import { Chip } from "@mui/material";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import { createNotification } from "utils/notification.js";

import CustomDialog from "components/CustomDialog.jsx";
import useDialog from "hooks/useDialog.js";
import TextInput from "components/TextInput.jsx";
import NewTicketDialog from "components/NewTicketDialog.jsx";
import useSnackbar from "hooks/useSnackbar.js";

import { openModal } from "reducers/modal.js";
const Tickets = () => {
	const classes = useClasses(ticketsStyles);
	const queryClient = useQueryClient();
	const { isOpen, toggle } = useDialog();
	const dispatch = useDispatch();

	const createSnackbar = useSnackbar();

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
					<Link to={`/customers/${params.value._id}`}>
						{formatName(
							params.value.firstname,
							params.value.lastname
						)}
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

			// createNotification("success", "Successfully deleted ticket(s)");
			// createSnackbar("");
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
		} catch (error) {
			createNotification("error", error.message);
			console.error(error.message);
		}
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
					handleNewRow={() => dispatch(openModal("CREATE_TICKET"))}
					handleDeleteRow={handleDeleteTicket}
					processRowUpdate={handleUpdateTicket}
					onProcessRowUpdateError={onRowUpdateError}
					onCellEditCommit={(params) => setRowId(params.id)}
				/>
			</div>
			{/* <NewTicketDialog isOpen={isOpen} handleClose={toggle} /> */}
		</PageLayout>
	);
};

export default Tickets;
