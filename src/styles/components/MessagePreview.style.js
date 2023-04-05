const messagePreviewStyles = (theme) => ({
	recentMessages: {
		width: "40px",
		height: "40px",
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		borderRadius: "25px",
		backgroundColor: theme.palette.neutral.default,
		transition: "0.2s ease-in-out",
		"&:hover": {
			cursor: "pointer",
			backgroundColor: theme.palette.primary.mainLight,
			transition: "0.2s ease-in-out",
		},
	},
});

export default messagePreviewStyles;
