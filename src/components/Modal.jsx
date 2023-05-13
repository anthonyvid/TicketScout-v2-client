import { useDispatch, useSelector } from "react-redux";

// Components
import NewTicketDialog from "./NewTicketDialog.jsx";

// Reducers
import { closeModal } from "reducers/modal.js";

const Modal = () => {
	const { modalType, isOpen } = useSelector((state) => state.modalReducer);

	const dispatch = useDispatch();

	const handleClose = () => {
		dispatch(closeModal());
	};

	let modalContent = null;

	switch (modalType) {
		case "CREATE_TICKET":
			modalContent = (
				<NewTicketDialog isOpen={isOpen} handleClose={handleClose} />
			);
			break;
		case "ANOTHER_MODAL":
			break;
		default:
			modalContent = null;
	}

	return modalContent;
};

export default Modal;
