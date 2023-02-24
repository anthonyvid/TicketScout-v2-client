const dashboardStyles = (theme) => ({
	test: {
		flexDirection: "row",
		[theme.breakpoints.down("sm")]: {
			flexDirection: "column",
		},
	},
});

export default dashboardStyles;
