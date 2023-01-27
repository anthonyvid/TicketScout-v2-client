import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const createNotification = (type, msg) => {
	if (!type) {
		type = "success";
	}

	const showToastMessage = () => {
		toast[type](msg, {
			position: toast.POSITION.BOTTOM_LEFT,
			autoClose: 6000,
			theme: "colored",
		});
	};

	showToastMessage();
};
