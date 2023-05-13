import React, { useEffect, useState } from "react";
import CustomDialog from "./CustomDialog.jsx";
import TextInput from "./TextInput.jsx";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import useClasses from "hooks/useClasses.js";
import newTicketDialogStyles from "styles/components/NewTicketDialog.style.js";
import PersonIcon from "@mui/icons-material/Person";
import SelectInput from "./SelectInput.jsx";
import { useSelector } from "react-redux";
import { deepDiff, formatPhone } from "utils/helper.js";
import { statusCodes } from "constants/client.constants.js";
import { createNotification } from "utils/notification.js";
import AutocompleteInput from "./AutocompleteInput.jsx";
import { search } from "services/search.service.js";
import { Button } from "@mui/material";
import { createTicket } from "services/ticket.service.js";
import { useNavigate } from "react-router-dom";

const TYPE = "CREATE_TICKET";

const defaultValues = {
	title: "",
	description: "",
	status: "new",
	customer: "",
};

const NewTicketDialog = ({ isOpen, handleClose }) => {
	const classes = useClasses(newTicketDialogStyles);
	const navigate = useNavigate();
	const { modalData } = useSelector((state) => state.modalReducer);
	const { user } = useSelector((state) => state.authReducer);
	const [options, setOptions] = useState([]);

	const ticketSchema = yup.object().shape({
		title: yup.string().required("Ticket title is required"),
		description: yup.string(),
		status: yup.string().required("Ticket status is required"),
		customer: yup.object().required("Customer is required"),
	});

	const {
		control,
		handleSubmit,
		reset,
		watch,
		setValue,
		formState: { errors, isDirty },
	} = useForm({
		defaultValues: defaultValues,
		mode: "onChange",
		resolver: yupResolver(ticketSchema),
	});

	const currentForm = watch();

	const fetchCustomerOnSearch = async (value) => {
		const options = {
			customers: true,
			value,
		};
		try {
			const response = await search(options);

			const {
				data: { customers },
			} = response;

			if (response.status !== statusCodes.OK)
				throw new Error(response.data.message || response.statusText);

			setOptions([
				...customers.map((c) => ({
					label: `${c.firstname} ${c.lastname} ${formatPhone(
						c.phone
					)}`,
					id: c._id,
					data: { ...c },
				})),
			]);
		} catch (error) {
			createNotification("error", error.message);
			console.error(error.message);
		}
	};

	const createNewTicket = async (data) => {
		try {
			const options = {
				...data,
				customerId: data.customer._id,
				createdBy: user._id,
			};
			const response = await createTicket(options);

			if (response.status !== statusCodes.CREATED)
				throw new Error(response.data.message || response.statusText);

			handleClose();
			navigate(`/customers/${data.customer._id}`);
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
					required
					staticLabel
					autoFocus
					fullWidth
					label="Title"
					name="title"
					placeholder="iPhone 11 Pro broken screen"
					control={control}
					errors={errors}
				/>
				<TextInput
					staticLabel
					fullWidth
					multiline
					placeholder="Customer dropped and shattered screen..."
					label="Description"
					name="description"
					control={control}
					errors={errors}
				/>
				<AutocompleteInput
					options={options}
					staticLabel
					required
					inForm
					fullWidth
					label="Customer"
					name="customer"
					control={control}
					errors={errors}
					placeholder={"Search a customer"}
					onChangeHandler={fetchCustomerOnSearch}
					onSelect={(value) => setValue("customer", value)}
				/>
				<SelectInput
					staticLabel
					fullWidth
					required
					options={["new", "reply"]}
					name="status"
					label="status"
					control={control}
					errors={errors}
				/>
				<Button type="submit" variant="contained">
					Create
				</Button>
			</form>
		</CustomDialog>
	);
};

export default NewTicketDialog;
