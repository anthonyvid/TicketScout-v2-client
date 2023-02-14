const registerStyles = (theme) => ({
	registerFormWrap: {
		display: "flex",
		flexDirection: "column",
		justifyContent: "space-between",
		alignItems: "center",
		width: "80%",
		height: "100%",
		textAlign: "center",
		position: "relative",
	},
	stepperWrap: {
		width: "100%",
		display: "flex",
		justifyContent: "center",
		position: "absolute",
		bottom: 100,
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
		fontWeight: "bold",
		paddingTop: "30px",
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
		width: "calc(80% + 35px)",
		fontWeight: "bold",
		fontSize: "20px",
		[theme.breakpoints.down("md")]: {
			width: "100%",
		},
		[theme.breakpoints.down("sm")]: {
			width: "50%",
		},
	},
	register: {
		width: "100%",
		position: "absolute",
		bottom: 30,
		fontSize: "15px",
		color: theme.palette.neutral.main,
		fontWeight: 600,
	},
});

export default registerStyles;
