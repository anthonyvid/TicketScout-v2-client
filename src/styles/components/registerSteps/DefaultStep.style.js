const defaultStepStyles = (theme) => ({
	titleWrap: {
		display: "flex",
		flexDirection: "column",
	},
	title: {
		fontSize: "38px",
		fontWeight: "800",
		padding: 0,
		margin: 0,
		[theme.breakpoints.down("sm")]: {
			fontSize: "34px",
		},
	},
	subtitle: {
		color: "#aeaebd",
		fontSize: "18px",
		padding: 0,
		fontWeight: "600",
		margin: 0,
	},
	contentWrap: {
		display: "flex",
		gap: "40px",
		justifyContent: "center",
		alignItems: "center",
		width: "100%",
		marginTop: "30px",
		transition: "0.2s ease-in-out",
		marginBottom: "50px",
		[theme.breakpoints.down("md")]: {
			gap: "20px",
		},
		[theme.breakpoints.down("sm")]: {
			gap: "20px",
			flexDirection: "column",
			width: "60%",
		},
	},
	box: {
		position: "relative",
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "center",
		padding: "10px",
		width: "380px",
		height: "300px",
		gap: "15px",
		border: `2px solid ${theme.palette.neutral.light}`,
		borderRadius: "15px",
		transition: "0.2s ease-in-out",
		transform: "scale(1)",
		color: theme.palette.neutral.dark,
		"&:hover": {
			cursor: "pointer",
			transition: "0.2s ease-in-out",
		},
		h2: {
			fontSize: "28px",
			color: theme.palette.neutral.dark,
		},
		p: {
			fontSize: "16px",
			fontWeight: "600",
		},
		[theme.breakpoints.down("md")]: {
			width: "280px",
			height: "200px",
		},
		[theme.breakpoints.down("sm")]: {
			width: "400px",
			height: "150px",
			flexDirection: "row",
			alignItems: "center",
			justifyContent: "space-between",
		},
	},
	selected: {
		boxShadow: `0 0 5px #9ecaed`,
		borderColor: theme.palette.primary.main,
	},
	iconBox: {
		border: `2px solid ${theme.palette.neutral.light}`,
		borderRadius: "10px",
		width: "60px",
		height: "60px",
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		[theme.breakpoints.down("sm")]: {
			marginLeft: "10px",
			marginRight: "-10px",
		},
	},
	dummy: {
		width: "60px",
		height: "60px",
		display: "none",
		[theme.breakpoints.down("sm")]: {
			display: "block",
		},
	},
	icon: {
		color: theme.palette.neutral.main,
	},
	circle: {
		width: "30px",
		height: "30px",
		borderRadius: "50%",
		border: `2px solid ${theme.palette.neutral.light}`,
		position: "absolute",
		top: 20,
		right: 15,
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		transition: "0.2s ease-in-out",
		color: "white",
	},
	circleActive: {
		backgroundColor: theme.palette.primary.main,
	},
	hideCheck: {
		display: "none",
		visibility: "hidden",
	},
});

export default defaultStepStyles;
