import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useQueryClient } from "react-query";
import { useDispatch } from "react-redux";

// Components
import {
	DataGrid,
	GridToolbarColumnsButton,
	GridToolbarContainer,
	GridToolbarDensitySelector,
	GridToolbarExport,
	GridToolbarFilterButton,
	gridColumnPositionsSelector,
	gridColumnsTotalWidthSelector,
	useGridApiContext,
} from "@mui/x-data-grid";
import IconButton from "@mui/material/IconButton";
import { Box, Button, LinearProgress, Skeleton, Tooltip } from "@mui/material";

// Hooks
import useClasses from "hooks/useClasses.js";
import { useHasRoles } from "hooks/useHasRoles.js";

// Styles
import styled from "@emotion/styled";
import tableStyles from "styles/components/Table.style.js";

// Icons
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import CachedIcon from "@mui/icons-material/Cached";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

// Constants
import { roles } from "constants/client.constants.js";

// Reducers
import { openModal } from "reducers/modal.js";

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
						<Tooltip position="top" title="Delete" arrow>
							<IconButton
								aria-label="delete"
								color="error"
								onClick={() => handleDeleteRow(selectedRows)}
							>
								<DeleteIcon />
							</IconButton>
						</Tooltip>
					)}
				</div>
			</GridToolbarContainer>
		);
	}

	const getNoRowsIcon = () => {
		switch (queryKey[0]) {
			case "tickets":
				return (
					<ConfirmationNumberIcon
						color="primary"
						sx={{ fontSize: "60px" }}
					/>
				);
			default:
				return (
					<InfoOutlinedIcon
						color="primary"
						sx={{ fontSize: "60px" }}
					/>
				);
		}
	};

	const getNoRowsTitle = () => {
		switch (queryKey[0]) {
			case "tickets":
				return "No tickets - yet!";
			default:
				return "No data - yet!";
		}
	};

	const getNoRowsSubtitle = () => {
		switch (queryKey[0]) {
			case "tickets":
				return 'quick tip: you can create a ticket using the using the "Ctrl + T" shortcut.';
			default:
				return "quick tip: check out the shortcuts in settings.";
		}
	};

	const getNoRowsButton = () => {
		switch (queryKey[0]) {
			case "tickets":
				return (
					<Button
						size="small"
						variant="outlined"
						startIcon={<AddIcon />}
						onClick={() => dispatch(openModal("CREATE_TICKET"))}
					>
						Create ticket
					</Button>
				);
		}
	};

	function CustomNoRowsOverlay() {
		return (
			<div className={classes.emptyTable}>
				{getNoRowsIcon()}
				<h2>{getNoRowsTitle()}</h2>
				<p>{getNoRowsSubtitle()}</p>
				{getNoRowsButton()}
			</div>
		);
	}

	function CustomErrorOverlay() {
		return (
			<div className={classes.emptyTable}>
				<ErrorOutlineIcon color="error" sx={{ fontSize: "60px" }} />
				<h2>There was an issue loading this table</h2>
				<p>Please refresh to try again.</p>
				<Button
					size="small"
					color="neutral"
					variant="text"
					startIcon={<CachedIcon />}
					onClick={() => window.location.reload()}
				>
					Refresh
				</Button>
			</div>
		);
	}

	// Pseudo random number. See https://stackoverflow.com/a/47593316
	const mulberry32 = (a) => {
		return () => {
			/* eslint-disable */
			let t = (a += 0x6d2b79f5);
			t = Math.imul(t ^ (t >>> 15), t | 1);
			t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
			return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
			/* eslint-enable */
		};
	};

	const randomBetween = (seed, min, max) => {
		const random = mulberry32(seed);
		return () => min + (max - min) * random();
	};

	const SkeletonCell = styled(Box)(({ theme }) => ({
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
		borderBottom: `1px solid ${theme.palette.divider}`,
	}));

	function CustomLoadingOverlay() {
		const apiRef = useGridApiContext();

		const dimensions = apiRef.current?.getRootDimensions();
		const viewportHeight = dimensions?.viewportInnerSize.height ?? 0;

		// @ts-expect-error Function signature expects to be called with parameters, but the implementation suggests otherwise
		const rowHeight = apiRef.current.unstable_getRowHeight();
		const skeletonRowsCount = Math.ceil(viewportHeight / rowHeight);

		const totalWidth = gridColumnsTotalWidthSelector(apiRef);
		const positions = gridColumnPositionsSelector(apiRef);
		const inViewportCount = React.useMemo(
			() => positions.filter((value) => value <= totalWidth).length,
			[totalWidth, positions]
		);
		const columns = apiRef.current
			.getVisibleColumns()
			.slice(0, inViewportCount);

		const children = React.useMemo(() => {
			// reseed random number generator to create stable lines betwen renders
			const random = randomBetween(12345, 25, 75);
			const array = [];

			for (let i = 0; i < skeletonRowsCount; i += 1) {
				for (const column of columns) {
					const width = Math.round(random());
					array.push(
						<SkeletonCell
							key={`column-${i}-${column.field}`}
							sx={{ justifyContent: column.align }}
						>
							<Skeleton sx={{ mx: 1 }} width={`${width}%`} />
						</SkeletonCell>
					);
				}
				array.push(<SkeletonCell key={`fill-${i}`} />);
			}
			return array;
		}, [skeletonRowsCount, columns]);

		const rowsCount = apiRef.current.getRowsCount();

		return rowsCount > 0 ? (
			<LinearProgress />
		) : (
			<div
				style={{
					display: "grid",
					gridTemplateColumns: `${columns
						.map(({ computedWidth }) => `${computedWidth}px`)
						.join(" ")} 1fr`,
					gridAutoRows: rowHeight,
				}}
			>
				{children}
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
				loadingOverlay: CustomLoadingOverlay,
				ErrorOverlay: CustomErrorOverlay,
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
