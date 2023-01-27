const registerStepperStyles = (theme) => ({
	parent: {
		display: "flex",
		alignItems: "center",
		width: "auto",
		height: "12px",
		gap: "10px",
	},
	step: {
		transition: "0.2s ease-out",
		width: "25px",
		height: "100%",
		borderRadius: "15px",
	},
	greyedOutStep: {
		backgroundColor: theme.palette.neutral.light,
	},
	activeStep: {
		width: "50px",
		backgroundColor: theme.palette.primary.main,
	},
});

export default registerStepperStyles;
