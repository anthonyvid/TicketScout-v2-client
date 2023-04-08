const dashboardStyles = (theme) => ({
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
		padding: "0 20px",
	},
	statWrap: {
		width: "100%",
		display: "flex",
		gap: "25px",
	},
});

export default dashboardStyles;
