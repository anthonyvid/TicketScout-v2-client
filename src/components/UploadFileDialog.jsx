import { Fragment, useCallback, useState } from "react";
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
import { Button, Divider, Grid, IconButton } from "@mui/material";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";

// Hooks
import useClasses from "hooks/useClasses.js";

// Styles
import uploadFileDialogStyles from "styles/components/UploadFileDialog.style.js";
// Utils
import { bytesToMegabytes, formatPhone } from "utils/helper.js";
import { createNotification } from "utils/notification.js";

// Constants
import { statusCodes } from "constants/client.constants.js";

// Services
import { search } from "services/search.service.js";
import { createTicket } from "services/ticket.service.js";
import { Upload } from "@mui/icons-material";
import FileInput from "./FileInput.jsx";
import WordIcon from "assets/svg/WordIcon.js";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import PhotoIcon from "assets/svg/PhotoIcon.js";
import PdfIcon from "assets/svg/PdfIcon.js";
import SvgIcon from "assets/svg/SvgIcon.js";
import ExcelIcon from "assets/svg/ExcelIcon.js";

const UploadFileDialog = ({ isOpen, handleClose }) => {
	const classes = useClasses(uploadFileDialogStyles);
	const [files, setFiles] = useState([]);

	const handleFileDropped = useCallback((files) => {
		if (files?.length) {
			setFiles((previousFiles) => [
				...previousFiles,
				...files.map((file) =>
					Object.assign(file, { preview: URL.createObjectURL(file) })
				),
			]);
		}
	}, []);

	const removeFile = (name) => {
		setFiles((files) => files.filter((file) => file.name !== name));
	};

	const getTypeIcon = (type) => {
		switch (type) {
			// word doc
			case "word":
				return <WordIcon />;
			case "jpeg":
				return <PhotoIcon />;
			case "png":
				return <PhotoIcon />;
			case "svg":
				return <SvgIcon />;
			case "pdf":
				return <PdfIcon />;
			case "excel":
				return <ExcelIcon />;
			default:
				return <InsertDriveFileIcon style={{ fontSize: "46px" }} />;
		}
	};

	const formatFileNameType = (type) => {
		switch (type) {
			case "vnd.openxmlformats-officedocument.wordprocessingml.document":
				return "word";
			case "svg+xml":
				return "svg";
			case "vnd.openxmlformats-officedocument.spreadsheetml.sheet":
				return "excel";
			default:
				return type;
		}
	};

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
				onSubmit={(e) => e.preventDefault()}
				className={classes.formWrap}
			>
				<FileInput onDropHandler={handleFileDropped} />
				<h3 className={classes.subheading}>Uploaded Files</h3>
				{files.length < 1 ? (
					<p>No files uploaded.</p>
				) : (
					files.map(({ name, size, type }, i) => {
						console.log(type);
						type = formatFileNameType(type.split("/")[1]);
						console.log(type);
						return (
							<Fragment key={i}>
								<div className={classes.filePreview}>
									{getTypeIcon(type)}
									<div style={{ marginLeft: "15px" }}>
										<h4>{name.split(".")[0]}</h4>
										<div className={classes.fileDetailWrap}>
											<h5>{type}</h5>
											<FiberManualRecordIcon
												sx={{ fontSize: "7px" }}
											/>
											<h5>{bytesToMegabytes(size)}</h5>
										</div>
									</div>
									<IconButton
										onClick={() => removeFile(name)}
										sx={{ marginLeft: "auto" }}
										aria-label="delete"
									>
										<DeleteOutlineOutlinedIcon />
									</IconButton>
								</div>
								{files.length > 1 && i < files.length - 1 ? (
									<Divider />
								) : null}
							</Fragment>
						);
					})
				)}
			</form>
		</CustomDialog>
	);
};

export default UploadFileDialog;
