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
	"@keyframes highlight": {
		"0%": {
			backgroundColor: "red",
		},
		"50%": {
			backgroundColor: "yellow",
		},
		"100%": {
			backgroundColor: "red",
		},
	},
	highlightedRow: {
		backgroundColor: "red",
		animation: "highlight 3s ease-in-out",
	},
});

export default tableStyles;
