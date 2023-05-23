import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

// Components
import CustomDialog from "./CustomDialog.jsx";
import TextInput from "./TextInput.jsx";
import SelectInput from "./SelectInput.jsx";
import AutocompleteInput from "./AutocompleteInput.jsx";
import { Button } from "@mui/material";
import UploadIcon from "@mui/icons-material/Upload";

// Hooks
import useClasses from "hooks/useClasses.js";

// Styles
import newTicketDialogStyles from "styles/components/NewTicketDialog.style.js";

// Utils
import { formatPhone } from "utils/helper.js";
import { createNotification } from "utils/notification.js";

// Constants
import { statusCodes } from "constants/client.constants.js";

// Services
import { search } from "services/search.service.js";
import { createTicket } from "services/ticket.service.js";
import { Upload } from "@mui/icons-material";

const UploadFileDialog = ({ isOpen, handleClose }) => {
	const classes = useClasses(newTicketDialogStyles);
	const uploadFile = (data) => {};

	return (
		<CustomDialog
			isOpen={isOpen}
			handleClose={handleClose}
			title={"Upload Files"}
			// form={{
			// 	type: TYPE,
			// 	data: isDirty ? currentForm : {},
			// }}
			// warnOnClose
			// warnTitle={
			// 	"Are you sure you want to delete this new ticket session?"
			// }
			// warnSubtitle={"All progress will be lost"}
			// onWarnSubmit={() => reset()}
		>
			<form
				// onSubmit={handleSubmit(uploadFile)}
				className={classes.formWrap}
			>
				<Button
					sx={{
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
						flexDirection: "column",
						width: "100%",
						color: "black",
						fontSize: "14px",
						height: "200px",
						border: "1px dashed lightgrey",
					}}
					fullWidth
					variant="outlined"
					component="label"
				>
					<input accept="image/*" multiple hidden type="file" />
					<UploadIcon />
					<p>
						Drop your file here, or{" "}
						<span
							style={{
								color: "blue",
								textDecoration: "underline",
							}}
						>
							Browse
						</span>
					</p>
				</Button>
			</form>
		</CustomDialog>
	);
};

export default UploadFileDialog;
