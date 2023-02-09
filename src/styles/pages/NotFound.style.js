const notFoundStyles = (theme) => ({
	lottieWrap: {
		width: "700",
		height: "400",
		[theme.breakpoints.down("md")]: {
			width: "500",
			height: "300",
		},
	},
	textWrap: {
		textAlign: "center",
		display: "flex",
		flexDirection: "column",
		marginBottom: "20px",
	},
	button: {
		marginBottom: "100px",
		width: "200px",
		height: "40px",
	},
	heading: {
		fontSize: "46px",
	},
});

export default notFoundStyles;
