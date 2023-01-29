const employeeStep1Styles = (theme) => ({
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
		gap: "30px",
		width: "100%",
		marginTop: "40px",
		transition: "0.2s ease-in-out",
	},
	otpWrap: {
		display: "flex",
		justifyContent: "center",
		width: "100%",
		height: "60px",
		gap: "20px",
		transition: "0.2s ease-in-out",
		[theme.breakpoints.down("sm")]: {
			gap: "10px",
		},
	},
});

export default employeeStep1Styles;
