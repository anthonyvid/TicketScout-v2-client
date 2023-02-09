const resetPasswordStyles = (theme) => ({
	heading: { fontSize: "40px" },
	subheading: {
		fontSize: "18px",
		color: theme.palette.neutral.main,
		marginTop: "-20px",
		marginBottom: "15px",
	},
	resetButton: {
		width: "100%",
		height: "50px",
		margin: "30px 0 0 0",
	},

	wrap: {
		display: "flex",
		height: "auto",
		flexDirection: "column",
		gap: "25px",
		width: "400px",
		textAlign: "center",
		marginBottom: "50px",
		[theme.breakpoints.down("sm")]: {
			width: "85%",
		},
	},
	lottieWrap: {
		width: "100%",
		height: 80,
		display: "flex",
		justifyContent: "center",
		alighItems: "center",
	},
	successLottieWrap: {
		width: "100%",
		height: 200,
		display: "flex",
		justifyContent: "center",
		alighItems: "center",
	},
});

export default resetPasswordStyles;
