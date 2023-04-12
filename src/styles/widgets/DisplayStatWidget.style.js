const displayStatWidgetStyles = (theme) => ({
	container: {
		borderRadius: "15px",
		backgroundColor: "white",
		boxShadow:
			"rgba(27, 31, 35, 0.04) 0px 1px 0px, rgba(255, 255, 255, 0.25) 0px 1px 0px inset",
		padding: "20px",
	},
	iconWrap: {
		height: "35px",
		width: "35px",
		borderRadius: "50%",
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: theme.palette.neutral.light,
		color: theme.palette.neutral.main,
	},
	numberWrap: {
		display: "flex",
		alignItems: "center",
		gap: "20px",
	},
	increase: {
		"&.MuiChip-root": {
			backgroundColor: `${theme.palette.success.custom}20`,
		},
		"& .MuiChip-label": {
			color: theme.palette.success.custom,
			filter: "brightness(0.65)",
		},
	},
	decrease: {
		"&.MuiChip-root": {
			backgroundColor: `${theme.palette.error.custom}25`,
		},
		"& .MuiChip-label": {
			color: theme.palette.error.custom,
		},
	},
	neutral: {
		"&.MuiChip-root": {
			backgroundColor: `${theme.palette.warning.custom}25`,
		},
		"& .MuiChip-label": {
			color: theme.palette.warning.main,
		},
	},
	sparklineWrap: {
		width: "90%",
	},
});

export default displayStatWidgetStyles;
