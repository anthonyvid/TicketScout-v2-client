const ticketsStyles = (theme) => ({
	page: {
		flexWrap: "wrap",
		flexDirection: "row",
		[theme.breakpoints.down("sm")]: {
			flexDirection: "column",
		},
	},
	container: {
		backgroundColor: theme.palette.background.default1,
		height: "100%",
		gap: "20px",
		flex: 1,
    display: "flex",
		flexDirection: "column",
		padding: "20px",
	},
	tableWrap: {
		width: "100%",
		height: "100%",
		overflow: "auto",
	},
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
});

export default ticketsStyles;
