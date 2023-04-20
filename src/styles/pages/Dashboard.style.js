const dashboardStyles = (theme) => ({
	statWrap: {
		width: "100%",
		display: "flex",
		gap: "25px",
	},
	priorityTickets: {
		width: "100%",
		height: "auto",
		background: "white",
		borderRadius: "15px",
		boxShadow:
			"rgba(27, 31, 35, 0.04) 0px 1px 0px, rgba(255, 255, 255, 0.25) 0px 1px 0px inset",
		padding: "18px",
	},
	ticketRow: {
		width: "100%",
		height: "100px",
		background: "red",
		display: "flex",
		justifyContent: "space-evenly",
		alignItems: "center",
	},
	ticketWrap: {
		width: "100%",
		height: "100%",
		display: "flex",
		flexDirection: "column",
		gap: "15px",
	},
});

export default dashboardStyles;
