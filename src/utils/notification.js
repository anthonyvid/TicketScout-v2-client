import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const CLOSE_TIME = 6000;
export const createNotification = (type = "success", msg = "") => {
	const INTERNAL_ERROR = msg.includes("ERROR:");

	if (INTERNAL_ERROR) toast.dismiss();

	const showToastMessage = () => {
		toast[type](msg, {
			position: toast.POSITION.BOTTOM_LEFT,
			autoClose: INTERNAL_ERROR ? false : CLOSE_TIME,
			theme: "colored",
		});
	};

	showToastMessage();
};
