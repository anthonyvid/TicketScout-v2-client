import FlexContainer from "components/FlexContainer.jsx";
import PageTitle from "components/PageTitle.jsx";
import SidebarMenu from "components/SidebarMenu.jsx";
import useClasses from "hooks/useClasses.js";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ticketsStyles from "styles/pages/Tickets.style.js";
import ActionBarWidget from "widgets/ActionBarWidget.jsx";
import { DataGrid } from "@mui/x-data-grid";
import moment from "moment";
import { getTickets } from "services/ticket.service.js";
import { statusCodes } from "constants/client.constants.js";
import { setTickets } from "reducers/resources/index.js";
import { createNotification } from "utils/notification.js";

const Tickets = () => {
	const classes = useClasses(ticketsStyles);
	const { tickets } = useSelector((state) => state.resourceReducer);
	const [paginationModel, setPaginationModel] = useState({
		pageSize: 25,
		page: 0,
	});
	const [totalTickets, setTotalTickets] = useState(0);
	const [rowId, setRowId] = useState(null);
	const dispatch = useDispatch();

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
			};
		});
	}, [tickets]);

	const fetchTickets = async (modal) => {
		const options = {
			page: modal.page + 1,
			limit: modal.pageSize,
		};

		try {
			const response = await getTickets(options);
			if (response.status !== statusCodes.OK)
				throw new Error(response.data.message || response.statusText);

			dispatch(setTickets({ tickets: response.data.results }));
			setTotalTickets(response.data.total);
		} catch (error) {
			createNotification("error", error.message);
			console.error(error.message);
		}
	};

	const handlePageChange = useCallback((modal) => {
		setPaginationModel(modal);
		fetchTickets(modal);
	}, []);

	useEffect(() => {
		fetchTickets(paginationModel.page);
	}, []);

	const MemoizedDataGrid = React.memo(DataGrid, (prevProps, nextProps) => {
		return (
			prevProps.paginationModel.page === nextProps.paginationModel.page &&
			prevProps.paginationModel.pageSize ===
				nextProps.paginationModel.pageSize &&
			prevProps.rows === nextProps.rows &&
			prevProps.totalTickets === nextProps.totalTickets
		);
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
					<MemoizedDataGrid
						className={classes.grid}
						columns={columns}
						paginationMode="server"
						rows={rows}
						pageSizeOptions={[100, 50, 25]}
						paginationModel={paginationModel}
						getRowId={(row) => row.id}
						onCellEditCommit={(params) => setRowId(params.id)}
						rowCount={totalTickets}
						onPaginationModelChange={(modal) =>
							handlePageChange(modal)
						}
					/>
				</div>
			</div>
		</FlexContainer>
	);
};

export default Tickets;
