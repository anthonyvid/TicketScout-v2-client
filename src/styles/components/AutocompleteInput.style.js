const autocompleteInputStyles = (theme) => ({
	groupHeader: {
		position: "sticky",
		top: "-8px",
		padding: "4px 10px",
		color: theme.palette.primary.main,
		backgroundColor: theme.palette.primary.mainLight,
	},
	groupItem: {
		padding: 0,
	},
	autocompleteInputWrap: {
		width: "100%",
		marginBottom: "10px",
	},
	labelWrap: {
		display: "flex",
		marginBottom: "5px",
		justifyContent: "space-between",
	},
	errorIcon: {
		color: theme.palette.error.main,
	},
	successIcon: {
		color: theme.palette.success.main,
	},
	input: {
		borderRadius: "10px",
	},
	startIcon: {
		color: theme.palette.neutral.main,
	},
});

export default autocompleteInputStyles;
