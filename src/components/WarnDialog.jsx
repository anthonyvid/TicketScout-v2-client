// Components
import {
	Box,
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
} from "@mui/material";

const WarnDialog = ({
	isOpen,
	onClose,
	icon,
	title,
	subtitle,
	closeText,
	submitText,
	onSubmit,
	onCancel,
}) => {
	return (
		<Dialog
			fullWidth
			maxWidth={"xs"}
			sx={{
				textAlign: "center",
			}}
			open={isOpen}
			onClose={(event, reason) => {
				if (reason && reason == "backdropClick") return;
				onClose();
			}}
			PaperProps={{
				style: { borderRadius: 12 },
			}}
		>
			<DialogTitle sx={{ fontSize: "20px", fontWeight: 700 }}>
				<Box display="flex" alignItems="center" flexDirection="column">
					<Box>{icon}</Box>
					<Box
						flexGrow={1}
						sx={{ fontSize: "20px", fontWeight: 700 }}
					>
						{title}
					</Box>
				</Box>
			</DialogTitle>
			<DialogContent>
				<DialogContentText sx={{ fontSize: "15px", fontWeight: 500 }}>
					{subtitle}
				</DialogContentText>
			</DialogContent>
			<DialogActions
				sx={{
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					gap: "10px",
					width: "100%",
					padding: "25px",
				}}
			>
				<Button
					variant="light"
					onClick={onCancel}
					sx={{ width: "50%", height: "45px" }}
				>
					{closeText}
				</Button>
				<Button
					color="error"
					variant="contained"
					sx={{ width: "50%", height: "45px" }}
					onClick={onSubmit}
				>
					{submitText}
				</Button>
			</DialogActions>
		</Dialog>
	);
};

export default WarnDialog;
