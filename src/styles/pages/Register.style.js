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
		justifyContent: "end",
		flexDirection: "row",
		gap: "13px",
		width: "100%",

		fontWeight: "bold",
	},
	nextBtn: {
		width: "110px",
		borderRadius: "12px",
		height: "45px",
	},
	backBtn: {
		borderRadius: "12px",
		width: "110px",
		height: "45px",
		backgroundColor: "white",
	},
	hidden: {
		display: "none",
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
	},
});

export default registerStyles;
