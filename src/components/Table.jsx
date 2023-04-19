import { DataGrid } from "@mui/x-data-grid";
import PropTypes from "prop-types";
import useClasses from "hooks/useClasses.js";
import React, { useEffect, useState } from "react";
import tableStyles from "styles/components/Table.style.js";
import { useQueryClient } from "react-query";

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
}) => {
	const classes = useClasses(tableStyles);
	const [tableRows, setTableRows] = useState([...rows]);
	const queryClient = useQueryClient();
	const [sortModel, setSortModel] = useState([
		{
			field: "updatedAt",
			sort: "desc",
		},
	]);

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
	loading: PropTypes.bool,
};

export default Table;
