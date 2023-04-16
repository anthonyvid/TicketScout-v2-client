import FlexContainer from "components/FlexContainer.jsx";
import PageTitle from "components/PageTitle.jsx";
import SidebarMenu from "components/SidebarMenu.jsx";
import useClasses from "hooks/useClasses.js";
import React, { useMemo, useState } from "react";
import ticketsStyles from "styles/pages/Tickets.style.js";
import ActionBarWidget from "widgets/ActionBarWidget.jsx";
import { DataGrid } from "@mui/x-data-grid";
import moment from "moment";
import { getTickets } from "services/ticket.service.js";
import { useQuery } from "react-query";
import { handleError } from "utils/helper.js";

const Tickets = () => {
	const classes = useClasses(ticketsStyles);

	const [paginationModel, setPaginationModel] = useState({
		pageSize: 25,
		page: 0,
	});
	const [rowId, setRowId] = useState(null);

	const { data, isFetching, error, isError, isLoading } = useQuery(
		["tickets", paginationModel.page],
		() =>
			getTickets({
				page: paginationModel.page + 1,
				limit: paginationModel.pageSize,
			}),
		{
			keepPreviousData: true,
			staleTime: 60000, // milliseconds
			onError: (err) => handleError(err),
		}
	);

	const tickets = data?.data?.results || [];
	const total = data?.data?.total || 0;

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
						paginationMode="server"
						rows={rows}
						pageSizeOptions={[100, 50, 25]}
						paginationModel={paginationModel}
						getRowId={(row) => row.id}
						onCellEditCommit={(params) => setRowId(params.id)}
						rowCount={total}
						onPaginationModelChange={(model) =>
							setPaginationModel(model)
						}
						loading={isLoading || isFetching}
					/>
				</div>
			</div>
		</FlexContainer>
	);
};

export default Tickets;