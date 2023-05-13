import {
	DataGrid,
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
import { openModal } from "reducers/modal.js";
import { useDispatch } from "react-redux";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
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
	handleDeleteRow,
	onEditCellPropsChange,
	onEditCellChange,
	onCellEditStop,
	onCellEditStart,
	processRowUpdate,
	onProcessRowUpdateError,
}) => {
	const classes = useClasses(tableStyles);
	const [tableRows, setTableRows] = useState([...rows]);
	const [selectedRows, setSelectedRows] = useState([]);
	const [checkboxSelection, setCheckboxSelection] = useState(true);
	const queryClient = useQueryClient();
	const [cellModesModel, setCellModesModel] = useState({});
	const [sortModel, setSortModel] = useState([
		{
			field: "updatedAt",
			sort: "desc",
		},
	]);
	const dispatch = useDispatch();
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
				</div>
				<div>
					<GridToolbarColumnsButton />
					<GridToolbarFilterButton />
					<GridToolbarDensitySelector />
					<GridToolbarExport />
					{isAdmin && selectedRows.length > 0 && (
						<IconButton
							aria-label="delete"
							color="error"
							onClick={() => handleDeleteRow(selectedRows)}
						>
							<DeleteIcon />
						</IconButton>
					)}
				</div>
			</GridToolbarContainer>
		);
	}

	function CustomNoRowsOverlay() {
		return (
			<div className={classes.emptyTable}>
				<ConfirmationNumberIcon
					color="primary"
					sx={{ fontSize: "60px" }}
				/>
				<h2>No tickets yet</h2>
				<p>
					quick tip: you can create a ticket using the using the "Ctrl + T" shortcut.
				</p>
				<Button
					size="small"
					variant="outlined"
					startIcon={<AddIcon />}
					onClick={() => dispatch(openModal("CREATE_TICKET"))}
				>
					Create ticket
				</Button>
			</div>
		);
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
			onEditCellPropsChange={onEditCellPropsChange}
			onEditCellChange={onEditCellChange}
			onCellEditStop={onCellEditStop}
			onCellEditStart={onCellEditStart}
			onCellModesModelChange={(model) => setCellModesModel(model)}
			cellModesModel={cellModesModel}
			processRowUpdate={processRowUpdate}
			onProcessRowUpdateError={onProcessRowUpdateError}
		/>
	);
};

Table.defaultProps = {
	paginationMode: "server",
	pageSizeOptions: [25, 50, 100],
	rowCount: 0,
	loading: false,
	getRowId: () => {},
	onCellEditCommit: () => {},
	onPaginationModelChange: () => {},
	handleNewRow: () => {},
	handleDeleteRow: () => {},
	onEditCellPropsChange: () => {},
	onEditCellChange: () => {},
	onCellEditStop: () => {},
	onCellEditStart: () => {},
	processRowUpdate: () => {},
	onProcessRowUpdateError: () => {},
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
	handleDeleteRow: PropTypes.func,
	onEditCellPropsChange: PropTypes.func,
	onEditCellChange: PropTypes.func,
	onCellEditStop: PropTypes.func,
	processRowUpdate: PropTypes.func,
	onCellEditStart: PropTypes.func,
	onProcessRowUpdateError: PropTypes.func,
	loading: PropTypes.bool,
	showToolbar: PropTypes.bool,
};

export default Table;
