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
	chip: {
        
    }
});

export default displayStatWidgetStyles;
