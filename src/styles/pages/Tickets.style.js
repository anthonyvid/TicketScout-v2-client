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
});

export default ticketsStyles;
