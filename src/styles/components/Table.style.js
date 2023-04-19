const tableStyles = (theme) => ({
	grid: {
		"&.MuiDataGrid-root .MuiDataGrid-cell:focus-within": {
			outline: "none",
		},
		"&.MuiDataGrid-root .MuiDataGrid-columnHeader:focus-within": {
			outline: "none",
		},
		"&.MuiDataGrid-root": {
			// border: "1px solid transparent",
			// borderRadius: "15px",
		},
		"& .MuiDataGrid-main": {
			// boxShadow:
			// 	"rgba(27, 31, 35, 0.04) 0px 1px 0px, rgba(255, 255, 255, 0.25) 0px 1px 0px inset",
			// backgroundColor: "white",
		},
	},
	highlightedRow: {
		// backgroundColor: "#fff",
		filter: "brightness(100%)",
		animation: "incomingTableItem 2s ease",
	},
});

export default tableStyles;
