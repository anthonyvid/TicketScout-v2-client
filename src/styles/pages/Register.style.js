const registerStyles = (theme) => ({
	registerContainer: {
		display: "flex",
		// padding: "20px 60px",
		color: theme.palette.neutral.main,
		// height: "100px",
	},
	registerFormWrap: {
		display: "flex",
		flexDirection: "column",
		justifyContent: "space-between",
		alignItems: "center",
		width: "800px",
		height: "100%",
		textAlign: "center",
		paddingBottom: "100px",
		position: "relative",
	},
	stepperWrap: {
		width: "100%",
		display: "flex",
		justifyContent: "center",
		position: "absolute",
		bottom: "50px",
		alignItems: "center",
	},
	relative: {
		position: "relative",
	},
	buttonWrap: {
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		flexDirection: "row",
		gap: "13px",
		width: "100%",
		margin: "-25px 0 25px 0",
		fontWeight: "bold",
	},
	nextBtn: {
		width: "200px",
		borderRadius: "12px",
		height: "50px",
	},
	backBtn: {
		borderRadius: "12px",
		width: "200px",
		height: "50px",
		backgroundColor: `${theme.palette.primary.main}30`,
	},
	hidden: {
		display: "none",
		visibility: "hidden",
	},
	pageWrap: {
		width: "100%",
		height: "100%",
	},
	continueBtn: {
		height: "50px",
		width: "100%",
		fontWeight: "bold",
		fontSize: "20px",
		[theme.breakpoints.down("md")]: {
			width: "580px",
		},
		[theme.breakpoints.down("sm")]: {
			width: "50%",
		},
	},
});

export default registerStyles;
