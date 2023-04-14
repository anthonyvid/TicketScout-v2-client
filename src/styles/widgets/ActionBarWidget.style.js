const actionBarWidgetStyles = (theme) => ({
	actionBar: {
		width: "100%",
		height: "70px",
		backgroundColor: "white",
		borderRadius: "15px",
		display: "flex",
		alignItems: "center",
		justifyContent: "space-between",
		boxShadow:
			"rgba(27, 31, 35, 0.04) 0px 1px 0px, rgba(255, 255, 255, 0.25) 0px 1px 0px inset",
		padding: "10px 20px",
	},
	infoWrap: {
		display: "flex",
		width: "auto",
		gap: "10px",
	},
	nameWrap: {
		display: "flex",
		flexDirection: "column",

		h4: {
			fontWeight: "700",
		},
		p: {
			fontWeight: "700",
			fontSize: "12px",
			color: theme.palette.neutral.main,
		},
	},
	profilePic: {
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		width: "40px",
		height: "40px",
		borderRadius: "50%",
		backgroundColor: theme.palette.neutral.default,
		border: `2px solid ${theme.palette.neutral.mediumMain}`,
	},
	userWrap: {
		display: "flex",
		gap: "10px",
	},
	avatarBadge: {
		"& .MuiBadge-badge": {
			backgroundColor: "#44b700",
			color: "#44b700",
			boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
			"&::after": {
				position: "absolute",
				top: 0,
				left: 0,
				width: "100%",
				height: "100%",
				borderRadius: "50%",
				animation: "ripple 1.2s infinite ease-in-out",
				border: "1px solid currentColor",
				content: '""',
			},
		},
		"@keyframes ripple": {
			"0%": {
				transform: "scale(.8)",
				opacity: 1,
			},
			"100%": {
				transform: "scale(2.4)",
				opacity: 0,
			},
		},
	},
});

export default actionBarWidgetStyles;
