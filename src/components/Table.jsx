import {
	DataGrid,
	GridFooter,
	GridToolbarColumnsButton,
	GridToolbarContainer,
	GridToolbarDensitySelector,
	GridToolbarExport,
	GridToolbarFilterButton,
} from "@mui/x-data-grid";
import PropTypes from "prop-types";
import useClasses from "hooks/useClasses.js";
import React, { useEffect, useState } from "react";
import tableStyles from "styles/components/Table.style.js";
import { useQueryClient } from "react-query";
import { Button, LinearProgress } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import IconButton from "@mui/material/IconButton";
import { useHasRoles } from "hooks/useHasRoles.js";
import { roles } from "constants/client.constants.js";
import DeleteIcon from "@mui/icons-material/Delete";
const Table = ({
	rows,
	columns,
	paginationModel,
	paginationMode,
	pageSizeOptions,
	rowCount,
	getRowId,
	onCellEditCommit,
	onPaginationModelChange,
	loading,
	queryKey,
	handleNewRow,
	showToolbar,
}) => {
	const classes = useClasses(tableStyles);
	const [tableRows, setTableRows] = useState([...rows]);
	const [selectedRows, setSelectedRows] = useState([]);
	const [checkboxSelection, setCheckboxSelection] = useState(true);
	const queryClient = useQueryClient();
	const [sortModel, setSortModel] = useState([
		{
			field: "updatedAt",
			sort: "desc",
		},
	]);
	const isAdmin = useHasRoles(roles.ADMIN);

	function CustomToolbar() {
		return (
			<GridToolbarContainer className={classes.toolbar}>
				<div>
					<Button
						size="small"
						variant="text"
						startIcon={<AddIcon />}
						onClick={handleNewRow}
					>
						New
					</Button>
					{isAdmin && selectedRows.length > 0 && (
						<IconButton
							aria-label="delete"
							color="primary"
							onClick={() => {}}
						>
							<DeleteIcon />
						</IconButton>
					)}
				</div>
				<div>
					<GridToolbarColumnsButton />
					<GridToolbarFilterButton />
					<GridToolbarDensitySelector />
					<GridToolbarExport />
				</div>
			</GridToolbarContainer>
		);
	}

	function CustomNoRowsOverlay() {
		return <div></div>;
	}

	const handleRowSelection = (ids) => setSelectedRows(ids);

	const getRowClassName = (params) => {
		const { incomingWS } = params.row;

		if (incomingWS) {
			setTimeout(() => {
				// Remove the "incomingWS" field after 3 seconds
				const updatedRows = [...tableRows];
				const rowIndex = updatedRows.findIndex(
					(row) => row.id === params.row.id
				);
				updatedRows[rowIndex] = {
					...updatedRows[rowIndex],
					incomingWS: false,
				};

				setTableRows(updatedRows);

				// Update the ticket in cache
				queryClient.setQueryData(queryKey, (existingData) => {
					const newData = existingData;
					newData.data.results = updatedRows;
					return newData;
				});
			}, 3000);

			return classes.highlightedRow;
		}
		return "";
	};

	useEffect(() => {
		setTableRows(rows);
	}, [rows]);

	return (
		<DataGrid
			className={classes.grid}
			columns={columns}
			rows={tableRows}
			paginationMode={paginationMode}
			pageSizeOptions={pageSizeOptions}
			rowCount={rowCount}
			paginationModel={paginationModel}
			getRowId={getRowId}
			onPaginationModelChange={onPaginationModelChange}
			loading={loading}
			getRowClassName={getRowClassName}
			sortModel={sortModel}
			onSortModelChange={setSortModel}
			onCellEditCommit={onCellEditCommit}
			checkboxSelection={checkboxSelection}
			disableRowSelectionOnClick
			onRowSelectionModelChange={handleRowSelection}
			slots={{
				toolbar: showToolbar ? CustomToolbar : null,
				noRowsOverlay: CustomNoRowsOverlay,
				loadingOverlay: LinearProgress,
			}}
		/>
	);
};

Table.defaultProps = {
	paginationMode: "server",
	pageSizeOptions: [100, 50, 25],
	rowCount: 0,
	loading: false,
	getRowId: () => {},
	onCellEditCommit: () => {},
	onPaginationModelChange: () => {},
	handleNewRow: () => {},
	showToolbar: true,
};

Table.propTypes = {
	rows: PropTypes.array.isRequired,
	columns: PropTypes.array.isRequired,
	paginationMode: PropTypes.string,
	paginationModel: PropTypes.object,
	pageSizeOptions: PropTypes.array,
	queryKey: PropTypes.array,
	rowCount: PropTypes.number,
	getRowId: PropTypes.func,
	onCellEditCommit: PropTypes.func,
	onPaginationModelChange: PropTypes.func,
	handleNewRow: PropTypes.func,
	loading: PropTypes.bool,
	showToolbar: PropTypes.bool,
};

export default Table;
