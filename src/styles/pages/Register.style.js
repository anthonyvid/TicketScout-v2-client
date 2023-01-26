const registerStyles = (theme) => ({
	registerContainer: {
		display: "flex",
		padding: "20px 60px",
		color: theme.palette.neutral.main,
		height: "100px",
	},
	registerFormWrap: {
		display: "flex",
		flexDirection: "column",
		justifyContent: "space-between",
		alignItems: "center",
		width: "800px",
		height: "100%",
		textAlign: "center",
	},
	stepperWrap: {
		width: "100%",
		maxWidth: "900px",
		height: "70px",
		display: "flex",
		justifyContent: "center",
		alignItems: "center",

		[theme.breakpoints.down("md")]: {
			display: "none",
		},
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
		display: "hidden",
	},
	pageWrap: {
		border: "1px solid red",
		width: "100%",
		height: "100%",
		margin: "100px 0",
	},
});

export default registerStyles;
