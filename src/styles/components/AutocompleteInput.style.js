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
});

export default autocompleteInputStyles;
