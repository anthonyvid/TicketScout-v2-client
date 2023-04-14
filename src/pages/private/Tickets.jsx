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
			{ field: "id", headerName: "Ticket Id", width: 65 },
			{ field: "customer", headerName: "Customer", width: 110 },
			{ field: "title", headerName: "Title", width: 250 },
			{
				field: "status",
				headerName: "Status",
				width: 65,
				type: "singleSelect",
				valueOptions: ["new", "reply", "priority"],
				editable: true,
			},
			{
				field: "updatedAt",
				headerName: "Last Updated",
				width: 150,
				renderCell: (params) =>
					moment(params.row.updatedAt).format("YYYY-MM-DD HH:MM:SS"),
			},
			{
				field: "createdAt",
				headerName: "Created At",
				width: 150,
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
						columns={columns}
						rows={rows}
						getRowId={(row) => row.id}
						rowsPerPageOptions={[5, 10, 20]}
						pageSize={pageSize}
						// autoPageSize
						// editMode="row"
						onPageSizeChange={(newPageSize) =>
							setPageSize(newPageSize)
						}
						getRowSpacing={(params) => ({
							top: params.isFirstVisible ? 0 : 5,
							bottom: params.isLastVisible ? 0 : 5,
						})}
						onCellEditCommit={(params) => setRowId(params.id)}
					/>
				</div>
			</div>
		</FlexContainer>
	);
};

export default Tickets;
