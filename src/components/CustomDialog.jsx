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
import { useDispatch } from "react-redux";
import { resetModalData, saveModalData } from "reducers/modal.js";
import WarnDialog from "./WarnDialog.jsx";
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
	form,
	warnCloseText,
	warnSubmitText,
	warnIcon,
}) => {
	const [isWarnOpen, setIsWarnOpen] = useState(false);

	const onWarnClose = () => setIsWarnOpen(false);
	const dispatch = useDispatch();

	const isFormEdited = () => Object.keys(form.data).length > 0;

	const onClose = (event, reason) => {
		if (
			reason &&
			reason !== "backdropClick" &&
			reason !== "escapeKeyDown"
		) {
			setIsWarnOpen(true);
		} else {
			saveFormData();
			handleClose();
		}
	};

	const saveFormData = () => {
		if (isFormEdited()) {
			dispatch(saveModalData(form));
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
			<WarnDialog
				isOpen={isWarnOpen}
				onClose={onWarnClose}
				icon={
					warnIcon || (
						<DeleteSweepTwoToneIcon sx={{ fontSize: "80px" }} />
					)
				}
				title={warnTitle}
				subtitle={warnSubtitle}
				closeText={warnCloseText || "Cancel"}
				submitText={warnSubmitText || "Delete"}
				onSubmit={() => {
					setIsWarnOpen(false);
					dispatch(resetModalData(form.type));
					onClose();
					onWarnSubmit();
				}}
				onCancel={() => setIsWarnOpen(false)}
			/>
		</>
	);
};

CustomDialog.defaultProps = {
	showCloseBtn: false,
	warnOnClose: false,
	warnCloseText: "",
	warnSubmitText: "",
	form: { type: "", data: {} },
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
	warnCloseText: PropTypes.string,
	warnSubmitText: PropTypes.string,
	width: PropTypes.string,
	warnTitle: PropTypes.string.isRequired,
	warnSubtitle: PropTypes.string,
	form: PropTypes.object,
};

export default CustomDialog;
