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
import React from "react";
import PropTypes from "prop-types";
import CloseIcon from "@mui/icons-material/Close";

const CustomDialog = ({
	isOpen,
	handleClose,
	title,
	subtitle,
	children,
	showCloseBtn,
}) => {
	return (
		<>
			<Dialog fullWidth maxWidth="md" open={isOpen} onClose={handleClose}>
				<DialogTitle>
					<Box display="flex" alignItems="center">
						<Box flexGrow={1}>{title}</Box>
						<Box>
							<IconButton onClick={handleClose}>
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
					{showCloseBtn && (
						<Button onClick={handleClose}>Close</Button>
					)}
				</DialogActions>
			</Dialog>
		</>
	);
};

CustomDialog.defaultProps = {
	showCloseBtn: false,
};

CustomDialog.propTypes = {
	isOpen: PropTypes.bool.isRequired,
	showCloseBtn: PropTypes.bool,
	handleClose: PropTypes.func,
	title: PropTypes.string,
	subtitle: PropTypes.string,
};

export default CustomDialog;
