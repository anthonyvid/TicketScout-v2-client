const selectInputStyles = (theme) => ({
	errorText: {
		marginTop: "3px",
		marginBottom: "-17px",
		color: theme.palette.error.main,
		textAlign: "left",
	},
	selectInputWrap: {
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
	// error: {
	// 	background: `${theme.palette.error.main}20`,
	// },
	// success: {
	// 	background: `${theme.palette.primary.main}20`,
	// 	"& .MuiOutlinedInput-root": {
	// 		"& fieldset": {
	// 			borderColor: theme.palette.primary.main,
	// 		},
	// 	},
	// },
});

export default selectInputStyles;
