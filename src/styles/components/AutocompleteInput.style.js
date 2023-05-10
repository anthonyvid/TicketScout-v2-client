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
	autocomplete: {
		width: "300px",
		"&.MuiAutocomplete-root .MuiAutocomplete-inputRoot": {
			borderRadius: "25px",
			height: "40px",
			padding: 0,
			paddingLeft: "12px",
			backgroundColor: theme.palette.neutral.default,
			fontWeight: 600,
			fontSize: "14px",
		},
		"& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
			border: "none",
		},
		"& .MuiOutlinedInput-root": {
			border: "1px solid transparent",
		},
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
		marginRight: "7px",
	},
});

export default autocompleteInputStyles;
