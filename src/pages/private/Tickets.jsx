import React, { useCallback, useMemo, useState } from "react";
import moment from "moment";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// Components
import PageTitle from "components/PageTitle.jsx";
import Table from "components/Table.jsx";
import PageLayout from "components/PageLayout.jsx";
import { Chip } from "@mui/material";

// Hooks
import useClasses from "hooks/useClasses.js";
import useTickets from "hooks/useTickets.js";

// Styles
import ticketsStyles from "styles/pages/Tickets.style.js";

// Widgets
import ActionBarWidget from "widgets/ActionBarWidget.jsx";

// Services
import {
	deleteTicket,
	deleteTickets,
	updateTicket,
} from "services/ticket.service.js";

// Utils
import { deepDiff, formatName } from "utils/helper.js";
import { createNotification } from "utils/notification.js";

// Constants
import {
	defaultTicketStatuses,
	statusCodes,
} from "constants/client.constants.js";

// Icons
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";

// Reducers
import { openModal } from "reducers/modal.js";

const Tickets = () => {
	const classes = useClasses(ticketsStyles);
	const dispatch = useDispatch();
	const navigate = useNavigate();

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
				renderCell: (params) => {
					return (
						<Link
							to={{
								pathname: `/${organization.storeName}/tickets/${params.value}`,
							}}
							state={{ ticket: params.row, fromTickets: true }}
						>
							{params.value}
						</Link>
					);
				},
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
					let [label, color] = params.value.split(",");

					if (!color) {
						const statuses =
							organization?.settings?.ticketStatuses ||
							defaultTicketStatuses;
						const status = statuses.find(
							(s) => s.split(",")[0] === label
						);
						color = status.split(",")[1];
					}
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
					onCellEditCommit={(params) => setRowId(params.id)}
				/>
			</div>
		</PageLayout>
	);
};

export default Tickets;

//todo: actual Ticket Page design
