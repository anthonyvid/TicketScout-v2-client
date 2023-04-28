import {
	Box,
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	IconButton,
} from "@mui/material";
import React, { useState } from "react";
import PropTypes from "prop-types";
import CloseIcon from "@mui/icons-material/Close";
import DeleteSweepTwoToneIcon from "@mui/icons-material/DeleteSweepTwoTone";
const CustomDialog = ({
	isOpen,
	handleClose,
	title,
	subtitle,
	children,
	showCloseBtn,
	width,
	warnOnClose,
	warnTitle,
	warnSubtitle,
	onWarnSubmit,
}) => {
	const [isWarnOpen, setIsWarnOpen] = useState(false);

	const onWarnClose = () => setIsWarnOpen(false);

	const onClose = (event, reason) => {
		if (reason && reason !== "backdropClick") {
			setIsWarnOpen(true);
		} else {
			handleClose();
		}
	};

	return (
		<>
			<Dialog
				fullWidth
				maxWidth={width}
				open={isOpen}
				onClose={onClose}
				PaperProps={{
					style: { borderRadius: 12 },
				}}
			>
				<DialogTitle>
					<Box display="flex" alignItems="center">
						<Box
							flexGrow={1}
							sx={{ fontSize: "20px", fontWeight: 700 }}
						>
							{title}
						</Box>
						<Box>
							<IconButton
								onClick={(e) => onClose(e, warnOnClose)}
							>
								<CloseIcon />
							</IconButton>
						</Box>
					</Box>
				</DialogTitle>
				<DialogContent>
					<DialogContentText>{subtitle}</DialogContentText>
					{children}
				</DialogContent>
				<DialogActions>
					{showCloseBtn && <Button onClick={onClose}>Close</Button>}
				</DialogActions>
			</Dialog>
			<Dialog
				fullWidth
				maxWidth={"xs"}
				sx={{
					textAlign: "center",
				}}
				open={isWarnOpen}
				onClose={(event, reason) => {
					if (reason && reason == "backdropClick") return;
					onWarnClose();
				}}
				PaperProps={{
					style: { borderRadius: 12 },
				}}
			>
				<DialogTitle sx={{ fontSize: "20px", fontWeight: 700 }}>
					<Box
						display="flex"
						alignItems="center"
						flexDirection="column"
					>
						<Box>
							<DeleteSweepTwoToneIcon sx={{ fontSize: "80px" }} />
						</Box>
						<Box
							flexGrow={1}
							sx={{ fontSize: "20px", fontWeight: 700 }}
						>
							{warnTitle}
						</Box>
					</Box>
				</DialogTitle>
				<DialogContent>
					<DialogContentText
						sx={{ fontSize: "15px", fontWeight: 500 }}
					>
						{warnSubtitle}
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
						onClick={() => setIsWarnOpen(false)}
						sx={{ width: "50%", height: "45px" }}
					>
						Cancel
					</Button>
					<Button
						color="error"
						variant="contained"
						sx={{ width: "50%", height: "45px" }}
						onClick={() => {
							setIsWarnOpen(false);
							onClose();
							onWarnSubmit();
						}}
					>
						Delete
					</Button>
				</DialogActions>
			</Dialog>
		</>
	);
};

CustomDialog.defaultProps = {
	showCloseBtn: false,
	warnOnClose: false,
	width: "sm",
	warnSubtitle: "",
	onWarnSubmit: () => {},
};

CustomDialog.propTypes = {
	isOpen: PropTypes.bool.isRequired,
	showCloseBtn: PropTypes.bool,
	warnOnClose: PropTypes.bool,
	handleClose: PropTypes.func,
	onWarnSubmit: PropTypes.func,
	title: PropTypes.string.isRequired,
	subtitle: PropTypes.string,
	width: PropTypes.string,
	warnTitle: PropTypes.string.isRequired,
	warnSubtitle: PropTypes.string,
};

export default CustomDialog;
