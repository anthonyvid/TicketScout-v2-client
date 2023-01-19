const loginStyles = (theme) => ({
	loginContainer: {
		display: "flex",
		padding: "10px 60px",
		color: theme.palette.neutral.main,
	},
	header: {
		display: "flex",
		width: "100%",
		height: "50px",
		justifyContent: "space-between",
	},
	registerWrap: {
		display: "flex",
		gap: "15px",
	},
	registerButton: {
		height: "40px",
	},
	loginFormWrap: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		width: "350px",
		height: "100%",
		border: "1px solid red",
	},
	welcomeMsg: {
		textAlign: "center",
	},
});

export default loginStyles;
