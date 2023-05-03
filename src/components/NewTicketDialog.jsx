import React, { useEffect } from "react";
import CustomDialog from "./CustomDialog.jsx";
import TextInput from "./TextInput.jsx";
import { useForm, useWatch } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import useClasses from "hooks/useClasses.js";
import newTicketDialogStyles from "styles/components/NewTicketDialog.style.js";

import { ticketStatus } from "constants/client.constants.js";
import SelectInput from "./SelectInput.jsx";
import { useSelector } from "react-redux";
import { deepDiff } from "utils/helper.js";
import { createTicket } from "services/ticket.service.js";
import { statusCodes } from "constants/client.constants.js";
import { createNotification } from "utils/notification.js";

const TYPE = "CREATE_TICKET";

const defaultValues = {
	title: "",
	description: "",
	status: "new",
};

const NewTicketDialog = ({ isOpen, handleClose }) => {
	const classes = useClasses(newTicketDialogStyles);
	const { modalData } = useSelector((state) => state.modalReducer);
	const { user } = useSelector((state) => state.authReducer);

	const ticketSchema = yup.object().shape({
		title: yup.string().required("Ticket title is required"),
		description: yup.string(),
		status: yup.string().required("Ticket status is required"),
	});

	const {
		control,
		handleSubmit,
		reset,
		getValues,
		setFocus,
		watch,
		setValue,
		formState: { errors, isDirty },
	} = useForm({
		defaultValues: defaultValues,
		mode: "onChange",
		resolver: yupResolver(ticketSchema),
	});

	const currentForm = watch();

	useEffect(() => {
		if (modalData[TYPE]) {
			const data = deepDiff(currentForm, modalData[TYPE]).new;
			if (Object.keys(data).length > 0) {
				reset({ ...defaultValues, ...data });
			}
		}
	}, []);

	const createNewTicket = async (data) => {
		try {
			const options = {
				...data,
				userId: user.id,
			};
			console.log(options);
			const response = null;
			// const response = await createTicket();

			if (response.status !== statusCodes.CREATED)
				throw new Error(response.data.message || response.statusText);
		} catch (error) {
			createNotification("error", error.message);
			console.error(error.message);
		}
	};

	return (
		<CustomDialog
			isOpen={isOpen}
			handleClose={handleClose}
			title={"Create Ticket"}
			form={{
				type: TYPE,
				data: isDirty ? currentForm : {},
			}}
			warnOnClose
			warnTitle={
				"Are you sure you want to delete this new ticket session?"
			}
			warnSubtitle={"All progress will be lost"}
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

//todo: need to add customer input in the create tiucket model, 
//todo: should be able to search by phone or name and it will show the results, 
//todo: The Text will be the name and value will be their ID
