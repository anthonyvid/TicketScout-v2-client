import React from "react";
import CustomDialog from "./CustomDialog.jsx";
import TextInput from "./TextInput.jsx";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import useClasses from "hooks/useClasses.js";
import newTicketDialogStyles from "styles/components/NewTicketDialog.style.js";

import { ticketStatus } from "constants/client.constants.js";
import SelectInput from "./SelectInput.jsx";

const NewTicketDialog = ({ isOpen, handleClose }) => {
	const classes = useClasses(newTicketDialogStyles);

	const ticketSchema = yup.object().shape({
		title: yup.string().required("Ticket title is required"),
		description: yup.string(),
		status: yup.string().required("Ticket status is required"),
	});

	const {
		control,
		handleSubmit,
		reset,
		setFocus,
		setValue,
		formState: { errors },
	} = useForm({
		defaultValues: {
			title: "",
			description: "",
			status: "new",
		},
		mode: "onChange",
		resolver: yupResolver(ticketSchema),
	});

	const createNewTicket = (data) => {};

	return (
		<CustomDialog
			isOpen={!isOpen}
			handleClose={handleClose}
			title={"Create Ticket"}
			warnOnClose
			warnTitle={"Are you sure you want to delete this ticket?"}
			warnSubtitle={"All ticket data will be lost"}
			onWarnSubmit={() => reset()}
		>
			<form
				onSubmit={handleSubmit(createNewTicket)}
				className={classes.formWrap}
			>
				<TextInput
					staticLabel
					autoFocus
					fullWidth
					label="Title"
					name="title"
					control={control}
					errors={errors}
				/>
				<TextInput
					staticLabel
					fullWidth
					multiline
					label="Description"
					name="description"
					control={control}
					errors={errors}
				/>
				<SelectInput
					staticLabel
					fullWidth
					options={["new", "reply"]}
					name="status"
					label="status"
					control={control}
					errors={errors}
				/>
			</form>
		</CustomDialog>
	);
};

export default NewTicketDialog;
