const OrganizationStep2Styles = (theme) => ({
	titleWrap: {
		display: "flex",
		flexDirection: "column",
	},
	title: {
		fontSize: "2.3rem",
		fontWeight: "800",
		padding: 0,
		margin: 0,
		[theme.breakpoints.down("sm")]: {
			fontSize: "1.5rem",
		},
	},
	subtitle: {
		color: "#aeaebd",
		fontSize: "1.2rem",
		padding: 0,
		fontWeight: "600",
		margin: 0,
		[theme.breakpoints.down("sm")]: {
			fontSize: "1rem",
		},
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
			width: "100%",
			marginBottom: "15px",
		},
	},
	box: {
		position: "relative",
		display: "flex",
		flexDirection: "column",
		alignItems: "start",
		justifyContent: "start",
		padding: "15px 10px 10px 15px",
		width: "40%",
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
			fontSize: "1.7rem",
			color: theme.palette.neutral.dark,
		},
		p: {
			fontSize: "1rem",
			fontWeight: "600",
		},
		[theme.breakpoints.down("md")]: {
			width: "50%",
			height: "200px",
		},
		[theme.breakpoints.down("sm")]: {
			width: "100%",
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
			marginLeft: "6px",
			marginRight: "-6px",
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
	perkWrap: {
		display: "flex",
		flexDirection: "column",
		justifyContent: "start",
		alignItems: "start",
		gap: "5px",
		textAlign: "left",
		color: theme.palette.neutral.main,
	},
	priceWrap: {
		display: "flex",
		justifyContent: "center",
		width: "100%",
		alignItems: "center",
		marginTop: "auto",
		h3: {
			fontSize: "26px",
		},
		p: {
			fontSize: "12px",
			fontWeight: "700",
			paddingTop: "10px",
			color: theme.palette.neutral.mediumMain,
		},
	},
	perkItem: {
		display: "flex",
		gap: "5px",
	},
	perkIcon: {
		color: theme.palette.success.custom,
	},
});

export default OrganizationStep2Styles;
