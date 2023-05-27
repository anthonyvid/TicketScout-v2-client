import { useState } from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";

// Components
import {
	Box,
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	IconButton,
	Tooltip,
} from "@mui/material";
import WarnDialog from "./WarnDialog.jsx";

// Icons
import CloseIcon from "@mui/icons-material/Close";
import DeleteSweepTwoToneIcon from "@mui/icons-material/DeleteSweepTwoTone";

// Reducers
import { resetModalData, saveModalData } from "reducers/modal.js";

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
							sx={{
								fontSize: "20px",
								fontWeight: 700,
								color: "neutral.dark",
							}}
						>
							{title}
						</Box>
						<Box>
							<Tooltip title="Close" placement="bottom" arrow>
								<IconButton
									onClick={(e) => onClose(e, warnOnClose)}
								>
									<CloseIcon />
								</IconButton>
							</Tooltip>
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
					console.log(form.type);
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
	warnTitle: PropTypes.string,
	warnSubtitle: PropTypes.string,
	form: PropTypes.object,
};

export default CustomDialog;
