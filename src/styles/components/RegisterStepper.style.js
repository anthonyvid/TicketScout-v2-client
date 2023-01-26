const registerStepperStyles = (theme) => ({
	parent: {
		display: "flex",
		alignItems: "center",
		justifyContent: "space-evenly",
		width: "100%",
		height: "100%",
		fontWeight: "700",
		borderRadius: "10px",
		border: `1px solid ${theme.palette.neutral.medium}`,
	},
	step: {
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		gap: "13px",
		height: "100%",
	},
	stepBox: {
		width: "39px",
		height: "39px",
		borderRadius: "8px",
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
	},
	greyedOutText: {
		color: theme.palette.neutral.mediumMain,
	},
	greyedOutBox: {
		backgroundColor: theme.palette.neutral.light,
	},
	activeText: {
		color: theme.palette.background.alt,
	},
	activeBox: {
		color: theme.palette.background.default,
		backgroundColor: theme.palette.primary.main,
	},
});

export default registerStepperStyles;
