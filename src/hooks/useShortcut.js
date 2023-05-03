import App from "App.js";
import { useHotkeys } from "react-hotkeys-hook";
import { useDispatch } from "react-redux";
import { openModal } from "reducers/modal.js";

const useShortcuts = () => {
	const dispatch = useDispatch();

	useHotkeys("ctrl+t", () => {
		dispatch(openModal("CREATE_TICKET"));
	});

	useHotkeys("ctrl+c", () => {
		dispatch(openModal("CREATE_CUSTOMER"));
	});

	useHotkeys("ctrl+p", () => {
		dispatch(openModal("CREATE_PAYMENT"));
	});
};

export default useShortcuts;
