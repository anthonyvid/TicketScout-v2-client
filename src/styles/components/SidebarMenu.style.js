import { letterSpacing } from "@mui/system";

const sidebarMenuStyles = (theme) => ({
	sidebar: {
		width: "270px",
		height: "100%",
		paddingTop: "30px",
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		position: "relative",
		transition: "0.4s ease-in-out",
		borderRight: `1px solid ${theme.palette.neutral.medium}`,
	},
	sidebarClosed: {
		width: "80px",
	},
	sidebarToggleWrap: {
		width: "25px",
		height: "25px",
		borderRadius: "50%",
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		cursor: "pointer",
		right: -12,
		top: 10,
		border: `1px solid ${theme.palette.neutral.medium}`,
		backgroundColor: "white",
		color: theme.palette.neutral.main,
		position: "absolute",
	},
	logoWrap: {
		width: "100%",
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		gap: "20px",
		marginBottom: "50px",
	},
	logoText: {
		fontSize: "20px",
		fontWeight: "900",
		letterSpacing: "1.5px",
	},
	generalWrap: {
		width: "100%",
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		gap: "20px",
	},
	menuItem: {
		width: "100%",
		display: "flex",
		alignItems: "center",
		height: "50px",
		gap: "15px",
		paddingLeft: "50px",
		fontSize: "16px",
		fontWeight: "700",
		color: theme.palette.neutral.main,
		cursor: "pointer",
		transition: "0.2s ease-in-out",
		"&:hover": {
			backgroundColor: `${theme.palette.primary.main}10`,
			color: theme.palette.primary.main,
		},
	},
	menuItemSmall: {
		justifyContent: "center",
		paddingLeft: 0,
	},
	activeItem: {
		color: theme.palette.primary.main,
		backgroundColor: `${theme.palette.primary.main}10`,
	},
	activeIndicator: {
		backgroundColor: theme.palette.primary.main,
		position: "absolute",
		left: 0,
		width: "6px",
		height: "30px",
		borderTopRightRadius: "5px",
		borderBottomRightRadius: "5px",
	},
});

export default sidebarMenuStyles;
