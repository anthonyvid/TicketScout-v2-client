const displayStatWidgetStyles = (theme) => ({
	container: {
		borderRadius: "15px",
		backgroundColor: "white",
		display: "flex",
		flexDirection: "column",
		justifyContent: "space-between",
		boxShadow:
			"rgba(27, 31, 35, 0.04) 0px 1px 0px, rgba(255, 255, 255, 0.25) 0px 1px 0px inset",
		padding: "18px",
		"div:last-child": { bottom: "0px" },
	},
	numberWrap: {
		display: "flex",
		alignItems: "center",
		gap: "20px",
	},
	chip: {
		"&.MuiChip-root": {
			borderRadius: "7px",
		},
	},
	increase: {
		"&.MuiChip-root": {
			backgroundColor: `${theme.palette.success.main}20`,
		},
		"& .MuiChip-label": {
			color: theme.palette.success.main,
			filter: "brightness(0.65)",
		},
	},
	decrease: {
		"&.MuiChip-root": {
			backgroundColor: `${theme.palette.error.main}25`,
		},
		"& .MuiChip-label": {
			color: theme.palette.error.main,
		},
	},
	neutral: {
		"&.MuiChip-root": {
			backgroundColor: `${theme.palette.warning.main}25`,
		},
		"& .MuiChip-label": {
			color: theme.palette.warning.main,
		},
	},
	titleWrap: {
		display: "flex",
		alignItems: "center",
		justifyContent: "space-between",
		h4: {
			color: theme.palette.neutral.main,
		},
	},
});

export default displayStatWidgetStyles;
