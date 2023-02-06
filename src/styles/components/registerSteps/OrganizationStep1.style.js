const OrganizationStep1Styles = (theme) => ({
	titleWrap: {
		display: "flex",
		flexDirection: "column",
	},
	title: {
		fontSize: "38px",
		fontWeight: "800",
		padding: 0,
		margin: 0,
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
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
		gap: "20px",
		width: "100%",
		marginTop: "40px",
		transition: "0.2s ease-in-out",
		padding: "0 50px",
		TextField: {
			borderRadius: "15px",
		},
		[theme.breakpoints.down("sm")]: {
			padding: "0",
		},
	},
});

export default OrganizationStep1Styles;
