const calendarPreviewStyles = (theme) => ({
	calendarPreview: {
		borderRadius: "25px",
		backgroundColor: theme.palette.neutral.default,
		width: "100px",
		height: "40px",
		display: "flex",
		alignItems: "center",
		justifyContent: "space-between",
		padding: "12px",
		transition: "0.2s ease-in-out",
		"&:hover": {
			cursor: "pointer",
			backgroundColor: theme.palette.primary.mainLight,
			transition: "0.2s ease-in-out",
		},
	},
	date: {
		fontWeight: "600",
	},
	calendarIcon: {
		fontWeight: "600",
	},
});

export default calendarPreviewStyles;
