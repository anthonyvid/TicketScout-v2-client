const dashboardStyles = (theme) => ({
	page: {
		flexWrap: "wrap",
		flexDirection: "row",
		[theme.breakpoints.down("sm")]: {
			flexDirection: "column",
		},
	},
});

export default dashboardStyles;
