const OtpCodeStyles = (theme) => ({
	codeInput: {
		width: "60px",
		height: "100%",
		margin: 0,
		padding: 0,
		borderRadius: "12px",
		border: `2px solid ${theme.palette.neutral.mediumMain}`,
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		textAlign: "center",
		fontWeight: "bold",
		fontSize: "18px",

		"&:focus": {
			backgroundColor: `${theme.palette.primary.main}30`,
		},
	},
});

export default OtpCodeStyles;
