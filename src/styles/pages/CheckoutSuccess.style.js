const checkoutSuccessStyles = (theme) => ({
	successHeader: {
		color: theme.palette.success.main,
		fontSize: "46px",
	},
	failHeader: {
		color: theme.palette.error.main,
		fontSize: "46px",
	},
	description: {
		color: theme.palette.neutral.main,
		fontSize: "18px",
		paddingBottom: "40px",
	},
	parent: {
		textAlign: "center",
		paddingBottom: "100px",
		[theme.breakpoints.down("md")]: {
			padding: "0 20px",
		},
	},
	lottieWrap: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		width: 300,
		height: 300,
	},
	errLottieWrap: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		width: 170,
		height: 170,
		marginBottom: "30px",
	},
	textWrap: {
		display: "flex",
		flexDirection: "column",
		height: "auto",
		position: "relative",
		marginTop: "-50px",
		minWidth: "500px",
		[theme.breakpoints.down("sm")]: {
			minWidth: "90%",
		},
	},
	button: {
		height: "50px",
		fontSize: "16px",
	},
});

export default checkoutSuccessStyles;
