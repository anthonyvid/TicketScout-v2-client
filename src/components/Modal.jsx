import { useDispatch, useSelector } from "react-redux";

// Reducers
import { closeModal } from "reducers/modal.js";

// Components
import NewTicketDialog from "./NewTicketDialog.jsx";
import UploadFileDialog from "./UploadFileDialog.jsx";

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
		case "UPLOAD_FILE":
			modalContent = (
				<UploadFileDialog isOpen={isOpen} handleClose={handleClose} />
			);
			break;
		default:
			modalContent = null;
	}

	return modalContent;
};

export default Modal;
